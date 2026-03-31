require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { authMiddleware } = require("./middleware/auth");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ==================== AUTH ROUTES ====================

// Signup
app.post("/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Get current user (protected)
app.get("/auth/user", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// ==================== DATA API ROUTES (Protected) ====================

// Holdings
app.get("/allHoldings", authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// Positions
app.get("/allPositions", authMiddleware, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Orders - Get all
app.get("/allOrders", authMiddleware, async (req, res) => {
  let allOrders = await OrdersModel.find({}).sort({ date: -1 });
  res.json(allOrders);
});

// Orders - Create new
app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Failed to place order." });
  }
});

// Orders - Delete
app.delete("/deleteOrder/:id", authMiddleware, async (req, res) => {
  try {
    const deletedOrder = await OrdersModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json({ message: "Order cancelled successfully!" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to cancel order." });
  }
});



// ==================== SERVER START ====================

app.listen(PORT, async () => {
  console.log("App started on port " + PORT);
  try {
    await mongoose.connect(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("✅ DB connected successfully!");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    console.log("⚠️  Server running without DB. Auth & data routes will fail.");
  }
});
