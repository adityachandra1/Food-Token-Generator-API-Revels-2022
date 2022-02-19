const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  tokensIssued: {
    type: Number,
    default: 0,
  },
});

const tokenSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = {
  Category: mongoose.model('category', categorySchema),
  Token: mongoose.model('Token', tokenSchema),
};
