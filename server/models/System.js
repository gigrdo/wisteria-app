const mongoose = require('mongoose');

//this defines a system with name and list of symptoms 
const systemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  symptoms: {
    type: [String], // list of symptoms as strings
    default: []
  }
});

module.exports = mongoose.model('System', systemSchema);
