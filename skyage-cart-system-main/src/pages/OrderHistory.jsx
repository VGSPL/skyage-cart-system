import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './OrderHistory.css';

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([
      { id: 'ORD1001', date: '18 Mar 2026', items: ['Wireless Mouse', 'Keyboard'], amount: 2999, status: 'Delivered' },
      { id: 'ORD1002', date: '15 Mar 2026', items: ['Laptop Sleeve'], amount: 799, status: 'Shipped' }
    ]);
  }, []);

  return (
    <div className="order-page-clean">
      <div className="order-container-clean">
        <h2>Order History</h2>
        <p>View your past orders</p>

        <button className="btn back-btn" onClick={() => navigate(-1)}>Back</button>

        <div className="order-list-clean">
          {orders.map(order => (
            <div className="order-card-clean" key={order.id}>
              <div className="order-header-clean">
                <span className="order-id">{order.id}</span>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div className="order-details-clean">
                <p className="order-date">{order.date}</p>
                <p className="order-items">{order.items.join(', ')}</p>
                <p className="order-amount">₹{order.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}