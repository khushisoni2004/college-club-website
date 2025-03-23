require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fullDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Two Databases)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    }
};
connectDB();

// Import Models
const Registration = require('./models/Registration');
const Subscriber = require('./models/subscriber');

// 📌 Event Registration API
app.post("/api/registrations", async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: "Registration Successful", data: newRegistration });
    } catch (error) {
        res.status(500).json({ message: "Error registering", error });
    }
});

// 📌 Newsletter Subscription API
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
const PORT = process.env.PORT || 5000;
app.get("/api/subscribe", (req, res) => {
    res.send("This route only supports POST requests. Use Postman or a form.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
