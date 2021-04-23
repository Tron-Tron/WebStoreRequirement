import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../users/usersController.js";
import { isEmail, isPhone } from "../commons/validate.js";
import authorize from "./../../middleware/authorize.js";
import upload from "../commons/upload.js";

const router = express.Router();
router.get("/all", jwtAuth, authorize("owner", "employee"), getAllUsers);
router.get("/:userId", jwtAuth, getUserById);
router.post(
  "/",
  jwtAuth,
  upload.single("avatar"),
  isEmail,
  isPhone,
  createUser
);
router.patch("/:userId", jwtAuth, isEmail, isPhone, updateUserById);
router.delete("/:userId", jwtAuth, deleteUserById);
export default router;