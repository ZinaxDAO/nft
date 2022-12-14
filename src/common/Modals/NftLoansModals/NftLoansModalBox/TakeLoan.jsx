import './NftLoansModalBox.css';
import { setLoanPrincipal } from "../../../../services/mintNftContractService";
import { takeZinarLoan, setIntRate } from "../../../../services/zinarLoanContractService";

function TakeLoanModalBox(props) {
  const beginLoan = async() => {
    try {
        takeZinarLoan(setLoanPrincipal(props.nftName), props.nftId, setIntRate(props.nftName));
    }catch(error) {
        console.log(error)
    }
  }

  return (
    <div className="nftLoansModal">
      <div className="nftLoansModalTitle">{props.nftName}</div>
      <div className="nftLoansModalContent">
        <div>
          <video autoPlay loop src={props.nftImage} width={250} height={250}/>
        </div>
        <div>
          <div>MATIC Balance: </div>
          <div>NFT ID: {props.nftId}</div>
          <div>Loan Amount: </div>
          
          <button onClick={beginLoan}>Borrow Now</button>
        </div>
      </div>
    </div>
  );
}

export default TakeLoanModalBox;