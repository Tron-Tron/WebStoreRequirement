import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import { Auth } from "../auth/authModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";
import { Staff } from "./staffModel.js";

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
  const newStaff = new Staff({ staffName, dateOfBirth, address, phone, email });
  const savedStaff = await newStaff.save();
  const newAuth = new Auth({
    authName: staffName,
    email,
    password,
    role: "employee",
    permissions,
  });
  await newAuth.save();
  return new SuccessResponse(200, savedStaff).send(res);
});

export const getAllStaffs = asyncMiddleware(async (req, res, next) => {
  const staffs = await Staff.find();
  if (!staffs.length) {
    throw new ErrorResponse(400, "No Staffs");
  }
  return new SuccessResponse(200, staffs).send(res);
});
export const getStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;
  if (!staffId.trim()) {
    throw new ErrorResponse(400, "staffId is empty");
  }
  const staff = await Staff.findById(staffId);
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
  const updatedStaff = await Staff.findOneAndUpdate(
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

  if (!staffId.trim()) {
    throw new ErrorResponse(400, "staffId is empty");
  }
  const deletedStaff = await Staff.findOneAndUpdate(
    { _id: staffId },
    { isActive: false },
    { new: true }
  );
  if (!deletedStaff) {
    throw new ErrorResponse(404, "No user");
  }
  return new SuccessResponse(200, `Deleted User has id ${staffId}`).send(res);
});
