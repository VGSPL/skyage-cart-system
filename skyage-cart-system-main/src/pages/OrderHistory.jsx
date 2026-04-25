import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/API";
import "./OrderHistory.css";

export default function OrderHistory() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);

        const data = await getMyOrders();

        setOrders(data.results || data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load orders", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
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

        
        {loading && <p>Loading orders...</p>}
        
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && orders.length === 0 && !error && (
          <p>No orders found</p>
        )}

        <div className="order-list-clean">
          {orders.map((order) => (
            <div className="order-card-clean" key={order.id}>
              <div className="order-header-clean">
                <span className="order-id">#{order.id}</span>

                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-details-clean">
                <p className="order-date">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "No date"}
                </p>

                <p className="order-items">
                  {(order.items || [])
                    .map((i) => i.product_name)
                    .join(", ") || "No items"}
                </p>

                <p className="order-amount">
                  ₹{order.total_amount || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


