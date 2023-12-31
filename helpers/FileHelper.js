const sanitizeFilename = require('sanitize-filename');
const path = require('path');

class FileHelper
{
    static sanitizeAndGenerateFilename(originalFilename, sep = '_') {
        // Remove unsafe characters and normalize the filename
        const sanitizedFilename = sanitizeFilename(originalFilename);
      
        // Extract the file extension from the original filename
        const fileExtension = path.extname(originalFilename);
        const basename = path.basename(sanitizedFilename, fileExtension);
      
        // Generate a unique filename with the sanitized name and original file extension
        const uniqueFilename = `${basename}${sep}${Date.now()}${fileExtension}`;
      
        return uniqueFilename;
    }

    static assetUrl(originalPath)
    {
        const trimmedPath = originalPath.replace(/^public\//, '');
        return trimmedPath;
    }
}

module.exports = FileHelper;