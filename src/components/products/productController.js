import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Product from "./productModel.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Category from "../categories/categoryModel.js";
import { productService } from "./productService.js";

export const createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { productName, price, amount, description, distributor, categoryId } =
    req.body;
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) {
    throw new ErrorResponse(400, "Category is not exist");
  }
  if (!req.files) {
    throw new ErrorResponse(500, "No file");
  }
  const images = req.files.map((val) => {
    return val.filename;
  });

  const newProduct = new Product({
    productName,
    price,
    amount,
    images,
    description,
    distributor,
    categoryId,
  });
  const createdProduct = await newProduct.save();
  return new SuccessResponse(200, createdProduct).send(res);
});

export const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find().populate("category_detail");
  if (!products.length) {
    throw new ErrorResponse(400, "No Products");
  }
  return new SuccessResponse(200, products).send(res);
});

export const getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    throw new ErrorResponse(400, "productId is empty");
  }
  // const product = await productService
  //   .findById(productId)
  //   .populate("category_detail");
  const product = await productService.findById(
    productId,
    "productName",
    "category_detail"
  );

  if (!product) {
    throw new ErrorResponse(400, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, product).send(res);
});

export const deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    throw new ErrorResponse(400, "productId is empty");
  }
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new ErrorResponse(400, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, "Delete Successfully").send(res);
});

export const updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId.trim()) {
    throw new ErrorResponse(400, "productId is empty");
  }
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true }
  );
  if (!updatedProduct) {
    throw new ErrorResponse(404, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, updatedProduct).send(res);
});
export const searchProductByName = asyncMiddleware(async (req, res, next) => {
  const { keyName } = req.query;
  const productArr = await Product.find();
  const searchedProduct = productArr.filter((value) => {
    return (
      value.productName.toLowerCase().indexOf(keyName.toLowerCase()) !== -1
    );
  });
  if (searchedProduct.length === 0) {
    throw new ErrorResponse(400, "No Products");
  }
  return new SuccessResponse(200, searchedProduct).send(res);
});
