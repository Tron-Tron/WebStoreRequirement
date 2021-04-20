import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "./userModel.js";
import mongoose from "mongoose";

export const getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find();
  if (!users.length) {
    return next(new ErrorResponse(404, "No users"));
  }
  return res.status(200).json(new SuccessResponse(200, users));
});
export const createUser = asyncMiddleware(async (req, res, next) => {
  const { userName, email, address, phone } = req.body;
  const newUser = new User({
    userName,
    email,
    address,
    phone,
  });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
});
export const getUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId.trim()) {
    return next(new ErrorResponse(400, "userId is empty"));
  }
  const user = await User.findById(userId).catch((error) => {
    return next(new ErrorResponse(400, `No user has id ${userId}`));
  });
  return res.status(200).json(new SuccessResponse(200, user));
});
export const updateUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  const { userName, email, address, phone } = req.body;
  if (!userId.trim()) {
    return next(new ErrorRespone(400, "userId is empty"));
  }
  if (!mongoose.isValidObjectId(userId)) {
    return next(new ErrorRespone(400, "Id is invalid"));
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorRespone(404, "User is not found"));
  }
  user.userName = userName;
  user.email = email;
  user.address = address;
  user.phone = phone;
  const updatedUser = await user.save();
  if (!updatedUser) {
    return next(new ErrorRespone(400, "Can not update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedUser));
});

export const deleteUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId.trim()) {
    return next(new ErrorRespone(400, "userId is empty"));
  }
  if (!mongoose.isValidObjectId(userId)) {
    return next(new ErrorRespone(400, "Id is invalid"));
  }
  const deletedUser = await User.findOneAndUpdate(
    { _id: userId },
    { isActive: false },
    { new: true }
  );
  if (!deletedUser) {
    return next(new ErrorResponse(404, "No user"));
  }
  return res
    .status(200)
    .json(new SuccessResponse(200, `Deleted User has id ${userId}`));
});
