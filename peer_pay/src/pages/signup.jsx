import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./loading";

function Signup() {
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setloading(true);
      const res = await fetch("https://peer-pay-1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Failed to send OTP");

      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }finally{
      setloading(false);
    }
  };

  const handleVerifyOtpAndSignup = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetch("https://peer-pay-1.onrender.com/api/auth/OTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Create Your Peer Pay Account</h2>

        <form onSubmit={otpSent ? handleVerifyOtpAndSignup : handleInitialSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              disabled={otpSent}
              className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={otpSent}
              className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!otpSent && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-blue-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {otpSent ? "Verify & Sign Up" : "Send OTP"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-blue-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default Signup;