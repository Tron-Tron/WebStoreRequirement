import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import Category from "./categoryModel.js";
import mongoose from "mongoose";
export const createCategory = asyncMiddleware(async (req, res, next) => {
  const { categoryName, descriptionCategory } = req.body;
  const newCategory = new Category({ categoryName, descriptionCategory });
  const savedCategory = await newCategory.save();
  return res.status(200).json(new SuccessResponse(200, savedCategory));
});
export const getCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    return next(new ErrorResponse(400, "categoryId is empty"));
  }
  if (!mongoose.isValidObjectId(categoryId)) {
    return next(new ErrorResponse(400, "categoryId is invalid"));
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new ErrorResponse(404, `No category has id ${categoryId}`));
  }
  return res.status(200).json(new SuccessResponse(200, category));
});
export const getAllCategories = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories.length) {
    return next(new ErrorResponse(404, "No categories"));
  }
  return res.status(200).json(new SuccessResponse(200, categories));
});
export const updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    return next(new ErrorResponse(400, "categoryId is empty"));
  }
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    { new: true }
  );
  if (!updatedCategory) {
    return next(new ErrorResponse(400, `No category has id ${categoryId}`));
  }
  return res.status(200).json(new SuccessResponse(200, updatedCategory));
});
export const deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    return next(new ErrorResponse(400, "categoryId is empty"));
  }
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    return next(new ErrorResponse(400, `No category has id ${categoryId}`));
  }
  return res
    .status(200)
    .json(
      new SuccessResponse(
        200,
        `Category id ${categoryId} is deleted successfuly`
      )
    );
});
