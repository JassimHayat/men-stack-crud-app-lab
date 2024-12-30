const mongoose = require('mongoose');

// 1.) create the schema
const foodSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// 2.) register the model
const food = mongoose.model('food', foodSchema);

// 3.)  share it with the rest of the app
module.exports = food;