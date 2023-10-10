const FileHelper = require('../helpers/FileHelper');
const { Upload } = require('../models');
const fs = require('fs');

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

exports.uploadFiles = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).send('No files uploaded.');
        return;
    }

    try {
        const uploadedFiles = req.files;        

        // Save file infos to the "uploads" table
        const assetFolder = FileHelper.assetUrl(process.env.UPLOAD_FOLDER || 'uploads/')
        for (const file of uploadedFiles) {
            const uniqueFilename = file.filename;
            await Upload.create({
                name: uniqueFilename,
                fileUrl: `${process.env.APP_URL}${assetFolder}${uniqueFilename}`,
                filePath: file.path
            });
        }

        const message = 'Upload+successfully';

        res.redirect('upload?message=' + message);
    } catch (error) {
        console.error('Error uploading files: ', error);
        res.status(500).send('Error uploading files');
    }
};

exports.deleteFile = async (req, res) => {
    const postData = req.body;
    try {        
        // Find the file record by ID
        const file = await Upload.findByPk(postData.uploadId);

        console.log('==============>', file)

        if (!file) {
            return res.status(404).send('File not found');
        }
        
        try {
            // Delete the file from the file system
            fs.unlinkSync(file.filePath);
            console.log('File deleted successfully');
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Handle the case where the file doesn't exist (not found)
                console.log('File not found, delete it anymore');
            } else {
                // Handle other errors
                throw error;
            }
        }
        
        // Delete the record from the database
        await file.destroy();

        // return true; // File and record deleted successfully
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Error deleting file');
    }
}