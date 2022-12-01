
import './NftLoansModalBox.css';
import { paybackZinarLoan } from "../../../../services/zinarLoanContractService";

function RepayLoanModalBox(props) {

  return (
    <div className="nftLoansModal">
      <div className="nftLoansModalTitle">{props.nftName}</div>
      <div className="nftLoansModalContent">
        <div>
          <video autoPlay loop src={props.nftImage} width={250} height={250}/>
        </div>
        <div>
          <div>BUSD Balance: </div>
          <div>NFT ID: {props.nftId}</div>
          <div>Loaned Amount: </div>
          <div>Accrued Interest</div>
          <button onClick={()=> paybackZinarLoan(props.nftId)}>Repay Loan</button>
        </div>
      </div>
    </div>
  );
}

export default RepayLoanModalBox;