import jwt from "jsonwebtoken";
import User from "../components/user/userModel.js";
import ErrorRespone from "../components/utils/errorResponse";

const jwtAuth = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return next(new ErrorRespone(401, "Unauthorized"));
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    console.log(payload);
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return next(new ErrorResponse(401, "Unauthorized"));
    }
    req.user = payload;
    next();
  } catch (error) {
    return next(new ErrorRespone(401, "Unauthorized"));
  }
};

export default jwtAuth;
