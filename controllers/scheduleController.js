const Schedule = require('../models/Schedule');

exports.scheduleVisit = async (req, res) => {
    const { propertyId, name, email, phone, date, time, message } = req.body;

    // Check if required fields are missing
    if (!propertyId || !name || !email || !phone || !date || !time) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        // Log incoming data to verify if it's being received properly
        console.log("Incoming data:", req.body);

        // Create new schedule entry
        const newSchedule = new Schedule({
            propertyId,
            name,
            email,
            phone,
            date,
            time,
            message,
        });

        // Save to MongoDB
        await newSchedule.save();

        // Log successful save
        console.log("New schedule entry saved successfully");

        return res.status(200).json({ success: true, message: 'Visit scheduled successfully.' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during schedule:', error);
        
        return res.status(500).json({ success: false, message: 'Failed to schedule visit.' });
    }
};