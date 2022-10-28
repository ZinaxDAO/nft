// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev give an account access to this role
     */
    function add(Role storage role, address account) internal {
        require(account != address(0));
        require(!has(role, account));

        role.bearer[account] = true;
    }

    /**
     * @dev remove an account's access to this role
     */
    function remove(Role storage role, address account) internal {
        require(account != address(0));
        require(has(role, account));

        role.bearer[account] = false;
    }

    /**
     * @dev check if an account has this role
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0));
        return role.bearer[account];
    }
}

contract PauserRole {
    using Roles for Roles.Role;

    event PauserAdded(address indexed account);
    event PauserRemoved(address indexed account);

    Roles.Role private _pausers;

    constructor () {
        _addPauser(msg.sender);
    }

    modifier onlyPauser() {
        require(isPauser(msg.sender));
        _;
    }

    function isPauser(address account) public view returns (bool) {
        return _pausers.has(account);
    }

    function addPauser(address account) public onlyPauser {
        _addPauser(account);
    }

    function renouncePauser() public {
        _removePauser(msg.sender);
    }

    function _addPauser(address account) internal {
        _pausers.add(account);
        emit PauserAdded(account);
    }

    function _removePauser(address account) internal {
        _pausers.remove(account);
        emit PauserRemoved(account);
    }
}

/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is PauserRole {
    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    constructor () {
        _paused = false;
    }

    /**
     * @return true if the contract is paused, false otherwise.
     */
    function paused() public view returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!_paused);
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(_paused);
        _;
    }

    /**
     * @dev called by the owner to pause, triggers stopped state
     */
    function pause() public onlyPauser whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @dev called by the owner to unpause, returns to normal state
     */
    function unpause() public onlyPauser whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}

contract ZinarLoansAdmin is Ownable, Pausable, ReentrancyGuard {

    // @notice This event is fired whenever the admins change the amount in MATIC charged as a fee. 
    event AdminFeeUpdated(uint256 newAdminFee);

    // @notice A mapping from an NFT contract's address to a boolean value that checks if that contract is whitelisted to be used by this contract.
    mapping (address => bool) public nftContractIsWhitelisted;

    // @notice the different interest rates for each of the Zinar NFT 
    uint256 public zinar05InterestRate;
    uint256 public zinar1InterestRate;
    uint256 public zinar2InterestRate;
    uint256 public zinar5InterestRate;
    uint256 public zinar10InterestRate;

    // @notice The maximum duration of any loan started measured in seconds. This is both a sanity-check for borrowers
    // and a check to ensure that the loan duration never exceeds the space alotted for it in the loan struct.
    uint256 public loanDuration = 15 minutes;

    // @notice An extension for borrowers to payback their overdue loans 
    // when this period is over, borrowers can longer payback their loans to recover their NFT
    uint256 public gracePeriod = 15 minutes;

    // @notice The maximum number of active loans allowed on this platform.
    uint256 public maximumNumberOfActiveLoans = 1000;

    // @notice The amount in Matic that is taken by the contract admin as a fee for perfoming loan transactions 
    uint256 public adminFeeInMatic = 0.05 ether;

    constructor() {
        // Whitelist mainnet ZinarNFT
        nftContractIsWhitelisted[address(0xF17b66b416a3d9A0D6f2f3F9e713D8735dd29B13)] = true;
    }

    // @notice This function can be called by admins to change the whitelist status of an NFT contract. This includes both adding an NFT contract to the whitelist and removing it.
    function whitelistNFTContract(address _nftContract, bool _setAsWhitelisted) external onlyOwner {
        nftContractIsWhitelisted[_nftContract] = _setAsWhitelisted;
    }

    // @notice This function can be called by admins to change the loanDuration. 
    function updateLoanDuration(uint256 _newLoanDuration) external onlyOwner {
        require(_newLoanDuration <= uint256(~uint32(0)), 'loan duration cannot exceed space alotted in struct');
        loanDuration = _newLoanDuration;
    }

    // @notice This function can be called by admins to change the maximumNumberOfActiveLoans. 
    function updateMaximumNumberOfActiveLoans(uint256 _newMaximumNumberOfActiveLoans) external onlyOwner {
        maximumNumberOfActiveLoans = _newMaximumNumberOfActiveLoans;
    }

    // @notice This function can be called by admins to change the percent of interest rates earned that they charge as a fee.
    function updateAdminFee(uint256 _newAdminFeeInMatic) external onlyOwner {
        require(_newAdminFeeInMatic <= 10000, 'Basis points cannot exceed 10000');
        adminFeeInMatic = _newAdminFeeInMatic;
        emit AdminFeeUpdated(_newAdminFeeInMatic);
    }
}

