import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import { getAllCartById, updateCart } from "./cartController.js";
const router = express.Router();
router.use(jwtAuth, authorize("guest"));
router.post("/", updateCart);
router.get("/:cartId", getAllCartById);
export default router;
