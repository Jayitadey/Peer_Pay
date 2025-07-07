const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Transaction = require("../models/transaction");

const router = express.Router();

// Auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ msg: "Invalid token" });
  }
};

// POST /api/account/deposit
router.post("/deposit", verifyToken, async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: "Invalid deposit amount" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId: user._id,
      type: "deposit",
      amount
    });

    await transaction.save();

    res.json({ msg: "Deposit successful", balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/account/transactions
router.get("/transactions", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch transactions" });
  }
});


router.get("/balance", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch balance" });
  }
});


router.get("/history", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json({ transactions }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch transactions" });
  }
});


module.exports = router;