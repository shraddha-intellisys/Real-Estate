const ContactForm = require('../models/contactForm');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newFormData = new ContactForm({
      name,
      email,
      phone,
      message
    });

    await newFormData.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

module.exports = { submitContactForm };
