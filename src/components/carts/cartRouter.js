import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import cartValidate from "./cartValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import { getCart, updateCart } from "./cartController.js";
const router = express.Router();
router.use(jwtAuth, authorize("guest"));
router.post(
  "/",
  validateMiddleware(cartValidate.updateCart, "body"),
  updateCart
);
router.get("/", getCart);
export default router;
