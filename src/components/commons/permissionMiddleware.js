import ErrorResponse from "../utils/errorResponse.js";

const checkPermission =
  (...permissions) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse(401, "Unauthorization"));
    }
    console.log(permissions);

    const isExistPermission = permissions.filter((valuePerm) => {
      console.log(
        req.user.permissions.some(
          (userPermValue) => userPermValue.permissionKey === valuePerm
        )
      );
      return req.user.permissions.some(
        (userPermValue) => userPermValue.permissionKey === valuePerm
      );
    });
    console.log(isExistPermission);
    if (isExistPermission.length === 0) {
      return next(
        new ErrorResponse(403, "Don't have permission to do this task")
      );
    }
    next();
  };
export default checkPermission;
