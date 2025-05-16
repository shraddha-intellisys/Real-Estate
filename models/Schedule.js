const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    propertyId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, required: false },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
