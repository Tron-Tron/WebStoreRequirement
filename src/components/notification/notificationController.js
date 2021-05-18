import asyncMiddleware from "../../middleware/asyncMiddleware.js";

import Notification from "../notification/notificationModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";

export const getAllNotification = asyncMiddleware(async (req, res, next) => {
  const notification = await Notification.find();
  if (!notification.length) {
    return next(new ErrorResponse("No Notification"));
  }
  return res.status(200).json(new SuccessResponse(200, notification));
});

export const getNotifiByOrderId = asyncMiddleware(async (req, res, next) => {
  const { idOrder } = req.params;
  if (!idOrder.trim()) {
    return next(new ErrorResponse(400, "IdOder is empty"));
  }
  const notification = await Notification.findOne(idOrder);
  if (!notification) {
    return next(new ErrorResponse(400, `No notification has id ${idOrder}`));
  }
  return res.status(200).json(new SuccessResponse(200, notification));
});
