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
                placeholder="NFT ID"
                onChange={(e) => {
                  setNftId(e.target.value);
                  const payOffAmount = getPayOffAmount(e.target.value);
                  setRepayAmount(payOffAmount);
                }}
              />
          </div>
          <div>Loaned Amount: </div>
          <div>
            <input
              className="modalInput"
              type="text"
              value={repayAmount}
              placeholder="Repay Amount"
              onChange={(e) => setRepayAmount(e.target.value)}
            />
          </div>
          <button onClick={()=> paybackZinarLoan(nftId)}>Repay Loan</button>
        </div>
      </div>
    </div>
  );
}

export default RepayLoanModalBox;