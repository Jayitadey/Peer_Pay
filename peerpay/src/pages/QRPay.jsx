import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

function QRScannerTest() {
  const [data, setData] = useState("No result");

  const handleScan = (result) => {
    if (result) {
      setData(result.text || result);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>QR Code Scanner</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <div style={{ marginTop: 20 }}>
        <h2>Scanned Result:</h2>
        <textarea
          value={data}
          readOnly
          style={{ width: "80%", height: 100, fontSize: 16 }}
        />
      </div>
    </div>
  );
}

export default QRScannerTest;