import React, { useState } from "react";
import Loading from "./loading";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false);
  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("https://peer-pay-1.onrender.com/api/account/withdraw", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        setError("");
        setAmount("");
      } else {
        setError(data.msg || "Withdrawal failed");
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong");
      setMessage("");
    }finally{
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">Withdraw Funds</h2>

        <form onSubmit={handleWithdraw} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-blue-900 font-medium mb-1">
              Amount to Withdraw
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (₹)"
              required
              className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Withdraw
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
        )}
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
}

export default Withdraw;