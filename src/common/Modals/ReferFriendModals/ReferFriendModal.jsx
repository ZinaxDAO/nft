import './ReferFriendModal.css';
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { referFriend } from '../../../services/mintNftContractService';
import referaFriend from '../../../assets/images/refer-a-friend.png';

function ReferFriendModal(props) {
  const { setReferFriendModal } = props;
  const [referralAddress, setReferralAddress] = useState("");

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setReferFriendModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <div className="referFriendModal">
            <div className="referFriendModalTitle">Refer & Earn</div>
            <div className="referFriendModalContent">
              <div>
                <img src={referaFriend} alt="refer a friend image" />
              </div>
              <div>
                <div>
                  <input
                    className="modalInput"
                    type="text"
                    value={referralAddress}
                    placeholder="Enter Referral Address"
                    onChange={ async(e) => {
                      setReferralAddress(e.target.value);
                    }}
                  />
                </div>
                <button onClick={() => referFriend(referralAddress)}>Refer Friend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ReferFriendModal;