import express from "express";
import {
  getAllNotification,
  getNotificationByOrderId,
} from "./notificationController.js";
import notificationValidate from "./notificationValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
const router = express.Router();
router.get("/", getAllNotification);
router.get(
  "/:idOrder",
  validateMiddleware(notificationValidate.paramCategory, "params"),
  getNotificationByOrderId
);

export default router;
