import React, { useState } from "react";
import "./DashboardMenu.css";
import Star from "../../../assets/images/star.png";
import MintModal from "../../../common/Modals/MintModals/MintModal";
import RepayLoansModal from "../../../common/Modals/RepayLoansModals/RepayLoansModal";
import MyNfts from "../../../common/Modals/MyNfts/MyNfts";
import NftLoansModal from "../../../common/Modals/NftLoansModals/NftLoansModal";
import ReferFriendModal from "../../../common/Modals/ReferFriendModals/ReferFriendModal";

const DashboardMenu = () => {
  const [showMyNfts, setShowMyNfts] = useState(false);
  const [nftLoansModal, setNftLoansModal] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [repayLoansModal, setRepayLoansModal] = useState(false);
  const [referFriendModal, setReferFriendModal] = useState(false);

  return (
    <React.Fragment>
      <div className="dashboard-menu-section">
        <div
          className={`dashboard-menus ${
            showMyNfts && " dashboard-menus-onclick-style"
          }`}
        >
          <div
            onClick={() => {
              setShowMyNfts(!showMyNfts);
            }}
          >
            <p>my nfts</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div onClick={() => setNftLoansModal(true)}>
            <p>nft loans</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div onClick={() => setMintModal(true)}>
            <p>mint zinar</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div onClick={() => setRepayLoansModal(true)}>
            <p>repay loan</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div onClick={() => setReferFriendModal(true)}>
            <p className="refer-friend-p">refer friend</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>
        </div>

        {showMyNfts && <MyNfts setShowMyNfts={setShowMyNfts} />}
      </div>

      {mintModal && <MintModal setMintModal={setMintModal} />}
      {nftLoansModal && <NftLoansModal setNftLoansModal={setNftLoansModal} />}
      {repayLoansModal && (<RepayLoansModal setRepayLoansModal={setRepayLoansModal} />)}
      {referFriendModal && <ReferFriendModal setReferFriendModal={setReferFriendModal} />}
    </React.Fragment>
  );
};

export default DashboardMenu;
