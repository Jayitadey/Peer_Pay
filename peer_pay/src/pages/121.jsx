import React, { useState } from "react";
import "./121.css"; // Create this to match your current theme

function Transfer() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token"); // Assumes token is stored at login
      const response = await fetch("https://peer-pay-1.onrender.com/api/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientEmail, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Transfer successful");
        setRecipientEmail("");
        setAmount("");
      } else {
        setError(data.msg || "❌ Transfer failed");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      setError("❌ Network error");
    }
  };

  return (
    <div className="transfer-container">
      <div className="transfer-box">
        <h2 className="transfer-title">Send Money</h2>

        {message && <p className="transfer-success">{message}</p>}
        {error && <p className="transfer-error">{error}</p>}

        <form className="transfer-form" onSubmit={handleTransfer}>
          <label htmlFor="recipientEmail">Recipient Email</label>
          <input
            type="email"
            id="recipientEmail"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />

          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={1}
          />

          <button type="submit">Transfer</button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;