import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import validateMiddleware from "./../commons/validateMiddleware.js";
import { validateStaff } from "./staffModel.js";
import {
  createNewStaff,
  getStaffById,
  getAllStaffs,
  updateStaffById,
  deleteStaffById,
} from "./staffController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner"));

router.post("/", validateMiddleware(validateStaff), createNewStaff);
router.get("/all", getAllStaffs);
router.get("/:staffId", getStaffById);
router.patch("/:staffId", validateMiddleware(validateStaff), updateStaffById);
router.delete("/:staffId", deleteStaffById);

export default router;
