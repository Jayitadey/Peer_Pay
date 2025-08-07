import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading"; 

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  const handleDeposit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      navigate("/login");
      return;
    }

    try {
      setloading(true);
      const res = await fetch("https://peer-pay-1.onrender.com/api/account/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Deposit successful! New balance: ₹${data.balance}`);
        setAmount("");
      } else {
        setMessage(`❌ ${data.msg || "Deposit failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }finally{
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <i className="fas fa-piggy-bank text-blue-700 text-5xl animate-bounce"></i>
        <h2 className="text-2xl font-bold text-blue-800">Deposit Funds</h2>

        <form onSubmit={handleDeposit} className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium transition duration-200"
          >
            Deposit
          </button>
        </form>

        {message && (
          <p
            className={`text-md font-semibold ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            } animate-fade-in`}
          >
            {message}
          </p>
        )}
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
};

export default Deposit;