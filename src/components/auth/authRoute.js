import express from "express";

import { register, login } from "./authController.js";
import { isEmail } from "../commons/validate.js";
const router = express.Router();

router.post("/register", isEmail, register);
router.post("/login", isEmail, login);
export default router;
