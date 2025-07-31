import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {QrReader} from "react-qr-reader";
import "./QRPay.css";


function QRPay() {
  const [scannedUser, setScannedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setScannedUser(parsed);
        setError("");
      } catch (err) {
        setError("Invalid QR code scanned.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("QR scan error. Check your camera or permission.");
  };

  const handleSend = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Login session expired. Please login again.");
      return;
    }

    try {
      const res = await fetch("https://peer-pay-1.onrender.com/api/transaction/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: scannedUser.userId,
          amount: Number(amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Transaction failed");
      } else {
        setSuccess("Payment successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Transaction failed. Try again later.");
    }
  };

  return (
    <div className="qrpay-container">
      <h2 className="qrpay-title">Scan QR to Pay</h2>

      {!scannedUser ? (
        <QrReader
  constraints={{ facingMode:"user" }}
  onResult={(result, error) => {
    if (!!result) {
      handleScan(result?.text);
    }
    if (!!error) {
      handleError(error);
    }
  }}
  style={{ width: "100%" }}
/>
      ) : (
        <div className="payment-section">
          <p>
            Pay to: <strong>{scannedUser.name} ({scannedUser.email})</strong>
          </p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleSend}>Send Money</button>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
    </div>
  );
}

export default QRPay;