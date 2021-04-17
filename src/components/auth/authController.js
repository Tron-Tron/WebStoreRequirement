import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/successResponse.js";
import User from "../user/userModel.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
export const register = asyncMiddleware(async (req, res, next) => {
  const { userName, email, password, role, address, phone } = req.body;
  const newUser = new User({ userName, email, password, role, address, phone });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
});
export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (!isExistEmail) {
    return next(new ErrorResponse(404, "Email is not found"));
  }
  const isMatchPassword = await User.comparePassword(
    password,
    isExistEmail.password
  );
  if (!isMatchPassword) {
    return next(new ErrorResponse(404, "Password is incorrect"));
  }
  const token = jwt.sign(
    {
      email: isExistEmail.email,
      role: isExistEmail.role,
    },
    process.env.JWT_KEY
  );
  console.log(token);
  return res.status(200).json(new SuccessResponse(200, token));
});
