import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
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
    }
  };

  const resetPassword = async () => {
    try {
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
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </>
        )}
        <button onClick={otpSent ? resetPassword : sendOtp}>
          {otpSent ? "Reset Password" : "Send OTP"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;