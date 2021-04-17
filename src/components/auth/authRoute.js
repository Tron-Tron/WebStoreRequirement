import express from "express";

import { register, login } from "./authController.js";
import { isEmail, isPhone } from "../commons/validate.js";
const router = express.Router();

router.post("/register", isEmail, isPhone, register);
router.post("/login", isEmail, login);
export default router;
