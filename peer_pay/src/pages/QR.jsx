import React from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./QR.css";

function QR() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div style={{ color: "white", textAlign: "center" }}>No user data found.</div>;
  }

  const qrValue = JSON.stringify({
    email: user.email,
    userId: user._id,
    name: user.username,
  });

  return (
    <div className="qr-wrapper">
      <div className="qr-container">
        <h2>{user.username? `${user.username}'s QR Code` : "User's QR Code"}</h2>
        <QRCodeCanvas value={qrValue} size={256} fgColor="#4ade80" bgColor="#0f172a" />
      </div>
    </div>
  );
}

export default QR;