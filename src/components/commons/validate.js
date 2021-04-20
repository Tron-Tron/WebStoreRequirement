import ErrorResponse from "../utils/errorResponse.js";
// import User from "../components/user/userModel.js";

export const isEmail = async (req, res, next) => {
  console.log(req.body.email);
  const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!regex.test(req.body.email)) {
    return next(new ErrorResponse(400, "Invalid Email"));
  }
  next();
};
export const isPhone = async (req, res, next) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!regex.test(req.body.phone)) {
    return next(new ErrorResponse(400, "Invalid Phone Number"));
  }
  next();
};
