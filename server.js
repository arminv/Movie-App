const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

app.use(cors());

// Connect Database:
connectDB();

// Init middleware:
// Note: no need for body parser anymore!
app.use(express.json({ extended: false }));

// Do not want this on production:
// app.get('/', (req, res) => res.send('API Running...'));

// Define Routes:
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production:
if (process.env.NODE_ENV === 'production') {
  // Set static folder:
  app.use(express.static('client/build'));

  // Now we have to serve the static HTML file on any route other than the above routes:
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
