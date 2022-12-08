import './ReferFriendModal.css';
import { useState } from "react";

function ReferFriendModal(props) {
  const [referralAddress, setReferralAddress] = useState("");

  return (
    <div className="referFriendModal">
      <div className="referFriendModalTitle">Refer & Earn</div>
      <div className="referFriendModalContent">
        <div>{props.nftImage}</div>
        <div>
          <div>MATIC Balance: </div>
          <div>
            <input
                className="modalInput"
                type="text"
                value={nftId}
                placeholder="NFT ID"
                onChange={ async(e) => {
                  
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

export default ReferFriendModal;