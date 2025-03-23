const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['Hackathon', 'Coding Contest', 'Webinar', 'VR Meetup', 'Project', 'Blockchain'],
    required: true
  },
  image: String,
  location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);