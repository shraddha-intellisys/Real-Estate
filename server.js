const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const consultationRoutes = require('./routes/consultationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const savedPropertyRoutes = require('./routes/savedPropertyRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To allow cross-origin requests

// Routes
app.use('/api', consultationRoutes);
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', scheduleRoutes);
app.use('/api/properties', require('./routes/propertyRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
