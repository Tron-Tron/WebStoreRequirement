import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { userService } from "./userService.js";
import mongoose from "mongoose";

export const getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await userService.getAll();
  if (!users.length) {
    throw new ErrorResponse(404, "No users");
  }
  return new SuccessResponse(200, users).send(res);
});
export const createUser = asyncMiddleware(async (req, res, next) => {
  const { userName, email, address, phone } = req.body;
  const accLogin = req.user.email;
  let newUser;
  if (req.user.role === "guest") {
    newUser = await userService.create({
      userName,
      email: accLogin,
      address,
      phone,
      avatar: req.file.filename,
    });
  } else {
    newUser = await userService.create({
      userName,
      email,
      address,
      phone,
      avatar: req.file.filename,
    });
  }
  return new SuccessResponse(201, newUser);
});
export const getUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.findById(userId).catch((error) => {
    throw new ErrorResponse(400, `No user has id ${userId}`);
  });
  return new SuccessResponse(200, user).send(res);
});
export const updateUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  const { userName, email, address, phone } = req.body;
  const user = await userService.findById(userId);
  if (!user) {
    throw new ErrorResponse(404, "User is not found");
  }
  user.userName = userName;
  user.email = email;
  user.address = address;
  user.phone = phone;
  const updatedUser = await userService.save(user);
  if (!updatedUser) {
    throw new ErrorResponse(400, "Can not update");
  }
  return new SuccessResponse(200, updatedUser).send(res);
});

export const deleteUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await userService.findOneAndUpdate(
    { _id: userId },
    { isActive: false },
    { new: true }
  );
  if (!deletedUser) {
    throw new ErrorResponse(404, "No user");
  }
  return new SuccessResponse(200, `Deleted User has id ${userId}`).send(res);
});
