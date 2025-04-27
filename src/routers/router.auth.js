// routes/userRoutes.js
import express from "express";
import authController from "../controllers/auth.controller.js";

const routerAuth = express.Router();

// Route: GET /users
routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);

export default routerAuth;
