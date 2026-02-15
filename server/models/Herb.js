const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  symptoms: {
    type: [String],
    default: []
  },
  usage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Herb', herbSchema);
