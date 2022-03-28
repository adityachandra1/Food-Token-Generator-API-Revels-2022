const mongoose = require('mongoose');

const foodTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FoodToken = mongoose.model('FoodToken', foodTokenSchema);
