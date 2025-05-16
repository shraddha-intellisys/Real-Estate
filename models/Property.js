const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
  address: { type: String, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  area: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
