const express = require('express');
const multer = require('multer');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

// Set EJS as the view engine
app.set('view engine', 'ejs');

const router = require('./routes');
app.use('/', router);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
