require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./src/config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Already handled by bodyParser.json(), but fine

// API Routes (Fixed Path)
app.use('/api/events', require('./src/config/routes/events'));

// app.use('/api/faculty', require('./src/config/routes/faculty'));
// app.use('/api/members', require('./src/config/routes/members'));
// app.use('/api/newsletter', require('./src/config/routes/newsletter'));

// Root Route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
