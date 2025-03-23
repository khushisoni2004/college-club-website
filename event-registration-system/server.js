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
mongoose.connect('mongodb://127.0.0.1:27017/eventDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected to eventDB"))
  .catch(err => console.log("MongoDB Connection Failed:", err));

// Import Registration Model
const Registration = require('./models/Registration');

// Event Registration Route
app.post("/api/registrations", async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: "Registration Successful", data: newRegistration });
    } catch (error) {
        res.status(500).json({ message: "Error registering", error });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Event Registration Server running on port ${PORT}`));
