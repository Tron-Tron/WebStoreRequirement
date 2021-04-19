import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} from "./categoryController.js";

const router = express.Router();
router.use(jwtAuth, authorize("owner", "employee"));

router.post("/", createCategory);
router.get("/all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.patch("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

export default router;
