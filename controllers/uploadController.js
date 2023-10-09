const { Upload } = require('../config/database');

exports.uploadFiles = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    try {
        const uploadedFiles = req.files;

        // Save file infos to the "uploads" table
        for (const file of uploadedFiles) {
            console.log('==================> ', file.originalname)
            await Upload.create({
                name: file.originalname,
                filePath: file.path
            });
        }

        const message = 'Upload+successfully';
        req.session.files = uploadedFiles.map(file => file.filename).join(',');

        res.redirect('upload?message=' + message);
    } catch (error) {
        console.error('Error uploading files: ', error);
        res.status(500).send('Error uploading files');
    }
};

// Render the upload view with optional message and files data
exports.renderUpload = async (req, res) => {
    try {
        const message = req.query.message || '';
        const files = req.session.files ? req.session.files.split(',') : [];

        // Query the "uploads" table to retrieve uploaded file information        
        const uploads = await Upload.findAll();        
        res.render('upload', { message, files, uploads });
    } catch (error) {
        console.error('Error retrieving uploads: ', error);
        res.status(500).send('Error retrieving uploads.');
    }
};