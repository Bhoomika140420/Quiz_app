const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionsControllers");

// POST /api/questions - Create a new question
router.post("/newQstn", questionController.createQuestion);

// PUT /api/questions/:id - Update an existing question
router.put("/:id", questionController.updateQuestion);

// DELETE /api/questions/:id - Delete a question
router.delete("/:id", questionController.deleteQuestion);

// GET /api/questions - Get all questions
router.get("/editQstn", questionController.getAllQuestions);

module.exports = router;
