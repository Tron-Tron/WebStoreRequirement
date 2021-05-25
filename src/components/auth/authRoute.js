import express from "express";

import { register, login } from "./authController.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import AuthValidate from "./authValidate.js";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(AuthValidate.registerAuth, "body"),
  register
);
router.post(
  "/login",
  validateMiddleware(AuthValidate.loginAuth, "body"),
  login
);
export default router;
