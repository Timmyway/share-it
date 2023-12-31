const express = require('express');
const bodyParser = require('body-parser');
// Import and configure dotenv
require('dotenv').config();
const session = require('express-session');
const ejs = require('ejs');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// Initialize session middleware
app.use(session({
    secret: process.env.APP_KEY, // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

const router = require('./routes');
app.use('/', router);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
