import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import CartValidate from "./cartValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import { getAllCartById, updateCart } from "./cartController.js";
const router = express.Router();
router.use(jwtAuth, authorize("guest"));
router.post(
  "/",
  validateMiddleware(CartValidate.updateCart, "body"),
  updateCart
);
router.get(
  "/:cartId",
  validateMiddleware(CartValidate.paramCart, "params"),
  getAllCartById
);
export default router;
