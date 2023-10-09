const path = require('path');
const fs = require('fs');

exports.uploadFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }
    
    // Successfully uploaded files
    const uploadedFiles = req.files.map(file => file.filename);

    req.session.message = 'Upload successfully';
    req.session.files = uploadedFiles.join(',');

    res.redirect('upload');
};

// Render the upload view with optional message and files data
exports.renderUpload = (req, res) => {
    const message = req.session.message || '';
    const files = req.session.files ? req.session.files.split(',') : [];
    res.render('upload', { message, files });
};