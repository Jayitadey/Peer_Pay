import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("balance");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get user info from localStorage (set after login)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username || "User");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Peer Pay</h1>
        <nav className="dashboard-nav">
          <Link to="/balance">
            <button onClick={() => setActiveTab("balance")}>View Balance</button>
          </Link>
          <Link to="/121">
            <button onClick={() => setActiveTab("transfer")}>One-to-One Transaction</button>
          </Link>
          <Link to="/transaction">
            <button onClick={() => setActiveTab("history")}>Transaction History</button>
          </Link>
          <Link to="/deposit">
            <button onClick={() => setActiveTab("deposit")}>Deposit Money</button>
          </Link>
          <Link to="/withdraw">
            <button onClick={() => setActiveTab("withdraw")}>Withdraw</button>
          </Link>
        </nav>
      </header>
      
   <div className="dashboard-user"><b>Welcome, {username}!</b></div> 
      <main className="dashboard-main">
        {activeTab === "balance" && (
          <section className="dashboard-section">
            {/* Your balance component will go here */}
          </section>
        )}

        {activeTab === "transfer" && (
          <section className="dashboard-section">
            <h2>Send Money</h2>
            <form className="transfer-form">
              <input type="text" placeholder="Recipient Username" />
              <input type="number" placeholder="Amount (₹)" />
              <button type="submit">Send</button>
            </form>
          </section>
        )}

        {activeTab === "history" && (
          <section className="dashboard-section">
            <h2>Transaction History</h2>
            <ul className="transaction-list">
              <li>Sent ₹500 to user123 on 1 Jul</li>
              <li>Received ₹200 from friend456 on 29 Jun</li>
              <li>Sent ₹1,000 to mom001 on 25 Jun</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;