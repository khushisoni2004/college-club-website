const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber"); // Step 5: Database Model

// Newsletter Subscription Route
router.post("/subscribe", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubscriber = new Subscriber({ name, email });
        await newSubscriber.save();

        res.json({ message: "Subscription Successful", data: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
