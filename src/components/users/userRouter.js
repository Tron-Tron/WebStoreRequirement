import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "./usersController.js";
import validateMiddleware from "./../commons/validateMiddleware.js";
import { validateUser } from "./userModel.js";
import authorize from "./../../middleware/authorize.js";
import upload from "../commons/upload.js";

const router = express.Router();
router.get("/all", jwtAuth, authorize("owner", "employee"), getAllUsers);
router.get("/:userId", jwtAuth, getUserById);
router.post(
  "/",
  jwtAuth,
  upload.single("avatar"),
  validateMiddleware(validateUser),
  createUser
);
router.patch(
  "/:userId",
  jwtAuth,
  validateMiddleware(validateUser),
  updateUserById
);
router.delete("/:userId", jwtAuth, deleteUserById);
export default router;
