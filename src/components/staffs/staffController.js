import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import { authService } from "../auth/authService.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";
import { staffService } from "./staffService.js";

export const createNewStaff = asyncMiddleware(async (req, res, next) => {
  const {
    staffName,
    dateOfBirth,
    address,
    phone,
    email,
    password,
    permissions,
  } = req.body;

  const savedStaff = await staffService.create({
    staffName,
    dateOfBirth,
    address,
    phone,
    email,
  });
  await authService.create({
    authName: staffName,
    email,
    password,
    role: "employee",
    permissions,
  });
  return new SuccessResponse(200, savedStaff).send(res);
});

export const getAllStaffs = asyncMiddleware(async (req, res, next) => {
  const staffs = await staffService.getAll();
  if (!staffs.length) {
    throw new ErrorResponse(400, "No Staffs");
  }
  return new SuccessResponse(200, staffs).send(res);
});
export const getStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;
  const staff = await staffService.findById(staffId);
  if (!staff) {
    throw new ErrorResponse(400, `No staff has id ${staffId}`);
  }
  return new SuccessResponse(200, staff).send(res);
});

export const updateStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;

  if (!staffId.trim()) {
    throw new ErrorResponse(400, "staffId is empty");
  }
  const updatedStaff = await staffService.findOneAndUpdate(
    { _id: staffId },
    req.body,
    { new: true }
  );
  if (!updatedStaff) {
    throw new ErrorResponse(400, `No staff has id ${staffId}`);
  }
  return new SuccessResponse(200, updatedStaff).send(res);
});

export const deleteStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;
  const deletedStaff = await staffService.findOneAndUpdate(
    { _id: staffId },
    { isActive: false },
    { new: true }
  );
  if (!deletedStaff) {
    throw new ErrorResponse(404, "No user");
  }
  return new SuccessResponse(200, `Deleted User has id ${staffId}`).send(res);
});
