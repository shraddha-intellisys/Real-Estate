const Consultation = require('../models/Consultation');

const createConsultation = async (req, res) => {
  const { name, email, phone, propertyType, message } = req.body;

  try {
    const consultation = new Consultation({
      name,
      email,
      phone,
      propertyType,
      message,
    });

    await consultation.save();
    res.status(201).json({ message: 'Consultation request submitted successfully' });
  } catch (error) {
    console.error('Error saving consultation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createConsultation };
