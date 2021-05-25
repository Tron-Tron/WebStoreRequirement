import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import Category from "./categoryModel.js";
import mongoose from "mongoose";
import { categoryService } from "./categoryService.js";
export const createCategory = asyncMiddleware(async (req, res, next) => {
  const { categoryName, descriptionCategory } = req.body;
  const newCategory = new Category({ categoryName, descriptionCategory });
  const savedCategory = await newCategory.save();
  return new SuccessResponse(200, savedCategory).send(res);
});

export const getCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await categoryService.findById(
    categoryId,
    "categoryName descriptionCategory"
  );
  if (!category) {
    throw new ErrorResponse(404, `No category has id ${categoryId}`);
  }
  return new SuccessResponse(200, category).send(res);
});
export const getAllCategories = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories.length) {
    throw new ErrorResponse(404, "No categories");
  }
  return new SuccessResponse(200, categories).send(res);
});
export const updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    throw new ErrorResponse(400, "categoryId is empty");
  }
  const updatedCategory = await categoryService.findOneAndUpdate(
    { _id: categoryId },
    req.body,
    { new: true }
  );
  if (!updatedCategory) {
    throw new ErrorResponse(400, `No category has id ${categoryId}`);
  }
  //console.log(res.status);
  //return res.status(200).json(new SuccessResponse(200, updatedCategory));
  return new SuccessResponse(200, updatedCategory).send(res);
});
export const deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId.trim()) {
    throw new ErrorResponse(400, "categoryId is empty");
  }
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    throw new ErrorResponse(400, `No category has id ${categoryId}`);
  }
  return new SuccessResponse(
    200,
    `Category id ${categoryId} is deleted successfuly`
  ).send(res);
});
