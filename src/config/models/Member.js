const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,
  batch: String,
  image: String,
  email: String,
  social: {
    linkedin: String,
    github: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', MemberSchema);