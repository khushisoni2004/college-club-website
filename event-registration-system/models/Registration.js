const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    rollNumber: String,
    department: String,
    year: String,
    question: String
});

module.exports = mongoose.model("Registration", registrationSchema);
