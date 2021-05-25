// import ErrorResponse from "../utils/errorResponse.js";

import ErrorResponse from "../utils/errorResponse.js";

// const validateMiddleware = (validator) => {
//   return (req, res, next) => {
//     const { error } = validator(req.body);
//     if (error) {
//       return next(new ErrorResponse(400, error.details[0].message));
//     }
//     next();
//   };
// };
// export default validateMiddleware;

const validateMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      throw new ErrorResponse(400, error.details[0].message);
    }
    next();
  };
};
export default validateMiddleware;
