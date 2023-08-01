const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');

const app = express();
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {        
        cb(null, true);
    }
});

// Serve the index.html page for image uploads
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the image upload
app.post('/upload', upload.single('image'), (req, res) => {    
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    // Extract the file extension from the original filename
    const fileExtension = path.extname(req.file.originalname);
    console.log('Uploaded file extension:', fileExtension);

    // You can use the fileExtension to rename the uploaded file or perform other operations
    // For example, to rename the file with a unique name and original extension:
    const uniqueFilename = `${Date.now()}${fileExtension}`;
    const newFilePath = path.join('uploads/', uniqueFilename);
    fs.renameSync(req.file.path, newFilePath);

    res.redirect('/');  
});

const PORT = 3000; // Change this port as needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
