const express = require('express');
const router = express.Router();
const SavedProperty = require('../models/SavedProperty');

// POST - Save new property
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const property = req.body;

    const existing = await SavedProperty.findOne({ userId, 'property.id': property.id });
    if (existing) {
      return res.status(400).json({ message: 'Property already saved' });
    }

    const saved = new SavedProperty({ userId, property });
    await saved.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Error saving property' });
  }
});

// GET - Fetch saved properties for user
router.get('/:userId', async (req, res) => {
  try {
    const properties = await SavedProperty.find({ userId: req.params.userId });
    const propertyList = properties.map(p => p.property);
    res.json(propertyList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching saved properties' });
  }
});

// DELETE - Remove saved property
router.delete('/:userId/:propertyId', async (req, res) => {
  try {
    await SavedProperty.deleteOne({
      userId: req.params.userId,
      'property.id': req.params.propertyId
    });
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing saved property' });
  }
});

module.exports = router;
