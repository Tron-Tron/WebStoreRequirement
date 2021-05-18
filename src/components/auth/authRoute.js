import express from "express";

import { register, login } from "./authController.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import { validateAuth } from "./authModel.js";
const router = express.Router();

router.post("/register", validateMiddleware(validateAuth), register);
router.post("/login", login);
export default router;
