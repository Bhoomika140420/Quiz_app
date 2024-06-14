'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Adjust the path to your dbConfig

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER, // Change to INTEGER for auto-increment
    autoIncrement: true, // Enable auto-increment
    primaryKey: true // Define as the primary key
  },
  questionText: {
    type: DataTypes.STRING    
    // Remove allowNull: false to allow null values
  },
  options: {
    type: DataTypes.JSON, // Store options as a JSON object
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Options must be an array');
        }
        value.forEach(option => {
          if (typeof option.optionText !== 'string' || typeof option.isCorrect !== 'boolean') {
            throw new Error('Each option must have a string "optionText" and a boolean "isCorrect"');
          }
        });
      }
    }
    // Remove allowNull: false to allow null values
  }
}, {
  tableName: 'questions', // Specify the table name
  timestamps: true // Automatically add createdAt and updatedAt timestamps
});

module.exports = Question;
