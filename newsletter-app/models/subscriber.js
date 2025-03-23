const mongoose = require("mongoose");

// Subscriber Schema
const SubscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Export Model
module.exports = mongoose.model("Subscriber", SubscriberSchema);
