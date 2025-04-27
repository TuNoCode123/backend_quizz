// routes/userRoutes.js
import express from "express";
import questionController from "../controllers/question.controller.js";

const routerQuestion = express.Router();

// Route: GET /users
routerQuestion.post("/questions", questionController.creatQuestion);
routerQuestion.put("/questions", questionController.updateQuestion);
routerQuestion.delete("/questions/:id", questionController.deleteQuestion);

export default routerQuestion;
