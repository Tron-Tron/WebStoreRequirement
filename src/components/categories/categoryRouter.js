import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import CategoryValidate from "./categoryValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} from "./categoryController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner", "employee"));

router.post(
  "/",
  validateMiddleware(CategoryValidate.postCategory, "body"),
  createCategory
);

router.get("/all", getAllCategories);
router.get(
  "/:categoryId",
  validateMiddleware(CategoryValidate.paramCategory, "params"),
  getCategoryById
);
router.patch(
  "/:categoryId",
  validateMiddleware(CategoryValidate.paramCategory, "params"),
  updateCategoryById
);
router.delete(
  "/:categoryId",
  validateMiddleware(CategoryValidate.paramCategory, "params"),
  deleteCategoryById
);

export default router;
