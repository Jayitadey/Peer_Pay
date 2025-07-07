import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate password match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      // Store token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Peer Pay Account</h2>

        <form className="signup-form" onSubmit={handleSignup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;