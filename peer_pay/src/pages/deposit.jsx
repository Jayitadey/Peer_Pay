import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./deposit.css"; // You will create this for styling

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://peer-pay-1.onrender.com/api/account/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Deposit successful! New balance: ₹${data.balance}`);
        setAmount("");
      } else {
        setMessage(data.msg || "Deposit failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="deposit-container">
      <div className="deposit-box">
        <h2 className="deposit-title">Deposit Funds</h2>

        <form onSubmit={handleDeposit} className="deposit-form">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Deposit</button>
        </form>

        {message && <p className="deposit-message">{message}</p>}
      </div>
    </div>
  );
};
export default Deposit;