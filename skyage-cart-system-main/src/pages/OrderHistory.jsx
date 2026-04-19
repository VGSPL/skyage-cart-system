import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/API";
import "./OrderHistory.css";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data.results || data || []);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="order-page-clean">
      <div className="order-container-clean">
        <h2>Order History</h2>
        <p>View your past orders</p>

        <button className="btn back-btn" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="order-list-clean">
          {orders.map((order) => (
            <div className="order-card-clean" key={order.id}>
              <div className="order-header-clean">
                <span className="order-id">{order.id}</span>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-details-clean">
                <p className="order-date">{order.created_at}</p>
                <p className="order-items">
                  {order.items?.map((i) => i.product_name).join(", ")}
                </p>
                <p className="order-amount">₹{order.total_amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


