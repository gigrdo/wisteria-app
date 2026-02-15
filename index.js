const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: '🌿 Wisteria API is alive' });
});

// Route to API
const herbsRoute = require('./server/routes/herbs');
app.use('/api/herbs', herbsRoute);

const systemsRoute = require('./server/routes/systems'); //import systems route 
app.use('/api/systems', systemsRoute);                   

app.get('/status', (req, res) => {
  res.json({ ok: true, app: 'wisteria', time: new Date().toISOString() })
})


//Fallback to frontend
const indexPath = path.resolve(__dirname, 'client', 'index.html');
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
