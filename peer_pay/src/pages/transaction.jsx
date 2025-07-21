import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./transaction.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://peer-pay-1.onrender.com/api/account/history", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setTransactions(data.transactions.reverse()); // latest first
        } else {
          setError(data.msg || "Failed to load transactions");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div className="history-container">
      <div className="history-box">
        <h2 className="history-title">Transaction History</h2>

        {error && <p className="history-error">{error}</p>}

        {transactions.length === 0 ? (
          <p className="history-empty">No transactions yet.</p>
        ) : (
          <ul className="history-list">
  {transactions
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .map((txn, index) => (
     
<li key={txn._id || index} className="history-item">
  <span className="txn-type">
  {txn.type === "transfer"
    ? `Sent to ${txn.recipientId?.username || "Unknown"}`
    : txn.type === "received"
    ? `Received from ${txn.recipientId?.username || "Unknown"}`
    : txn.type === "deposit"
    ? `Deposited ₹${txn.amount}`
    : txn.type === "withdraw"
    ? `Withdrew ₹${txn.amount}`
    : txn.type}
</span>

  <span className="txn-amount">₹ {txn.amount}</span>

  <span className="txn-date">
    {txn.timestamp ? new Date(txn.timestamp).toLocaleString() : "Date not available"}
  </span>
</li>

     
    ))}
</ul>
        
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;