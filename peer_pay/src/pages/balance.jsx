import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./balance.css";

const ViewBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://peer-pay-1.onrender.com/api/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setBalance(data.balance);
        } else {
          setError(data.msg || "Failed to fetch balance");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }
    };

    fetchBalance();
  }, [navigate]);

  return (
    <div className="balance-container">
      <div className="balance-box">
        <h2 className="balance-title">Your Account Balance</h2>
        {balance !== null ? (
          <p className="balance-amount">₹ {balance.toFixed(2)}</p>
        ) : (
          <p className="balance-error">{error || "Loading..."}</p>
        )}
      </div>
    </div>
  );
};

export default ViewBalance;