import express from "express";

import { register, login } from "./authController.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import authValidate from "./authValidate.js";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(authValidate.registerAuth, "body"),
  register
);
router.post(
  "/login",
  validateMiddleware(authValidate.loginAuth, "body"),
  login
);
export default router;
