import ErrorResponse from "../utils/errorResponse.js";

const validateMiddleware = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    console.log("Error", error);
    if (error) {
      return next(new ErrorResponse(400, error.details[0].message));
    }
    next();
  };
};
export default validateMiddleware;
