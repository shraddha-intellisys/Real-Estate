const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');  // Make sure to import the Schedule model
const scheduleController = require('../controllers/scheduleController');

// POST route for scheduling a visit
router.post('/scheduleVisit', async (req, res) => {
  try {
    const { propertyId, name, email, phone, date, time, message } = req.body;

    if (!propertyId || !name || !email || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newSchedule = new Schedule({ propertyId, name, email, phone, date, time, message });
    await newSchedule.save();

    return res.status(200).json({ success: true, message: 'Visit scheduled successfully.' });
  } catch (error) {
    console.error('Error during scheduling:', error);
    return res.status(500).json({ success: false, message: 'Failed to schedule visit.' });
  }
});

module.exports = router;
