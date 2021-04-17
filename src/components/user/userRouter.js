import express from "express";
import { getAllUsers } from "../user/usersController.js";
const router = express.Router();
router.get("/all", getAllUsers);
export default router;
