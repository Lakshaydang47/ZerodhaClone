import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://zerodha-clone-backend-gamma.vercel.app/allPositions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h3 className="title">Positions</h3>
        <p>Loading positions...</p>
      </div>
    );
  }

  if (allPositions.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You don't have any open positions</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  let totalPnL = 0;
  allPositions.forEach((stock) => {
    totalPnL += (stock.price - stock.avg) * stock.qty;
  });

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL >= 0 ? "+" : ""}
            {totalPnL.toFixed(2)}
          </h5>
          <p>Total P&L</p>
        </div>
      </div>
    </>
  );
};

export default Positions;
