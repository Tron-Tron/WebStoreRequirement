import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Product from "./productModel.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Category from "../categories/categoryModel.js";

export const createNewProduct = asyncMiddleware(async (req, res, next) => {
  const {
    productName,
    price,
    amount,
    image,
    description,
    distributor,
    categoryId,
  } = req.body;
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) {
    return next(new ErrorResponse(400, "Category is not exist"));
  }
  const newProduct = new Product({
    productName,
    price,
    amount,
    image,
    description,
    distributor,
    categoryId,
  });
  const createdProduct = await newProduct.save();
  return res.status(200).json(new SuccessResponse(200, createdProduct));
});

export const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find().populate("category_detail");
  if (!products.length) {
    return next(new ErrorResponse(400, "No Products"));
  }
  return res.status(200).json(new SuccessResponse(200, products));
});

export const getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    return next(new ErrorResponse(400, "productId is empty"));
  }
  const product = await Product.findById(productId).populate("category_detail");
  if (!product) {
    return next(new ErrorResponse(400, `No product has id ${productId}`));
  }
  return res.status(200).json(new SuccessResponse(200, product));
});

export const deteleProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    return next(new ErrorResponse(400, "productId is empty"));
  }
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return next(new ErrorResponse(400, `No product has id ${productId}`));
  }
  return res.status(200).json(new SuccessResponse(200, "Delete Successfully"));
});

export const updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    return next(new ErrorResponse(400, "productId is empty"));
  }
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true }
  );
  if (!updatedProduct) {
    return next(new ErrorResponse(404, `No product has id ${productId}`));
  }
  return res.status(200).json(new SuccessResponse(200, updatedProduct));
});
