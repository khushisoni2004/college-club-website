require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/newsletterDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected to newsletterDB"))
  .catch(err => console.log("MongoDB Connection Failed:", err));

// Import Subscriber Model
const Subscriber = require('./models/subscriber');

// Newsletter Subscription Route
app.post("/api/subscribe", async (req, res) => {
    try {
        const newSubscriber = new Subscriber(req.body);
        await newSubscriber.save();
        res.status(201).json({ message: "Subscription Successful", data: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: "Subscription Failed", error });
    }
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Newsletter Server running on port ${PORT}`));
