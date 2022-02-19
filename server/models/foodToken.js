const mongoose = require('mongoose');

const foodTokenSchema = new mongoose.Schema({
  qrToken: {
    type: String,
    required: true,
    unique: true,
  },
  issuedTo: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = foodToken = mongoose.model('foodtoken', foodTokenSchema);
