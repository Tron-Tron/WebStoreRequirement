import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import authorize from "./../../middleware/authorize.js";
import checkPermission from "../commons/permissionMiddleware.js";
import { PermissionKeyEmployee } from "./../utils/permissionList.js";
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  searchProductByName,
} from "./productController.js";
import upload from "../commons/upload.js";

const router = express.Router();
//router.use(jwtAuth, authorize("owner", "employee"));

router.post(
  "/",
  jwtAuth,
  authorize("employee"),
  checkPermission(
    PermissionKeyEmployee.employeeWrite,
    PermissionKeyEmployee.employeeEdit
  ),
  upload.array("images", 10),
  createNewProduct
);
router.get("/all", getAllProducts);
router.get("/:productId", getProductById);
router.delete("/:productId", deleteProductById);
router.patch("/:productId", updateProductById);
router.get("/", searchProductByName);

export default router;
