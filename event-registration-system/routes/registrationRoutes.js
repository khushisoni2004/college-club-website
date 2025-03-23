const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

// 📌 Register a User (POST Request)
router.post("/register", async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: "✅ Registration Successful!", data: newRegistration });
    } catch (error) {
        res.status(400).json({ message: "❌ Error registering user", error: error.message });
    }
});

module.exports = router;
