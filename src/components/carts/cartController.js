import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Product from "../products/productModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import { cartService } from "./cartService.js";
import { productService } from "../products/productService.js";

import mongoose from "mongoose";

export const updateCart = asyncMiddleware(async (req, res, next) => {
  const { productId, amountCart } = req.body;
  const userEmail = req.user.email;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session, returnOriginal: false };
    let cart = await cartService.findOne({ email: userEmail });
    const isExistProduct = await productService.getById(productId);
    if (!isExistProduct) {
      throw new ErrorResponse(400, `id product ${productId} is not exist`);
    }
    if (isExistProduct.amount < 0) {
      throw new ErrorResponse(400, `id product ${productId} is out of stock`);
    }
    if (isExistProduct.amount < amountCart) {
      throw new ErrorResponse(400, `Not Enough Amount Product`);
    }
    if (cart) {
      const indexProduct = cart.products.findIndex(
        (value) => value.productId.toString() === productId
      );

      if (indexProduct > -1) {
        let product = cart.products[indexProduct];
        product.amountCart += amountCart;
        cart.products[indexProduct] = product;
      } else {
        cart.products.push({ productId, amountCart });
      }
    }
    cart = await cartService.create(cart, opts);
    await session.commitTransaction();
    session.endSession();
    return new SuccessResponse(200, cart).send(res);
  } catch (err) {
    throw new ErrorResponse(400, err);
  } finally {
    await session.abortTransaction();
    session.endSession();
  }
});
export const getCart = asyncMiddleware(async (req, res, next) => {
  const emailUser = req.user.email;
  const cart = await cartService.findOne({ email: emailUser });
  if (!cart) {
    throw new ErrorResponse(400, cart);
  }
  return new SuccessResponse(200, cart).send(res);
});
