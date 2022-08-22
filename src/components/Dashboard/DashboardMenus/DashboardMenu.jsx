import React, { useState } from "react";
import "./DashboardMenu.css";
import Star from "../../../assets/images/star.png";
import MintModal from "../../../common/Modals/MintModals/MintModal";
import NftStakingModal from "../../../common/Modals/RepayLoansModals/RepayLoansModal";
import MyNfts from "../../../common/Modals/MyNfts/MyNfts";
import NftLoansModal from "../../../common/Modals/NftLoansModals/NftLoansModal";

const DashboardMenu = () => {
  const [showMyNfts, setShowMyNfts] = useState(false);
  const [nftLoansModal, setNftLoansModal] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [nftStakingModal, setNftStakingModal] = useState(false);

  // let scrollState = document.body.style.overflow;

  // useEffect(() => {
  //   repayLoansModal ? (scrollState = "hidden") : (scrollState = "unset");
  // });

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

          <div onClick={() => setNftStakingModal(true)}>
            <p>nft staking</p>
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

          <div>
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
      {nftStakingModal && (<NftStakingModal setNftStakingModal={setNftStakingModal} />)}
    </React.Fragment>
  );
};

export default DashboardMenu;
