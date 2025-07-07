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
        const res = await fetch("http://localhost:5000/api/account/history", {
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
            {transactions.map((txn, index) => (
              <li key={index} className="history-item">
                <span className="txn-type">{txn.type}</span>
                <span className="txn-amount">₹ {txn.amount}</span>
                <span className="txn-date">{new Date(txn.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;