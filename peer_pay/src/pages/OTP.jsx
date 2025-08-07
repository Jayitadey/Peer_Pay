import React, { useState } from "react";
import Loading from "./loading";
function OtpForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false);
  const handleSendOtp = async () => {
    try {
      const res = await fetch("https://peer-pay-1.onrender.com/api/auth/send-otp", {
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
      setloading(true);
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
    }finally{
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5 text-center">
        <i className="fas fa-shield-alt text-blue-600 text-5xl animate-pulse"></i>
        <h2 className="text-2xl font-bold text-blue-800">Verify Your Identity</h2>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="📧 Enter your Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="📱 Enter your Phone Number (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium transition"
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="🔐 Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-medium transition"
          >
            Verify OTP
          </button>

          {msg && <p className="text-green-600 text-sm font-medium">{msg}</p>}
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
        </div>
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default OtpForm;