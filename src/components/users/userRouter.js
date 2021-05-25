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
// import { validateUser } from "./userModel.js";
import UserValidate from "./userValidate.js";
import authorize from "./../../middleware/authorize.js";
import upload from "../commons/upload.js";

const router = express.Router();
router.get("/all", jwtAuth, authorize("owner", "employee"), getAllUsers);
router.get(
  "/:userId",
  jwtAuth,
  validateMiddleware(UserValidate.paramUser, "params"),
  getUserById
);
router.post(
  "/",
  jwtAuth,
  upload.single("avatar"),
  validateMiddleware(UserValidate.postUser, "body"),
  createUser
);
router.patch(
  "/:userId",
  jwtAuth,
  validateMiddleware(UserValidate.paramUser, "params"),
  updateUserById
);
router.delete("/:userId", jwtAuth, deleteUserById);
export default router;
