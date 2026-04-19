import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWalletBalance
} from "../services/API";
import "./Wallet.css";

export default function Wallet() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      setLoading(true);

      const data = await getWalletBalance();

      setBalance(parseFloat(data.balance || 0));

    } catch (err) {
      console.error("Wallet fetch error:", err);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);


  const viewTransactions = () => {
    navigate("/wallet-transactions");
  };

  return (
    <div className="wallet-container">
      <h2 className="wallet-title">Wallet Balance</h2>

      <div className="wallet-balance">
        {loading ? "Loading..." : `₹ ${balance.toFixed(2)}`}
      </div>

      <button className="wallet-btn" onClick={viewTransactions}>
        View transaction history
      </button>
    </div>
  );
}












