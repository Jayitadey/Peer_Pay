import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./loading";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setloading]=useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch("https://peer-pay-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }finally{
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Login to Peer Pay</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-blue-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-900 font-medium hover:underline">
            Sign up
          </Link>
        </div>

        <div className="text-sm text-center mt-2">
          <Link to="/ForgotPassword" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default Login;