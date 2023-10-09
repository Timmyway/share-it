const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
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

router.get('/upload', (req, res) => {
    const message = req.query.message || '';
    const files = req.query.files ? req.query.files.split(',') : [];
    res.render('upload', { message, files });
});

// Handle POST request for multiple image uploads
router.post('/upload', upload.array('images', 10), (req, res) => {    
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    // Successfully uploaded files
    const uploadedFiles = req.files.map(file => file.filename);

    res.redirect('/upload?message=Upload+successful&files=' + uploadedFiles.join(','));
});

module.exports = router;