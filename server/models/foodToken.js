const mongoose = require('mongoose');

const foodTokenSchema = new mongoose.Schema({
  qrLink: {
    type: String,
    required: true,
    unique: true,
  },
  issuedTo: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  FoodToken: mongoose.model('FoodToken', foodTokenSchema),
};
