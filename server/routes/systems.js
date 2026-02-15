const express = require('express');
const router = express.Router();
const System = require('../models/System');
console.log('🛠 systems route loaded');


// GET all systems
router.get('/', async (req, res) => {
  try {
    const systems = await System.find();
    res.json(systems);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching systems' });
  }
});


// POST to add a new system
router.post('/', async (req, res) => {
  try {
    const { name, symptoms } = req.body;

    const newSystem = new System({
      name,
      symptoms
    });

    await newSystem.save();
    res.status(201).json({ message: 'System created successfully 🌿', system: newSystem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating system' });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const system = await System.findById(req.params.id);
    if (!system) return res.status(404).json({ error: 'System not found' });
    res.json(system);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching system' });
  }
});


// // GET a single system by name
// router.get('/name/:name', async (req, res) => {
//   try {
//     const name = req.params.name.replace(/\s+/g, '').toLowerCase();
//     const systems = await System.find();

//     const system = systems.find(s =>
//       s.name.toLowerCase().replace(/\s+/g, '') === name
//     );

//     if (!system) {
//       return res.status(404).json({ error: 'System not found' });
//     }

//     res.json(system);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error fetching system by name' });
//   }
// });

module.exports = router;


