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
  return res.status(200).json(new SuccessResponse(200, savedStaff));
});

export const getAllStaffs = asyncMiddleware(async (req, res, next) => {
  const staffs = await Staff.find();
  if (!staffs.length) {
    return next(new ErrorResponse(400, "No Staffs"));
  }
  res.status(200).json(new SuccessResponse(200, staffs));
});
export const getStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;
  if (!staffId.trim()) {
    return next(new ErrorResponse(400, "staffId is empty"));
  }
  const staff = await Staff.findById(staffId);
  if (!staff) {
    return next(new ErrorResponse(400, `No staff has id ${staffId}`));
  }
  return res.status(200).json(new SuccessResponse(200, staff));
});

export const updateStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;

  if (!staffId.trim()) {
    return next(new ErrorResponse(400, "staffId is empty"));
  }
  const updatedStaff = await Staff.findOneAndUpdate(
    { _id: staffId },
    req.body,
    { new: true }
  );
  if (!updatedStaff) {
    return next(new ErrorResponse(400, `No staff has id ${staffId}`));
  }
  return res.status(200).json(new SuccessResponse(200, updatedStaff));
});

export const deleteStaffById = asyncMiddleware(async (req, res, next) => {
  const { staffId } = req.params;

  if (!staffId.trim()) {
    return next(new ErrorResponse(400, "staffId is empty"));
  }
  const deletedStaff = await Staff.findOneAndUpdate(
    { _id: staffId },
    { isActive: false },
    { new: true }
  );
  if (!deletedStaff) {
    return next(new ErrorResponse(404, "No user"));
  }
  return res
    .status(200)
    .json(new SuccessResponse(200, `Deleted User has id ${staffId}`));
});
