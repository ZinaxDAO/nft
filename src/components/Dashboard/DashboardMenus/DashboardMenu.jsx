import React, { useState } from "react";
import "./DashboardMenu.css";
import Star from "../../../assets/images/star.png";
import MintModal from "../../../common/Modals/MintModals/MintModal";
import RepayLoansModal from "../../../common/Modals/RepayLoansModals/RepayLoansModal";
import MyNfts from "../../../common/Modals/MyNfts/MyNfts";
import NftLoansModal from "../../../common/Modals/NftLoansModals/NftLoansModal";

const DashboardMenu = () => {
  const [showMyNfts, setShowMyNfts] = useState(false);
  const [nftLoansModal, setNftLoansModal] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [repayLoansModal, setRepayLoansModal] = useState(false);

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
            <p>get nft loans</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div onClick={() => setRepayLoansModal(true)}>
            <p>repay loans</p>
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
      {repayLoansModal && (<RepayLoansModal setRepayLoansModal={setRepayLoansModal} />)}
    </React.Fragment>
  );
};

export default DashboardMenu;
