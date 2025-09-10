import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(parsedUser.username || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Login");
  };

  const cardBaseClasses =
    "dashboard-card bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center justify-center text-center space-y-3";

  const iconClasses = "text-5xl mb-2"; // larger icon + spacing

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <header className="mb-8 text-center flex flex-col items-center space-y-2">
        <img
          src={Logo}
          alt="PeerPay Logo"
          className="h-14 w-auto"
        />
        <p className="text-blue-700 text-lg">Welcome, {username}!</p>
      </header>

    
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Link to="/balance" className={cardBaseClasses}>
          <i className={`fas fa-wallet text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">View Balance</span>
        </Link>

        <Link to="/121" className={cardBaseClasses}>
          <i className={`fas fa-paper-plane text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">One-to-One Transaction</span>
        </Link>

        <Link to="/deposit" className={cardBaseClasses}>
          <i className={`fas fa-arrow-circle-down text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">Deposit Money</span>
        </Link>

        <Link to="/transaction" className={cardBaseClasses}>
          <i className={`fas fa-history text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">Transaction History</span>
        </Link>

        <Link to="/withdraw" className={cardBaseClasses}>
          <i className={`fas fa-arrow-circle-up text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">Withdraw</span>
        </Link>

        <Link to="/QR" state={{ user }} className={cardBaseClasses}>
          <i className={`fas fa-qrcode text-blue-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-blue-800">QR</span>
        </Link>
<Link to="/QRScanner" state={{ user }} className={cardBaseClasses}>
  {/* Simple Scan Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-10 h-10 text-blue-700 ${iconClasses}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    {/* Corner brackets (scanner frame) */}
    <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
    
    {/* Scanning line */}
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>

  <span className="text-lg font-semibold text-blue-800">QR Scanner</span>
</Link>


       <Link to="/VoiceCommand" className={cardBaseClasses}>
        <i className={`fas fa-microphone text-blue-700 ${iconClasses}`}></i>
        <span className="text-lg font-semibold text-blue-800">Voice-Based Payments</span>
        </Link>
        
        
        <button
          onClick={handleLogout}
          className={`${cardBaseClasses} bg-red-100 hover:bg-red-200`}
        >
          <i className={`fas fa-sign-out-alt text-red-700 ${iconClasses}`}></i>
          <span className="text-lg font-semibold text-red-700">Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Dashboard;