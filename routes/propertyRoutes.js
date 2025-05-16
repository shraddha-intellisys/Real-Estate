const express = require('express');
const router = express.Router();
const { createProperty, getAllProperties } = require('../controllers/propertyController');

router.post('/', createProperty);
router.get('/', getAllProperties);

router.put('/:id', async (req, res) => {
    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // returns updated document
      );
      if (!updatedProperty) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      res.status(200).json({ success: true, property: updatedProperty });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

module.exports = router;
