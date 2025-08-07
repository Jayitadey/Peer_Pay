/*
import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QRScanner.css";

function QRPay({ onScanComplete }) {
  const [scanResult, setScanResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [scanner, setScanner] = useState(null);

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
          console.log(decodedText);
          setScanResult(decodedText);
          onScanComplete?.(decodedText);
          scannerInstance.stop(); // Stop after first scan
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
      <h2 className="qrpay-title">Scan QR Code</h2>
      <div id="qr-reader" />
      {scanResult && (
        <div className="success-text">Scanned: {scanResult}</div>
      )}
      {cameras.length > 1 && (
        <button className="toggle-camera-button" onClick={toggleCamera}>
          Switch Camera
        </button>
      )}
    </div>
  );
}

export default QRPay;
*/
import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom"; // 👈 Add this
import "./QRScanner.css";

function QRPay() {
  const [scanResult, setScanResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [scanner, setScanner] = useState(null);
  const navigate = useNavigate(); // 👈 Hook to navigate
  
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
        navigate("/121", { state: { scannedEmail: decodedText } }); // 👈 Pass scanned data
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
      <h2 className="qrpay-title">Scan QR Code</h2>
      <div id="qr-reader" />
      {scanResult && (
        <div className="success-text">Scanned: {scanResult}</div>
      )}
      {cameras.length > 1 && (
        <button className="toggle-camera-button" onClick={toggleCamera}>
          Switch Camera
        </button>
      )}
    </div>
  );
}

export default QRPay;
