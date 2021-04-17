import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "./userModel.js";
export const getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find().select("-password");
  if (!users.length) {
    return next(new ErrorResponse(404, "No users"));
  }
  return res.status(200).json(new SuccessResponse(200, users));
});
