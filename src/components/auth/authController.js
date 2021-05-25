import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/successResponse.js";
import { Auth } from "./authModel.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import Cart from "../carts/CartModel.js";

export const register = asyncMiddleware(async (req, res, next) => {
  const { authName, email, password } = req.body;
  const newAuth = new Auth({ authName, email, password });
  const auth = await newAuth.save();
  const newCart = new Cart({ email });
  newCart.save();
  return new SuccessResponse(201, auth).send(res);
});
export const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await Auth.findOne({ email });
  if (!isExistEmail) {
    throw new ErrorResponse(404, "Email is not found");
  }
  const isMatchPassword = await Auth.comparePassword(
    password,
    isExistEmail.password
  );
  if (!isMatchPassword) {
    throw new ErrorResponse(404, "Password is incorrect");
  }
  const token = jwt.sign(
    {
      _id: isExistEmail._id,
      email: isExistEmail.email,
      role: isExistEmail.role,
      permissions: isExistEmail.permissions,
    },
    process.env.JWT_KEY
  );
  return new SuccessResponse(200, token).send(res);
});
