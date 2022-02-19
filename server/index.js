const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join('.env') });
const router = require('./routes/index.js');
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Food Token Generator',
    success: true,
  });
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
