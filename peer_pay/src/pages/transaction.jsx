import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowDownCircle, PiggyBank, ArrowUpCircle } from "lucide-react";
import Loading from "./loading";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading,setloading]=useState(false);
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setloading(true);
        const res = await fetch("https://peer-pay-1.onrender.com/api/account/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTransactions(data.transactions.reverse());
        } else {
          setError(data.msg || "Failed to load transactions");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }finally{
      setloading(false);
    }
    };

    fetchTransactions();
  }, [navigate]);

  const getIcon = (type) => {
    switch (type) {
      case "transfer":
        return <Send className="text-blue-500 w-5 h-5 mr-2" />;
      case "received":
        return <ArrowDownCircle className="text-green-500 w-5 h-5 mr-2" />;
      case "deposit":
        return <PiggyBank className="text-yellow-500 w-5 h-5 mr-2" />;
      case "withdraw":
        return <ArrowUpCircle className="text-red-500 w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 text-gray-800 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Transaction History</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent pr-2">
            {transactions
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((txn, index) => (
                <li
                  key={txn._id || index}
                  className="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow"
                >
                  <div className="flex items-center space-x-2">
                    {getIcon(txn.type)}
                    <span className="text-sm sm:text-base">
                      {txn.type === "transfer"
                        ? `Sent to ${txn.recipientId?.username || "Unknown"}`
                        : txn.type === "received"
                        ? `Received from ${txn.recipientId?.username || "Unknown"}`
                        : txn.type === "deposit"
                        ? "Deposit"
                        : txn.type === "withdraw"
                        ? "Withdraw"
                        : txn.type}
                    </span>
                  </div>

                  <span className="font-semibold text-blue-700">₹ {txn.amount}</span>

                  <span className="text-xs text-gray-500">
                    {txn.timestamp ? new Date(txn.timestamp).toLocaleString() : "N/A"}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
      {
        loading==true?<Loading></Loading>:null
      }
    </div>
  );
};

export default TransactionHistory;