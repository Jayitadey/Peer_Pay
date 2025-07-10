import { Link } from "react-router-dom";
import React from "react";
import "./Landing.css";
function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="brand-name">Peer Pay</h1>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <Link to="/Login">
          <a href="#">Login</a>
          </Link>
        
        </nav>
      </header>
      <main className="landing-main">
        <h2 className="headline">Your Personal Banking Simulator</h2>
        <p className="subtext">
         .Seamless Payments Between Peers.
        </p>
     <Link to="/Login">
  <button className="cta-button">Get Started</button>
</Link>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 Peer Pay. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default LandingPage;