const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  imagePath: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
