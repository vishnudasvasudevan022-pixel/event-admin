const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const eventRoutes = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));