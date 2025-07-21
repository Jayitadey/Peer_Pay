import React, { useState } from "react";
import "./withdraw.css"; // You can reuse deposit styles here too

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://peer-pay-1.onrender.com/api/account/withdraw", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        setError("");
        setAmount("");
      } else {
        setError(data.msg || "Withdrawal failed");
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="withdraw-container">
      <div className="withdraw-box">
        <h2 className="withdraw-title">Withdraw Funds</h2>

        <form onSubmit={handleWithdraw} className="withdraw-form">
          <label htmlFor="amount">Amount to Withdraw</label>
          <input
            type="number"
            id="amount"
            value={amount}
            placeholder="Enter amount (₹)"
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type="submit">Withdraw</button>
        </form>

        {message && <p className="withdraw-success">{message}</p>}
        {error && <p className="withdraw-error">{error}</p>}
      </div>
    </div>
  );
}

export default Withdraw;