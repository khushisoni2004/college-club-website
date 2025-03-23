const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  phone: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', FacultySchema);