import { baseService } from "../utils/baseService.js";
import Notification from "./notificationModel.js";
export const notificationService = baseService.bind(null, Notification)();
