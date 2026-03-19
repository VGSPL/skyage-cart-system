import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

export default function Wallet() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.balance !== undefined) {
      setBalance(user.balance);
    } else {

      setBalance(100.0);
    }
  }, []);

  const viewTransactions = () => {

    navigate("/wallet-transactions");
  };

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Wallet Balance</h2>

      <div className="wallet-balance">
        ₹ {balance.toFixed(2)}
      </div>

      <button className="wallet-btn" onClick={viewTransactions}>
        View transaction history
      </button>
    </div>
  );
}