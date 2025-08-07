const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Transaction = require("../models/transaction");
const cors = require("cors");
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
    const userId = req.user.id;

    const transactions = await Transaction.find(
       
        { userId: userId }
      
    )
      .sort({ timestamp: -1 })
      .populate("userId", "username email") // sender
      .populate("recipientId", "username email") // receiver or sender (depending on context)
      .exec();
      
    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch transactions" });
  }
});

router.post("/transfer", verifyToken, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientEmail, amount } = req.body;

    // Basic validations
    if (!recipientEmail || !amount || amount <= 0) {
      return res.status(400).json({ msg: "Recipient email and valid amount are required" });
    }

    const sender = await User.findById(senderId);
    if (!sender) return res.status(404).json({ msg: "Sender not found" });

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) return res.status(404).json({ msg: "Recipient not found" });

    if (recipient._id.equals(sender._id)) {
      return res.status(400).json({ msg: "You cannot transfer money to yourself" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Perform balance update
    sender.balance -= amount;
    recipient.balance =Number(recipient.balance)+Number(amount);

    await sender.save();
    await recipient.save();
      await Transaction.create([
  {
    userId: sender._id,
    recipientId: recipient._id,
    type: "transfer",
    amount,
  },
  {
    userId: recipient._id,
    recipientId: sender._id, // You can still store the sender info
    type: "received",
    amount,
  }
    
]);
    // Log transaction (sender side)
    res.status(200).json({ msg: "Transfer successful" });
  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
})

router.post("/withdraw", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    // Basic validations
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ msg: "Invalid withdrawal amount" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Deduct amount
    user.balance -= Number(amount);
    await user.save();

    // Save transaction
    await Transaction.create({
      userId: user._id,
      type: "withdraw",
      amount,
    });

    res.status(200).json({ msg: `Successfully withdrew ₹${amount}` });
  } catch (err) {
    console.error("❌ Withdrawal error:", err);
    res.status(500).json({ msg: "Withdrawal failed" });
  }

});

router.get("/user-email", async (req, res) => {
 try {
    const users = await User.find({}, "username email");
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// routes/geminiNLP.js
function preprocess(text) {
  return text
    .replace(/rs|rupees|rupay|rupya/gi, "") // Remove currency words
    .replace(/ to /gi, " to ")              // Normalize spacing
    .trim();
}

const { GoogleGenerativeAI } = require("@google/generative-ai");

const stringSimilarity = require("string-similarity");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/gemini-nlp", async (req, res) => {
  const { spokenText } = req.body;
  const cleanedText = preprocess(spokenText);


  try {
    const users = await User.find({}, "username email");
    const userMap = users.map(u => `${u.username}: ${u.email}`).join("\n");

   const prompt = `
You are an intelligent assistant that extracts "intent", "amount", and "username" from voice command.

1. Accept commands with minor mistakes, like "deba deepa" → "Devadeep".
2. Match names even if slightly mispronounced or wrongly spelled.
3. Extract numbers as amounts.
4. Known users:
${userMap}

Here are some example inputs and outputs:

Command: "send 500 to devadeep"
→ { "intent": "send_money", "amount": "500", "username": "Devadeepa" }

Command: "transfer rupees 1000 to arjunsingh"
→ { "intent": "send_money", "amount": "1000", "username": "Bidya" }

Command: "please give 200 to rahul"
→ { "intent": "send_money", "amount": "200", "username": "Ankhi" }


Command: "please give 200 to rahul"
→ { "intent": "send_money", "amount": "200", "username": "Prasun" }


Command: "please give 200 to rahul"
→ { "intent": "send_money", "amount": "200", "username": "Jayita" }

Command: "show my balance"
→ { "intent": "check_balance" }

Now process this:
Command: "${cleanedText}"

Respond only in valid JSON as shown above.
If intent is unclear, respond with:
{ "intent": "unknown" }
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();

    console.log("🔥 Gemini Raw Response:\n", response); // 🛠️ Show raw Gemini reply

    let parsed;
    try {
      const jsonMatch = response.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("No JSON in Gemini output");
      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("❌ Gemini parsing error:", err.message);
      return res.status(500).json({ intent: "unknown" });
    }

    if (parsed.intent === "send_money") {
     const spokenUsername = parsed.username?.toLowerCase();
const allNames = users.map(u => u.username.toLowerCase());

const matches = stringSimilarity.findBestMatch(spokenUsername, allNames);
const bestMatchName = matches.bestMatch.target;

// Final match
const matchedUser = users.find(u => u.username.toLowerCase() === bestMatchName);

      if (matchedUser) {
        return res.json({
          intent: parsed.intent,
          amount: parsed.amount,
          email: matchedUser.email,
        });
      }
    }

    return res.json({ intent: "unknown" });
  } catch (error) {
    console.error("Gemini NLP error:", error.message);
    return res.status(500).json({ intent: "unknown" });
  }
});


module.exports = router;