contract ZinarLoans is ZinarLoansAdmin {

    // @notice OpenZeppelin's SafeMath library is used for all arithmetic operations to avoid overflows/underflows.
    using SafeMath for uint256;

    // @notice The Loan struct containing all the important details for an active loan. 
    // The struct fits in six 256-bits words due to Solidity's rules for struct packing.
    struct Loan {
        // A unique identifier for this particular loan, sourced from the continuously increasing parameter totalNumLoans.
        uint256 loanId;
        // The original sum of money transferred from lender to borrower at the beginning of the loan, measured in MATIC's smallest units.
        uint256 loanPrincipalAmount;
        // The maximum amount of money that the borrower would be required to
        // repay to retrieve their collateral, measured in MATIC. 
        uint256 maximumRepaymentAmount;
        // The ID within the NFTCollateralContract for the NFT being used as collateral for this loan.
        uint256 nftCollateralId;
        // The block.timestamp when the loan first began (measured in seconds).
        uint64 loanStartTime;
        // The amount of time (measured in seconds) that can elapse before the loan can be liquidated and the underlying collateral siezed
        uint32 loanDuration;
        // The interest rate for the loan calculated in basis points 
        uint32 loanInterestRateInBasisPoints;
        // The amount of Matic that will be taken as a fee by the contract admins when the loan is repaid.
        uint32 loanAdminFee;
        // The ERC721 contract of the NFT collateral
        address nftCollateralContract;
        // The address of the borrower.
        address borrower;
    }

    // @notice This event is fired whenever a borrower begins a loan by calling ZinarLoans.beginLoan()
    event LoanStarted(
        uint256 loanId,
        address borrower,
        uint256 loanPrincipalAmount,
        uint256 maximumRepaymentAmount,
        uint256 nftCollateralId,
        uint256 loanStartTime,
        uint256 loanDuration,
        uint256 loanInterestRateInBasisPoints,
        address nftCollateralContract
    );

    // @notice This event is fired whenever a borrower successfully repays their loan
    event LoanRepaid(
        uint256 loanId,
        address borrower,
        uint256 loanPrincipalAmount,
        uint256 nftCollateralId,
        uint256 amountPaidToLender,
        uint256 adminFee,
        address nftCollateralContract
    );

    // @notice This event is fired whenever a lender liquidates an outstanding loan that is owned to them that has exceeded its duration.
    event LoanLiquidated(
        uint256 loanId,
        address borrower,
        uint256 loanPrincipalAmount,
        uint256 nftCollateralId,
        uint256 loanMaturityDate,
        uint256 loanLiquidationDate,
        address nftCollateralContract
    );

    // @notice A continuously increasing counter that simultaneously allows  every loan to have a unique ID and provides a running count of
    // how many loans have been started by this contract.
    uint256 public totalNumLoans = 0;

    // @notice A counter of the number of currently outstanding loans.
    uint256 public totalActiveLoans = 0;

    // @notice A mapping from a loan's identifier to the loan's details, represted by the loan struct.
    mapping (uint256 => Loan) public loanIdToLoan;

    // @notice A mapping tracking whether a loan has either been repaid or liquidated. This prevents an attacker trying to repay or
    //         liquidate the same loan twice.
    mapping (uint256 => bool) public loanRepaidOrLiquidated;

    constructor() payable {}

    receive() external payable {}

    function beginLoan(
        uint256 _loanPrincipalAmount,
        uint256 _nftCollateralId,
        uint256 _loanInterestRateInBasisPoints,
        address _nftCollateralContract
    ) public whenNotPaused nonReentrant payable {
        // Calculate the interest for the loan
        uint256 loanInterest = (_loanPrincipalAmount.mul(_loanInterestRateInBasisPoints).mul(loanDuration)).div(uint256(10000));
        uint256 maximumRepaymentAmount = _loanPrincipalAmount.add(loanInterest);

        // Increase the total number of loans 
        totalNumLoans = totalNumLoans.add(1);

        // Save loan details to a struct in memory first, to save on gas if any
        // of the below checks fail, and to avoid the "Stack Too Deep" error by
        // clumping the parameters together into one struct held in memory.
        Loan memory loan = Loan({
            loanId: totalNumLoans, //currentLoanId,
            loanPrincipalAmount: _loanPrincipalAmount,
            maximumRepaymentAmount: maximumRepaymentAmount,
            nftCollateralId: _nftCollateralId,
            loanStartTime: uint64(block.timestamp), //_loanStartTime
            loanDuration: uint32(loanDuration),
            loanInterestRateInBasisPoints: uint32(_loanInterestRateInBasisPoints),
            loanAdminFee: uint32(adminFeeInMatic),
            nftCollateralContract: _nftCollateralContract,
            borrower: msg.sender //borrower
        });

        // Sanity check loan values.
        require(loan.maximumRepaymentAmount >= loan.loanPrincipalAmount, 'Negative interest rate loans are not allowed.');
        require(uint256(loan.loanDuration) <= loanDuration, 'Loan duration exceeds maximum loan duration');
        require(uint256(loan.loanDuration) != 0, 'Loan duration cannot be zero');

        // Check that the collateral come from the supported contract
        require(nftContractIsWhitelisted[loan.nftCollateralContract], 'NFT collateral contract is not whitelisted to be used by this contract');

        // Add the loan to storage before moving collateral/principal to follow the Checks-Effects-Interactions pattern.
        loanIdToLoan[totalNumLoans] = loan;

        // Update number of active loans.
        totalActiveLoans = totalActiveLoans.add(1);
        require(totalActiveLoans <= maximumNumberOfActiveLoans, 'Contract has reached the maximum number of active loans allowed by admins');

        // @dev remember to approve loan contract in the NFT contract before transfer 
        // Transfer collateral from borrower to this contract to be held until loan completion.
        IERC721(loan.nftCollateralContract).transferFrom(msg.sender, address(this), loan.nftCollateralId);

        // Transfer admin fee from borrower to contract 
        payable(address(this)).transfer(loan.loanAdminFee);

        // Transfer principal from lender to borrower. 
        payable((msg.sender)).transfer(loan.loanPrincipalAmount);

        // Emit an event with all relevant details from this transaction.
        emit LoanStarted(
            loan.loanId,
            msg.sender, //borrower,
            loan.loanPrincipalAmount,
            loan.maximumRepaymentAmount,
            loan.nftCollateralId,
            block.timestamp, //_loanStartTime
            loan.loanDuration,
            loan.loanInterestRateInBasisPoints,
            loan.nftCollateralContract
        );
    }

    // @notice This function is called by a borrower when they want to repay their loan. It can be called at any time after the loan has
    // begun. The interest will continue to accrue after the loan has expired. This function can
    // continue to be called by the borrower even after the loan has expired to retrieve their NFT. 
    function payBackLoan(uint256 _loanId) external nonReentrant payable {
        // Fetch loan details from storage, but store them in memory for the sake of saving gas.
        Loan memory loan = loanIdToLoan[_loanId];

        // Calculate the total Loan duration 
        uint256 totalLoanDuration = (uint256(loan.loanStartTime)).add(uint256(loan.loanDuration).add(gracePeriod));
        
        // Sanity check that payBackLoan() and liquidateOverdueLoan() have never been called on this loanId.
        require(!loanRepaidOrLiquidated[_loanId], 'Loan has already been repaid or liquidated');
        // Check that the loan duration is not overdue
        require(block.timestamp < totalLoanDuration, 'Loan overdue');
        // Check that the borrower is the caller, only the borrower is entitled to the collateral.
        require(msg.sender == loan.borrower, 'Only the borrower can pay back a loan and reclaim the underlying NFT');

        // Calculate amounts to send to the loan contract 
        uint256 interestDue = (loan.maximumRepaymentAmount).sub(loan.loanPrincipalAmount);
        uint256 payoffAmount = ((loan.loanPrincipalAmount).add(interestDue));
        uint256 totalPayoffAmount = (payoffAmount).add(adminFeeInMatic);

        // Mark loan as repaid before doing any external transfers to follow the Checks-Effects-Interactions design pattern.
        loanRepaidOrLiquidated[_loanId] = true;

        // Update number of active loans.
        totalActiveLoans = totalActiveLoans.sub(1);

        // Transfer principal-plus-interest-minus-fees from borrower to lender
        payable(address(this)).transfer(totalPayoffAmount);

        // Transfer collateral from this contract to borrower.
        require(_transferNftToAddress(
            loan.nftCollateralContract,
            loan.nftCollateralId,
            loan.borrower
        ), 'NFT was not successfully transferred');

        // Emit an event with all relevant details from this transaction.
        emit LoanRepaid(
            _loanId,
            loan.borrower,
            loan.loanPrincipalAmount,
            loan.nftCollateralId,
            payoffAmount,
            adminFeeInMatic,
            loan.nftCollateralContract
        );

        // Delete the loan from storage
        delete loanIdToLoan[_loanId];
    }

    // @notice This function is called by admin once a loan has finished its duration and the borrower still has not repaid.
    function liquidateOverdueLoan(uint256 _loanId) external nonReentrant onlyOwner {
        // Sanity check that payBackLoan() and liquidateOverdueLoan() have never been called on this loanId.
        require(!loanRepaidOrLiquidated[_loanId], 'Loan has already been repaid or liquidated');

        // Fetch loan details from storage, but store them in memory for the sake of saving gas.
        Loan memory loan = loanIdToLoan[_loanId];

        // Ensure that the loan is indeed overdue, since we can only liquidate overdue loans.
        uint256 loanMaturityDate = (uint256(loan.loanStartTime)).add(uint256(loan.loanDuration).add(gracePeriod));
        require(block.timestamp > loanMaturityDate, 'Loan is not overdue yet');

        // Mark loan as liquidated before doing any external transfers to follow the Checks-Effects-Interactions design pattern.
        loanRepaidOrLiquidated[_loanId] = true;

        // Update number of active loans.
        totalActiveLoans = totalActiveLoans.sub(1);

        // Emit an event with all relevant details from this transaction.
        emit LoanLiquidated(
            _loanId,
            loan.borrower,
            loan.loanPrincipalAmount,
            loan.nftCollateralId,
            loanMaturityDate,
            block.timestamp,
            loan.nftCollateralContract
        );

        // Delete the loan from storage.
        delete loanIdToLoan[_loanId];
    }

    // @notice This function can be used to view the amount of MATIC required by the borrower to repay their loan.
    function getPayoffAmount(uint256 _loanId) public view returns (uint256) {
        Loan storage loan = loanIdToLoan[_loanId];
        uint256 loanDurationSoFarInSeconds = (block.timestamp).sub(uint256(loan.loanStartTime));
        uint256 interestDue = _computeInterestDue(loan.loanPrincipalAmount, loan.maximumRepaymentAmount, loanDurationSoFarInSeconds, uint256(loan.loanDuration), uint256(loan.loanInterestRateInBasisPoints));
        return (loan.loanPrincipalAmount).add(interestDue);
    }

    // @notice A convenience function that calculates the amount of interest currently due for a given loan. The interest is capped at _maximumRepaymentAmount minus _loanPrincipalAmount.
    function _computeInterestDue(uint256 _loanPrincipalAmount, uint256 _maximumRepaymentAmount, uint256 _loanDurationSoFarInSeconds, uint256 _loanTotalDurationAgreedTo, uint256 _loanInterestRateInBasisPoints) internal pure returns (uint256) {
        uint256 interestDueAfterEntireDuration = (_loanPrincipalAmount.mul(_loanInterestRateInBasisPoints)).div(uint256(10000));
        uint256 interestDueAfterElapsedDuration = (interestDueAfterEntireDuration.mul(_loanDurationSoFarInSeconds)).div(_loanTotalDurationAgreedTo);
        if(_loanPrincipalAmount.add(interestDueAfterElapsedDuration) > _maximumRepaymentAmount){
            return _maximumRepaymentAmount.sub(_loanPrincipalAmount);
        } else {
            return interestDueAfterElapsedDuration;
        }
    }

    // @notice We call this function when we wish to transfer an NFT from our contract to another destination.
    function _transferNftToAddress(address _nftContract, uint256 _nftId, address _recipient) internal returns (bool) {
        (bool success, ) = _nftContract.call(abi.encodeWithSelector(IERC721(_nftContract).transferFrom.selector, address(this), _recipient, _nftId));
        return success;
        
    }

}
