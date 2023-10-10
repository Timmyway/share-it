const express = require('express');
const router = express.Router();
const path = require('path');
const uploadController = require('../controllers/uploadController');
const FileHelper = require('../helpers/FileHelper');

const multer = require('multer');

// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: process.env.UPLOAD_FOLDER || 'uploads/',
    filename: (req, file, cb) => {        
        const uniqueFilename = FileHelper.sanitizeAndGenerateFilename(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage })

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/upload', uploadController.renderUpload);
router.post('/upload', upload.array('images', 10), uploadController.uploadFiles);
router.post('/upload/delete', uploadController.deleteFile);

module.exports = router;