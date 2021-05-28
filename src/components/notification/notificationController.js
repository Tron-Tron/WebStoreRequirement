import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import { notificationService } from "./notificationService.js";
import Notification from "../notification/notificationModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";

export const getAllNotification = asyncMiddleware(async (req, res, next) => {
  const notification = await notificationService.getAll();
  if (!notification.length) {
    throw new ErrorResponse("No Notification");
  }
  return new SuccessResponse(200, notification).send(res);
});

export const getNotificationByOrderId = asyncMiddleware(
  async (req, res, next) => {
    const { idOrder } = req.params;
    const notification = await notificationService.findOne(
      { idOrder },
      "message"
    );
    if (!notification) {
      throw new ErrorResponse(400, `No notification has id ${idOrder}`);
    }
    return new SuccessResponse(200, notification).send(res);
  }
);
