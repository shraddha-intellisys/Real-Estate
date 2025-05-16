const express = require('express');
const router = express.Router();
const { createConsultation } = require('../controllers/consultationController');

// POST route for handling consultation form submissions
router.post('/consultation', createConsultation);

module.exports = router;
