import { Link } from "react-router-dom";
import React from "react";
import "./Landing.css";
function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="brand-name">MyBank Pro</h1>
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
        <h2 className="headline">Your Personal Offline Banking System</h2>
        <p className="subtext">
          Safe. Simple. Secure. Anytime, even without the internet.
        </p>

  <button className="cta-button">Get Started</button>

      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 MyBank Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default LandingPage;