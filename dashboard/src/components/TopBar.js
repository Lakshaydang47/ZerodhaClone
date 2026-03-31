import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  const niftyPoints = 22452.15;
  const niftyChange = +127.30;
  const niftyPercent = ((niftyChange / niftyPoints) * 100).toFixed(2);

  const sensexPoints = 73876.82;
  const sensexChange = +354.78;
  const sensexPercent = ((sensexChange / sensexPoints) * 100).toFixed(2);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">
            {niftyPoints.toLocaleString("en-IN")}
          </p>
          <p className={niftyChange >= 0 ? "percent up" : "percent down"}>
            {niftyChange >= 0 ? "+" : ""}{niftyChange.toFixed(2)} ({niftyPercent}%)
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">
            {sensexPoints.toLocaleString("en-IN")}
          </p>
          <p className={sensexChange >= 0 ? "percent up" : "percent down"}>
            {sensexChange >= 0 ? "+" : ""}{sensexChange.toFixed(2)} ({sensexPercent}%)
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
