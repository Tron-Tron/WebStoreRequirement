import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import authorize from "./../../middleware/authorize.js";
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  deteleProductById,
  updateProductById,
  searchProductByName,
} from "./productController.js";
import upload from "../commons/upload.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner", "employee"));

router.post("/", upload.array("images", 10), createNewProduct);
router.get("/all", getAllProducts);
router.get("/:productId", getProductById);
router.delete("/:productId", deteleProductById);
router.patch("/:productId", updateProductById);
router.get("/", searchProductByName);

export default router;
