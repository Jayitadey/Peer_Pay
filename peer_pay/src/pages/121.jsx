/*
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Transfer() {
  const location = useLocation();
  const rawScannedData = location.state?.scannedEmail || "";
  const voiceEmail = location.state?.voiceEmail || "";
  const voiceAmount = location.state?.voiceAmount || "";

  let parsedEmail = "";
  try {
    const parsedData = JSON.parse(rawScannedData);
    parsedEmail = parsedData.email || "";
  } catch (error) {
    console.error("Invalid QR data format:", error);
  }

  const [recipientEmail, setRecipientEmail] = useState(parsedEmail || voiceEmail || "");
  const [amount, setAmount] = useState(voiceAmount || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRecipientEmail(parsedEmail || voiceEmail || "");
    setAmount(voiceAmount || "");
  }, [parsedEmail, voiceEmail, voiceAmount]);

  // ... [rest of your code remains unchanged] ...

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://peer-pay-1.onrender.com/api/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientEmail, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Transfer successful");
        setRecipientEmail("");
        setAmount("");
      } else {
        setError(data.msg || "❌ Transfer failed");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      setError("❌ Network error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 text-center">Send Money</h2>

        {message && <p className="text-green-600 font-medium text-center">{message}</p>}
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-blue-700">
              Recipient Email
            </label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              placeholder="Enter recipient's email"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-blue-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1}
              placeholder="Enter amount"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
*/
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./loading";

function Transfer() {
  const location = useLocation();
  const rawScannedData = location.state?.scannedEmail || "";
  const voiceEmail = location.state?.recipientEmail || "";
  const voiceAmount = location.state?.voiceAmount || "";
  const commandEmail = location.state?.recipientEmail || "";
  const commandAmount = location.state?.amount || "";
  const [loading,setloading]=useState(false);
  let parsedEmail = "";
  try {
    const parsedData = JSON.parse(rawScannedData);
    parsedEmail = parsedData.email || "";
  } catch (error) {
    console.error("Invalid QR data format:", error);
  }

  const [recipientEmail, setRecipientEmail] = useState(
    parsedEmail || voiceEmail || commandEmail || ""
  );
  const [amount, setAmount] = useState(
    voiceAmount || commandAmount || ""
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setRecipientEmail(parsedEmail || voiceEmail || commandEmail || "");
    setAmount(voiceAmount || commandAmount || "");
  }, [parsedEmail, voiceEmail, voiceAmount, commandEmail, commandAmount]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setloading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://peer-pay-1.onrender.com/api/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientEmail, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Transfer successful");
        setRecipientEmail("");
        setAmount("");
      } else {
        setError(data.msg || "❌ Transfer failed");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      setError("❌ Network error");
    }finally{
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 text-center">Send Money</h2>

        {message && <p className="text-green-600 font-medium text-center">{message}</p>}
        {error && <p className="text-red-600 font-medium text-center">{error}</p>}

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-blue-700">
              Recipient Email
            </label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              placeholder="Enter recipient's email"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-blue-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={1}
              placeholder="Enter amount"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Transfer
          </button>
        </form>
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default Transfer;