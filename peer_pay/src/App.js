/*
import React from "react";
import LandingPage from "./pages/Landing";

function App() {
  return <LandingPage />;
}

export default App;
  */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Deposit from "./pages/deposit";
import ViewBalance from "./pages/balance";
import TransactionHistory from "./pages/transaction";
import Transfer from "./pages/121";
import Withdraw from "./pages/withdraw";
import ForgotPassword from './pages/ForgotPassword';
import QR from "./pages/QR";
import QRScanner from "./pages/QRScanner"; // adjust path
import VoiceCommand from "./pages/VoiceCommand";
import Features from "./pages/features";
import About from "./pages/about";
import { AlarmClockCheckIcon, AreaChartIcon } from "lucide-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/balance" element={<ViewBalance />} />
        <Route path="/transaction" element={<TransactionHistory />} />
        <Route path="/121" element={<Transfer />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/QR" element={<QR />} />
        <Route path="/QRScanner" element={<QRScanner />} />
        <Route path="/VoiceCommand" element={<VoiceCommand />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;


