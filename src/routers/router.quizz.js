// routes/userRoutes.js
import express from "express";
import authController from "../controllers/auth.controller.js";
import quizzController from "../controllers/quizz.controller.js";

const routerQuizz = express.Router();

// Route: GET /users
routerQuizz.get("/quizzs", quizzController.getAllQuizzs);
routerQuizz.post("/quizzs", quizzController.createQuizz);
routerQuizz.delete("/quizzs", quizzController.deleteQuizz);
routerQuizz.put("/quizzs", quizzController.updateQuizz);
routerQuizz.get("/quizzs/:id", quizzController.getDetailQuizz);
routerQuizz.post("/submit-quizz", quizzController.submitQuizz);

export default routerQuizz;
