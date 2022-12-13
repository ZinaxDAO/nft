import './ReferFriendModal.css';
import { useState } from "react";

function ReferFriendModal(props) {
  const { setReferFriendModal } = props;
  const [referralAddress, setReferralAddress] = useState("");

  return (
    <div className="referFriendModal">
      <div className="referFriendModalTitle">Refer & Earn</div>
      <div className="referFriendModalContent">
        <div>
          <div>
            <input
                className="modalInput"
                type="text"
                value={referralAddress}
                placeholder="NFT ID"
                onChange={ async(e) => {
                  setReferralAddress(e.target.value);
                }}
              />
          </div>
          <button>Refer Friend</button>
        </div>
      </div>
    </div>
  );
}

export default ReferFriendModal;