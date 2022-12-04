import { useState } from "react";
import chooseNft from "../../../../helper/chooseNfts";
import "./MintModalBox.css";

function MintModalBox(props) {
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const mintZinarNft = async () => {
    if (!quantity) {
      return;
    }
    await chooseNft(props.nftName, quantity, totalPrice);
    setQuantity("");
    setTotalPrice("");
  };

  return (
    <div className="mintModal">
      <div className="mintModalTitle">{props.nftName}</div>
      <div className="mintModalContent">
        <div>{props.nftImage}</div>
        <div>
          <div>MATIC Balance</div> {/* fetch this using moralis */}
          <div>{props.nftPrice}</div>
          <div>
            <input
              className="modalInput"
              type="text"
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
                const total = e.target.value * props.nftPrice;
                setTotalPrice(String(total.toFixed(1)));
              }}
            />
          </div>{" "}
          {/* quantity of zinar to mint */}
          <div>
            <input
              className="modalInput"
              type="text"
              value={totalPrice}
              placeholder="Total Price"
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>{" "}
          {/* nft price * quantity */}
          <button onClick={mintZinarNft}>MINT NOW</button>
        </div>
      </div>
    </div>
  );
}

export default MintModalBox;
