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
// router.use(jwtAuth, authorize("owner", "employee"));

router.post("/", createCategory);
/**
 * @swagger
 * /:
 *  get:
 *   summary: get all categories
 *   description: get all categories
 *   responses:
 *    200:
 *     description: success
 */
router.get("/all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.patch("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

export default router;
