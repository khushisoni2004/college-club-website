
const mongoose = require('mongoose');
const { eventSchema, userSchema, registrationSchema } = require('./schema');

mongoose.connect('mongodb://localhost:27017/include_events', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = { Event, User, Registration };