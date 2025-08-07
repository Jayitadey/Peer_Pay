import { useState } from "react";
import Loading from "./loading";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading,setloading]=useState(false);

  const sendOtp = async () => {
    try {
      const res = await fetch("https://peer-pay-1.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        alert(data.msg || "OTP sent successfully");
      } else {
        alert(data.msg || "Failed to send OTP");
      }
    } catch (err) {
      alert("Something went wrong while sending OTP");
    }finally{
      setloading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setloading(true);
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.msg || "Password reset successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        alert(data.msg || "Failed to reset password");
      }
    } catch (err) {
      alert("Something went wrong during password reset");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <i className="fas fa-unlock-alt text-blue-700 text-5xl animate-pulse"></i>
        <h2 className="text-2xl font-bold text-blue-800">Forgot Password</h2>

        <input
          type="email"
          placeholder="✉️ Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="🔑 Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="🔒 New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <button
          onClick={otpSent ? resetPassword : sendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium transition"
        >
          {otpSent ? "Reset Password" : "Send OTP"}
        </button>
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default ForgotPassword;