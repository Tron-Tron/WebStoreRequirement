import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import validateMiddleware from "./../commons/validateMiddleware.js";
import StaffValidate from "./staffValidate.js";

import {
  createNewStaff,
  getStaffById,
  getAllStaffs,
  updateStaffById,
  deleteStaffById,
} from "./staffController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner"));

router.post(
  "/",
  validateMiddleware(StaffValidate.postStaff, "body"),
  createNewStaff
);
router.get("/all", getAllStaffs);
router.get(
  "/:staffId",
  validateMiddleware(StaffValidate.paramStaff, "params"),
  getStaffById
);
router.patch(
  "/:staffId",
  validateMiddleware(StaffValidate.paramStaff, "params"),
  updateStaffById
);
router.delete(
  "/:staffId",
  validateMiddleware(StaffValidate.paramStaff, "params"),
  deleteStaffById
);

export default router;
