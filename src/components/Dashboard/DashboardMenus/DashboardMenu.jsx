import React, { useState } from "react";
import "./DashboardMenu.css";
import Star from "../../../assets/images/star.png";
import NftModal from "../../../common/Modals/NFTModals/NftModal";
import MintModal from "../../../common/Modals/MintModals/MintModal";
import RepayLoansModal from "../../../common/Modals/RepayLoansModals/RepayLoansModal";

const DashboardMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [repayLoansModal, setRepayLoansModal] = useState(false);

  return (
    <React.Fragment>
      <div className="dashboard-menu-section">
        <div className="dashboard-menus">
          <div
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <p>my collections</p>
            <div>
              <img src={Star} alt="star" className="star-image" />
            </div>
          </div>

          <div>
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
      </div>

      {openModal && <NftModal setOpenModal={setOpenModal} />}
      {mintModal && <MintModal setMintModal={setMintModal} />}
      {repayLoansModal && (
        <RepayLoansModal setRepayLoansModal={setRepayLoansModal} />
      )}
    </React.Fragment>
  );
};

export default DashboardMenu;
