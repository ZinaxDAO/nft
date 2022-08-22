// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IRewardToken is IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract ZinarStakingSystem is Ownable, ERC721Holder, ReentrancyGuard {
    using SafeMath for uint256;
    
    IERC20 public zinaxToken;
    IERC721 public zinarNft;

    uint256 public stakingFee = 0.01 ether;
    uint256 public withdrawalFee = 0.02 ether;
    uint256 public stakedTotal; // total Zinar NFTs staked
    uint256 public constant stakingTime = 365 days;
    uint256 public constant token = 10e18;
    uint256 public pid;
    uint256 public totalAllocPoint;
    uint256 public blocksPerYear = 10515000;
    uint256 public totalSupplyPerYear = 1000000 * token;
    ZinarPools[] public poolInfo;

    struct ZinarPools {
        string poolName;
        IERC20 rewardsToken;
        uint256 pid; // pool ID
        uint256 tokensStakedInPool; // number of tokens in each pool 
        uint256 allocPoint;
        uint256 rewardsAllocted;
        uint256 rewardsPerBlock;       // How many allocation points assigned to this pool. ZINAXs to distribute per block.
        uint256 lastRewardBlock;  // Last block number that ZINAXs distribution occurs.
    }
    
    struct ZinarToken {
        uint256 tokenId; // array holds the tokenIds in the staker wallet address
        address owner;
        uint256 tokenStakingTime; // token stake time
        uint256 blockNumber; // block number when token was staked
        uint256 balance; // current amount of reward tokens for NFT
        uint256 rewardsReleased; // total reward tokens released to the user since staking
    }

    constructor() {
        zinarNft = IERC721(0xA53f375F375F633f4F8db67aF19dfF1B9fCF735F);
        zinaxToken = IERC20(0x9C9e6ccCe1De4f892e22C4b5D9Ce4De398Be1874);
        pid = 0;
        totalAllocPoint = 100;
    }

    // mapping of a staked NFT to its id
    mapping(uint256 => ZinarToken) public stakedTokens;
    mapping(uint256 => ZinarPools) public stakingPools;

    // Mapping from token ID to owner address
    mapping(uint256 => address) public tokenOwner;
    bool public tokensClaimable;
    bool initialised;

    // event emitted when a user has staked an nft
    event Staked(address owner, uint256 amount);

    // event emitted when a user has unstaked an nft
    event Unstaked(address owner, uint256 amount);

    // event emitted when a user claims reward
    event RewardPaid(address indexed user, uint256 reward);

    // Allows reward tokens to be claimed
    event ClaimableStatusUpdated(bool status);

    function addPool(string memory _poolName, uint256 _allocPoint) public onlyOwner {
        uint256 zinaxAllocated = _allocPoint.div(totalAllocPoint).mul(totalSupplyPerYear);
        uint256 rewardsPerBlock = zinaxAllocated.div(blocksPerYear);
        stakingPools[pid] = ZinarPools(
            _poolName,
            zinaxToken,
            pid,
            0,
            _allocPoint,
            zinaxAllocated,
            rewardsPerBlock,
            block.timestamp
        );

        poolInfo.push(stakingPools[pid]);
        pid++;
    }

    function initStaking() public onlyOwner {
        //needs access control
        require(!initialised, "Already initialised");
        initialised = true;
    }

    function setTokensClaimable() public onlyOwner returns (bool) {
        //needs access control
        tokensClaimable = !tokensClaimable;
        return tokensClaimable;
    }

    function getStakedTokens() public view returns (uint256 tokenId) {
    }

    function getMultiplier(uint256 _from, uint256 _to) public pure returns (uint256) {
        return _to.sub(_from);
    }

    function stake(uint256 tokenId, uint256 _pid) public payable {
        // payable(address(this)).transfer(stakingFee);
        _stake(tokenId, _pid);
    }

    /**
    @dev mark function as payable for the stake fee which will be in matic 
    */
    function _stake(uint256 _tokenId, uint256 _pid) internal {
        require(initialised, "The staking has not started");
        require(
            zinarNft.ownerOf(_tokenId) == msg.sender,
            "user must be the owner of the token"
        );
        ZinarPools storage pool = stakingPools[_pid];
        ZinarToken storage stakedToken = stakedTokens[_tokenId];

        pool.tokensStakedInPool++;

        stakedToken.tokenStakingTime = block.timestamp;
        stakedToken.blockNumber = block.number;
        tokenOwner[_tokenId] = msg.sender;
        zinarNft.safeTransferFrom(msg.sender, address(this), _tokenId);

        emit Staked(msg.sender, _tokenId);
        stakedTotal++;
    }

    /**
    @dev mark function as payable for the MATIC withdrawal fee 
    */
    function unstake(uint256 _tokenId, uint256 _pid) public payable nonReentrant {
        // payable(address(this)).transfer(withdrawalFee);
        claimReward(_tokenId, _pid);
        _unstake(_tokenId, _pid);
    }

    function _unstake(uint256 _tokenId, uint256 _pid) internal {
        require(
            tokenOwner[_tokenId] == msg.sender,
            "Nft Staking System: user must be the owner of the staked nft"
        );
        ZinarPools storage pool = stakingPools[_pid];
        ZinarToken storage stakedToken = stakedTokens[_tokenId];
        stakedToken.tokenStakingTime = 0;
        stakedToken.blockNumber = 0;

        pool.tokensStakedInPool--;

        delete tokenOwner[_tokenId];
        stakedTotal--;

        zinarNft.safeTransferFrom(address(this), msg.sender, _tokenId);

        emit Unstaked(msg.sender, _tokenId);
    }

    /**
    @dev Set tokenId as function parameter and remove the loop for tokenIds in the function 
    */
    function _updateReward(address _user, uint256 _tokenId, uint256 _pid) internal {
        ZinarToken storage stakedToken = stakedTokens[_tokenId];

        uint256 totalPoolStake = stakingPools[_pid].tokensStakedInPool;
        uint256 blockRewards = stakingPools[_pid].rewardsPerBlock;
        uint256 multiplier = getMultiplier(stakedToken.blockNumber, block.number);
        uint256 zinaxReward = blockRewards.div(totalPoolStake).mul(multiplier);

        stakedToken.balance += zinaxReward;
    }

    function claimReward(uint256 _tokenId, uint256 _pid) payable public nonReentrant {
        _updateReward(msg.sender, _tokenId, _pid);
        require(tokensClaimable == true, "Tokens cannnot be claimed yet");
        require(stakedTokens[_tokenId].balance > 0 , "0 rewards yet");
        
        stakedTokens[_tokenId].rewardsReleased += stakedTokens[_tokenId].balance;

         zinaxToken.transfer(msg.sender, stakedTokens[_tokenId].balance);

        stakedTokens[_tokenId].balance = 0;

        emit RewardPaid(msg.sender, stakedTokens[_tokenId].balance);
    }

    function withdraw() public onlyOwner nonReentrant payable {
        uint256 balance = address(this).balance;
        require(balance > 0, "Balance should be more then zero");
        payable(owner()).transfer(balance);
    }
}
