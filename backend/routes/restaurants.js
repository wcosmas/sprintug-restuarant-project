const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const { name, cuisineType, location, imagePath } = req.body;
    const restaurant = await Restaurant.create({
      name,
      cuisineType,
      location,
      imagePath,
    });
    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
  try {
    const { name, cuisineType, location, imagePath } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        name,
        cuisineType,
        location,
        imagePath,
      },
      { new: true }
    );
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ message: 'Resturant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
