const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku:      { type: String, required: true, unique: true, trim: true },
  name:     { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  created:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);