const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  participants: [{ type: String }],
});

module.exports = mongoose.model("Event", eventSchema);
