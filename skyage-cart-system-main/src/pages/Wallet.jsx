import React, { useEffect, useState } from "react";
import { getWalletBalance, withdrawWallet, getWalletTransactions } from "../services/API";
import { Link } from "react-router-dom";
import "./Wallet.css";

export default function Wallet() {

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  const fetchBalance = async () => {
    try {
      const data = await getWalletBalance();
      setBalance(parseFloat(data.balance || 0));
    } catch (err) {
      console.error("Wallet balance error:", err);
    }
  };

  
  const fetchTransactions = async () => {
    try {
      const data = await getWalletTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const handleWithdraw = async (e) => {

    e.preventDefault();

    if (!amount || !upiId) {
      setMessage("Please enter amount and UPI ID");
      return;
    }

    if (parseFloat(amount) > balance) {
      setMessage("Insufficient wallet balance");
      return;
    }

    try {

      setLoading(true);

      await withdrawWallet({
        amount: amount,
        upi_id: upiId
      });

      setMessage("Withdrawal request submitted successfully");

      setAmount("");
      setUpiId("");

      fetchBalance();
      fetchTransactions();

    } catch (err) {

      console.error(err);
      setMessage("Withdrawal failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="wallet-container">

      <h2 className="wallet-balance">
        💰 Wallet Balance: ₹{balance.toFixed(2)}
      </h2>

      <div className="wallet-card">

        <h3>💸 Withdraw Funds</h3>

        <form onSubmit={handleWithdraw}>

          <label>Withdrawal Amount:</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Your UPI ID:</label>

          <input
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

          <button className="withdraw-btn" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Withdraw Money"}
          </button>

        </form>

        {message && <p className="wallet-message">{message}</p>}

      </div>

      <div className="wallet-section">
        <h4>📤 Your Withdrawal Requests ▼</h4>
        <p className="wallet-empty">No withdrawal requests found.</p>
      </div>

      <div className="wallet-section">

        <h4>📊 Transaction History</h4>

        {transactions.length === 0 ? (
          <p className="wallet-empty">No transactions found.</p>
        ) : (

          <table className="wallet-table">

            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {transactions.map((tx, index) => (

                <tr key={index}>

                  <td className={tx.transaction_type}>
                    {tx.transaction_type}
                  </td>

                  <td>₹{tx.amount}</td>

                  <td>{tx.description}</td>

                  <td>
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <div className="back-profile">
        <Link to="/profile">← Back to Profile</Link>
      </div>

    </div>

  );
}






