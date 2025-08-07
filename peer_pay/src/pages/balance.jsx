import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

const ViewBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading,setloading]=useState(false); 

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setloading(true);
        const res = await fetch("https://peer-pay-1.onrender.com/api/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setBalance(data.balance);
        } else {
          setError(data.msg || "Failed to fetch balance");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }finally{
      setloading(false);
    }
    };

    fetchBalance();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center space-y-6">
        <i className="fas fa-wallet text-blue-700 text-5xl mb-2"></i>
        <h2 className="text-2xl font-bold text-blue-800">Your Account Balance</h2>

        {balance !== null ? (
          <p className="text-4xl font-bold text-green-600 animate-pulse">
            ₹ {balance.toFixed(2)}
          </p>
        ) : error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : (
          <p className="text-blue-600 font-medium animate-pulse">Loading...</p>
        )}
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
};

export default ViewBalance;