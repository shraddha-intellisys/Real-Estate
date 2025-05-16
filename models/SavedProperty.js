const mongoose = require('mongoose');

const SavedPropertySchema = new mongoose.Schema({
  userId: {
    type: String, // Use actual userId if you have authentication
    required: true
  },
  property: {
    id: Number,
    price: String,
    address: String,
    beds: Number,
    baths: Number,
    area: Number,
    image: String
  }
});

module.exports = mongoose.model('SavedProperty', SavedPropertySchema);
