const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Card', cardSchema); // ✅ FIXED export & name
