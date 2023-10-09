const Sequelize = require('sequelize');

// Initialize Sequelize with your database configuration
const databaseConfig = {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE, // Path to the SQLite database file
    logging: false
};

const sequelize = new Sequelize(databaseConfig);

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Define the Upload model
const UploadModel = require('../models/upload');
const Upload = sequelize.define('Upload', UploadModel);

// // Synchronize the database and export sequelize and Upload
// sequelize.sync({force: true})
//     .then(() => {
//         console.log('Table created successfully');
//     })
//     .catch((error) => {
//         console.error('Unable to create table:', error);
//     });

module.exports = { sequelize, Upload };