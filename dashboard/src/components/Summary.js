import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const Summary = () => {
  const { user } = useContext(AuthContext);
  const displayName = user?.username || "User";

  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/allHoldings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        setLoading(false);
      });
  }, []);

  // Calculate real values from holdings
  let totalInvestment = 0;
  let currentValue = 0;

  holdings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;
  const pnlClass = pnl >= 0 ? "profit" : "loss";

  const formatCurrency = (val) => {
    if (val >= 100000) return (val / 100000).toFixed(2) + "L";
    if (val >= 1000) return (val / 1000).toFixed(2) + "k";
    return val.toFixed(2);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {displayName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{loading ? "..." : formatCurrency(currentValue - totalInvestment + 3740)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{loading ? "..." : formatCurrency(totalInvestment)}</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({loading ? "..." : holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {loading ? "..." : formatCurrency(Math.abs(pnl))}{" "}
              <small>
                {pnl >= 0 ? "+" : "-"}{Math.abs(pnlPercent)}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{loading ? "..." : formatCurrency(currentValue)}</span>
            </p>
            <p>
              Investment <span>{loading ? "..." : formatCurrency(totalInvestment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
