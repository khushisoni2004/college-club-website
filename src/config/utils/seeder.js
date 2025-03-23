const mongoose = require('mongoose');
require('dotenv').config();
const Faculty = require('../models/Faculty');
const Event = require('../models/Event');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample data
const facultyData = [
  {
    name: 'Mrs. Megha Kuliha',
    position: 'Faculty In-charge',
    phone: '9977933519',
    image: 'f2.jpg.jpeg'
  },
  {
    name: 'Mr. Lalit Purohit',
    position: 'Faculty In-charge',
    phone: '9425032932',
    image: 'f1.jpg.jpeg'
  }
];

const eventData = [
  {
    title: 'HackIndore',
    description: 'A 24 hours hackathon open to all the colleges',
    date: new Date('2025-05-15'),
    category: 'Hackathon',
    location: 'SGSITS, Indore',
    image: 'hackathon.jpg'
  },
  {
    title: '#Bingola Coding Game',
    description: 'Coding contest for Aayam fest',
    date: new Date('2025-04-10'),
    category: 'Coding Contest',
    location: 'Online',
    image: 'coding.jpg'
  }
];

// Import data function
const importData = async () => {
  try {
    // Clear existing data
    await Faculty.deleteMany();
    await Event.deleteMany();
    
    // Import new data
    await Faculty.insertMany(facultyData);
    await Event.insertMany(eventData);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data function
const deleteData = async () => {
  try {
    await Faculty.deleteMany();
    await Event.deleteMany();
    
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line args to import or delete
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}