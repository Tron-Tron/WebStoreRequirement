import asyncMiddleware from "../../middleware/asyncMiddleware.js";

import Notification from "../notification/notificationModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";

export const getAllNotification = asyncMiddleware(async (req, res, next) => {
  const notification = await Notification.find();
  if (!notification.length) {
    throw new ErrorResponse("No Notification");
  }
  return new SuccessResponse(200, notification).send(res);
});

export const getNotifiByOrderId = asyncMiddleware(async (req, res, next) => {
  const { idOrder } = req.params;
  if (!idOrder.trim()) {
    throw new ErrorResponse(400, "IdOder is empty");
  }
  const notification = await Notification.findOne(idOrder);
  if (!notification) {
    throw new ErrorResponse(400, `No notification has id ${idOrder}`);
  }
  return new SuccessResponse(200, notification).send(res);
});
