const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Mongoose Schema
const SubscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

// API Route to Subscribe
app.post("/api/subscribe", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "⚠️ Name and Email are required!" });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "⚠️ Email already subscribed!" });
    }

    const newSubscriber = new Subscriber({ name, email });
    await newSubscriber.save();

    res.status(201).json({ message: "✅ Subscription Successful!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// API Route to Get All Subscribers
app.get("/api/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
