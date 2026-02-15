const express = require('express');
const router = express.Router();
const Herb = require('../models/Herb');

// GET all herbs
router.get('/', async (req, res) => {
  try {
    const herbs = await Herb.find();
    res.json(herbs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching herbs' });
  }
});

// POST to create new herb
router.post('/', async (req, res) => {
  try {
    const { name, symptoms, usage } = req.body;

    const newHerb = new Herb({
      name,
      symptoms,
      usage
    });

    await newHerb.save();
    res.status(201).json({ message: 'Herb created successfully 🌿', herb: newHerb });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating herb' });
  }
});


module.exports = router;

