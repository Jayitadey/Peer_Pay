import React, { useState } from "react";

function OtpForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.msg);
        setError("");
      } else {
        setError(data.msg);
        setMsg("");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ OTP verified successfully!");
        setError("");
      } else {
        setError(data.msg || "OTP verification failed");
        setMsg("");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify Your Identity</h2>
      <input
        type="email"
        placeholder="Enter your Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Enter your Phone Number (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>

      {msg && <p className="otp-success">{msg}</p>}
      {error && <p className="otp-error">{error}</p>}
    </div>
  );
}

export default OtpForm;