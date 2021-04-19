import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import authorize from "./../../middleware/authorize.js";
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  deteleProductById,
  updateProductById,
} from "./productController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner", "employee"));

router.post("/", createNewProduct);
router.get("/all", getAllProducts);
router.get("/:productId", getProductById);
router.delete("/:productId", deteleProductById);
router.patch("/:productId", updateProductById);
export default router;
