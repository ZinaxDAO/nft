import './RepayLoansModalBox.css';
import { getPayOffAmount, paybackZinarLoan } from "../../../../services/zinarLoanContractService";
import { useState } from "react";

function RepayLoanModalBox(props) {
  const [nftId, setNftId] = useState();
  const [repayAmount, setRepayAmount] = useState();

  return (
    <div className="repayLoansModal">
      <div className="repayLoansModalTitle">Repay {props.nftName} Loan</div>
      <div className="repayLoansModalContent">
        <div>{props.nftImage}</div>
        <div>
          <div>MATIC Balance: </div>
          <div>
            <input
                className="modalInput"
                type="text"
                value={nftId}
                placeholder="Enter NFT ID"
                onChange={ async(e) => {
                  setNftId(e.target.value);
                  const payOffAmount = await getPayOffAmount(e.target.value);
                  console.log(payOffAmount);
                  setRepayAmount(payOffAmount);
                }}
              />
          </div>
          <div>Loaned Amount: </div>
          <div>
            {repayAmount ? <h3>{repayAmount}</h3> : <h3>0</h3>}
          </div>
          <button onClick={()=> paybackZinarLoan(nftId)}>Repay Loan</button>
        </div>
      </div>
    </div>
  );
}

export default RepayLoanModalBox;