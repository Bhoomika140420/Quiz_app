const Question = require("../models/questions"); // Adjust the path as necessary
require("dotenv").config();

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { questionText, options } = req.body;
    console.log(req.body);
    // Validate input
    if (!questionText || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ error: "Invalid question or options" });
    }

    // Validate each option
    for (const option of options) {
      if (
        typeof option.optionText !== "string" ||
        typeof option.isCorrect !== "boolean"
      ) {
        return res.status(400).json({
          error: "Each option must have a valid text and isCorrect value",
        });
      }
    }

    // Create new question
    const question = await Question.create({ questionText, options });
    console.log(question);
    // Send response
    res
      .status(201)
      .json({ message: "Question created successfully", question });
  } catch (error) {
    console.error("Failed to create question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing question
exports.updateQuestion = async (req, res) => {
  try {
    const { questionText, options } = req.body;

    // Validate input
    if (!questionText || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ error: "Invalid question or options" });
    }

    // Validate each option
    for (const option of options) {
      if (
        typeof option.optionText !== "string" ||
        typeof option.isCorrect !== "boolean"
      ) {
        return res.status(400).json({
          error: "Each option must have a valid text and isCorrect value",
        });
      }
    }

    // Find and update question
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the question
    await question.update({ questionText, options });

    // Send response
    res
      .status(200)
      .json({ message: "Question updated successfully", question });
  } catch (error) {
    console.error("Failed to update question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all functions
exports.getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Question.findAll();

    // Send response with questions data
    res.status(200).json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    // Find and delete question
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Delete the question
    await question.destroy();

    // Send response
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Failed to delete question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
