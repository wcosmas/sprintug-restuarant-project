require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const restaurantsRouter = require('./routes/restaurants');
const uploadsRouter = require('./routes/uploads');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/uploads', uploadsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
