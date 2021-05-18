import express from "express";
import {
  createOrder,
  getOrderById,
  deleteOrderById,
  updateStatusOrder,
} from "./orderController.js";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
const router = express.Router();
router.use(jwtAuth, authorize("guest"));
router.post("/", createOrder);
router.get("/:orderId", getOrderById);
router.delete("/:orderId", deleteOrderById);
router.patch(
  "/:orderId",
  jwtAuth,
  authorize("owner", "employee"),
  updateStatusOrder
);
export default router;
