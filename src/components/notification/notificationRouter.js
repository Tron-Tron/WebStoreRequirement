import express from "express";
import {
  getAllNotification,
  getNotifiByOrderId,
} from "./notificationController.js";
const router = express.Router();
router.get("/", getAllNotification);
router.get("/:idOrder", getNotifiByOrderId);

export default router;
