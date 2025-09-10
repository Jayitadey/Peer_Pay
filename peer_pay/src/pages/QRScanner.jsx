import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./QRScanner.css";

function QRPay() {
  const [scanResult, setScanResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [scanner, setScanner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initScanner = async () => {
      const availableCameras = await Html5Qrcode.getCameras();
      setCameras(availableCameras);

      if (availableCameras.length > 0) {
        const newScanner = new Html5Qrcode("qr-reader");
        setScanner(newScanner);
        startScanner(newScanner, availableCameras[0].id);
      }
    };

    initScanner();

    return () => {
      if (scanner) {
        scanner.stop().then(() => scanner.clear());
      }
    };
  }, []);

  const startScanner = (scannerInstance, cameraId) => {
    scannerInstance.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        rememberLastUsedCamera: true,
      },
      (decodedText) => {
        console.log("Scanned:", decodedText);
        setScanResult(decodedText);
        scannerInstance.stop(); // Stop scanner
        navigate("/121", { state: { scannedEmail: decodedText } }); // Pass scanned data
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );
  };

  const toggleCamera = () => {
    if (!scanner || cameras.length <= 1) return;

    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    scanner.stop().then(() => {
      startScanner(scanner, cameras[nextIndex].id);
      setCurrentCameraIndex(nextIndex);
    });
  };

  return (
    <div className="qrpay-container">
      {/* ✅ QR Scanner Logo + Heading */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-10 h-10 text-blue-700"
          fill="none"
        >
          {/* Corner brackets */}
          <path
            d="M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* QR modules */}
          <rect x="8" y="8" width="3" height="3" fill="currentColor" />
          <rect x="13" y="8" width="3" height="3" fill="currentColor" />
          <rect x="8" y="13" width="3" height="3" fill="currentColor" />
          <rect x="13" y="13" width="3" height="3" fill="currentColor" />
          {/* Scan line */}
          <path
            d="M2 12h20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="qrpay-title m-0">Scan QR Code</h2>
      </div>

      <div id="qr-reader" />
      {scanResult && <div className="success-text">Scanned: {scanResult}</div>}
      {cameras.length > 1 && (
        <button className="toggle-camera-button" onClick={toggleCamera}>
          Switch Camera
        </button>
      )}
    </div>
  );
}

export default QRPay;