const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  category: {
      type: String
  }, 
  tokensIssued: {
      type : Number
  },
  tokensRedeemed: {
      type: Number
  }
});

module.exports = Statistics = mongoose.model('Statistics', statisticsSchema);