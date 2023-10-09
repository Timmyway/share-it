const express = require('express');
const router = express.Router();
const path = require('path');
const uploadController = require('../controllers/uploadController');

const multer = require('multer');

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage })

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/upload', uploadController.renderUpload);

// Handle POST request for multiple image uploads
// router.post('/upload', upload.array('images', 10), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         res.status(400).send('No files uploaded.');
//         return;
//     }
//     // Successfully uploaded files
//     const uploadedFiles = req.files.map(file => file.filename);
//     res.redirect('upload');
// });
router.post('/upload', upload.array('images', 10), uploadController.uploadFiles);

module.exports = router;