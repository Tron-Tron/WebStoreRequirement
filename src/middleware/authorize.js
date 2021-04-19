import ErrorResponse from "../components/utils/errorResponse.js";

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse(401, "Unauthorization"));
  }

  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(403, "Don't have permission to access this user")
    );
  }
  next();
};
export default authorize;
