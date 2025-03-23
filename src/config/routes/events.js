const express = require('express');
const router = express.Router();
const Event = require('../models/Events');  // Corrected path


// ✅ Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: `Error fetching events: ${err.message}` });
  }
});

// ✅ Create a new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: `Error creating event: ${err.message}` });
  }
});

module.exports = router;
