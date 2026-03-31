import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [status, setStatus] = useState("");

  const generalContext = useContext(GeneralContext);

  const handleSellClick = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://zerodha-clone-backend-gamma.vercel.app/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "SELL",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setStatus("Sell order placed!");
        setTimeout(() => {
          generalContext.closeSellWindow();
        }, 1000);
      })
      .catch((err) => {
        setStatus("Failed to place order");
      });
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container sell-window" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
        {status && (
          <p className={status.includes("Failed") ? "order-error" : "order-success"}>
            {status}
          </p>
        )}
      </div>

      <div className="buttons">
        <span>Stock: {uid}</span>
        <div>
          <Link className="btn btn-orange" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
