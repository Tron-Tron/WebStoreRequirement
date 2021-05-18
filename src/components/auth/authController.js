import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/successResponse.js";
import { Auth } from "./authModel.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import { Staff } from "../staffs/staffModel.js";
import Cart from "../carts/CartModel.js";

export const register = asyncMiddleware(async (req, res, next) => {
  const { authName, email, password, role } = req.body;
  const newAuth = new Auth({ authName, email, password, role });
  if (role === "employee" || role === "owner") {
    const isExistEmailEmployee = await Staff.findOne({ email });
    if (!isExistEmailEmployee) {
      return next(new ErrorResponse(400, "Email staff is not exist"));
    }
  }

  const auth = await newAuth.save();
  const newCart = new Cart({ email });
  newCart.save();
  return res.status(201).json(new SuccessResponse(201, auth));
});
export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await Auth.findOne({ email });
  console.log(isExistEmail);
  if (!isExistEmail) {
    return next(new ErrorResponse(404, "Email is not found"));
  }
  const isMatchPassword = await Auth.comparePassword(
    password,
    isExistEmail.password
  );
  if (!isMatchPassword) {
    return next(new ErrorResponse(404, "Password is incorrect"));
  }
  const token = jwt.sign(
    {
      _id: isExistEmail._id,
      email: isExistEmail.email,
      role: isExistEmail.role,
    },
    process.env.JWT_KEY
  );

  return res.status(200).json(new SuccessResponse(200, token));
});
