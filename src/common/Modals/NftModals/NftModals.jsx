import React from "react";
import "./NftModal.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const NftModal = (props) => {
  const { setOpenModal } = props;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeModalBtn">
          <CancelOutlinedIcon
            onClick={() => setOpenModal(false)}
            className="button"
          />
        </div>
        <div className="modalContent">
          <p>NFTModals</p>
        </div>
      </div>
    </div>
  );
};

export default NftModal;
