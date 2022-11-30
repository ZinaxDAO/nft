import { useState } from "react";
import './NftLoansModalBox.css';
import { setLoanPrincipal } from "../../../../services/mintNftContractService";
import { takeZinarLoan, setIntRate } from "../../../../services/zinarLoanContractService";

function TakeLoanModalBox(props) {
  const beginLoan = async() => {
    //let selectedNft = {...nft};
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
          <div>BUSD Balance: </div>
          <div>NFT ID: {props.nftId}</div>
          <div>Loaned Amount: </div>
          <div>Accrued Interest</div>
          <button onClick={beginLoan}>Borrow Now</button>
        </div>
      </div>
    </div>
  );
}

export default TakeLoanModalBox;