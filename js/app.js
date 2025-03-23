const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize express
const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/newsletters', require('./routes/api/newsletters'));

// Simple test route
app.get('/', (req, res) => res.send('API Running'));

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));