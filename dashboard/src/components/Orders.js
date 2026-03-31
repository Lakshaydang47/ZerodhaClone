import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/allOrders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3002/deleteOrder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Remove from local state
        setAllOrders(allOrders.filter((order) => order._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting order:", err);
      });
  };

  if (loading) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => {
              const modeClass = order.mode === "BUY" ? "profit" : "loss";
              const formattedDate = new Date(order.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td>
                    <span className={`order-badge ${modeClass}`}>
                      {order.mode}
                    </span>
                  </td>
                  <td>{formattedDate}</td>
                  <td>
                    <button
                      className="cancel-order-btn"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
