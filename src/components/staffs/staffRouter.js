import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import { isEmail, isPhone } from "../commons/validate.js";
import {
  createNewStaff,
  getStaffById,
  getAllStaffs,
  updateStaffById,
  deleteStaffById,
} from "./staffController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner"));

router.post("/", isEmail, isPhone, createNewStaff);
router.get("/all", getAllStaffs);
router.get("/:staffId", getStaffById);
router.patch("/:staffId", isEmail, isPhone, updateStaffById);
router.delete("/:staffId", deleteStaffById);

export default router;
