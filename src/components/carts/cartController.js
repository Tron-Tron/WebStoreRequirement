import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Product from "../products/productModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import Cart from "./CartModel.js";

export const updateCart = asyncMiddleware(async (req, res, next) => {
  const { sku, name, amount, total } = req.body;
  const userEmail = req.user.email;
  let cart = await Cart.findOne({ email: userEmail });
  try {
    const isExistProduct = await Product.findById({ _id: sku });
    if (!isExistProduct) {
      return next(new ErrorResponse(400, `id product ${sku} is not exist`));
    }
    if (cart) {
      let indexProduct = cart.products.findIndex((value) => value.sku === sku);
      if (indexProduct > -1) {
        let product = cart.products[indexProduct];
        product.amount = amount;
        cart.products[indexProduct] = product;
      } else {
        cart.products.push({ sku, name, amount, total });
      }
    }
    cart = await cart.save();
    return res.status(200).json(new SuccessResponse(200, cart));
  } catch (err) {
    return next(new ErrorResponse(400, err));
  }
});
export const getAllCartById = asyncMiddleware(async (req, res, next) => {
  const { cartId } = req.params;
  if (!cartId.trim()) {
    return next(new ErrorResponse(400, "cartId is empty"));
  }
  const cart = await Cart.findById(cartId);
  if (!cart) {
    return next(new ErrorResponse(400, `No cart has id ${cartId}`));
  }
  return res.status(200).json(new SuccessResponse(200, cart));
});
