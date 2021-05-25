import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Product from "../products/productModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import Cart from "./CartModel.js";
import mongoose from "mongoose";

export const updateCart = asyncMiddleware(async (req, res, next) => {
  const { productId, amountCart } = req.body;
  const userEmail = req.user.email;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session, returnOriginal: false };
    let cart = await Cart.findOne({ email: userEmail }, null, opts);
    const isExistProduct = await Product.findById(productId);

    if (!isExistProduct) {
      throw new ErrorResponse(400, `id product ${productId} is not exist`);
    }
    if (isExistProduct.amount < 0) {
      throw new ErrorResponse(400, `id product ${productId} is out of stock`);
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
    cart = await cart.save(opts);
    await session.commitTransaction();
    session.endSession();
    return new SuccessResponse(200, cart).send(res);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    throw new ErrorResponse(400, err);
  }
});
export const getAllCartById = asyncMiddleware(async (req, res, next) => {
  const { cartId } = req.params;
  if (!cartId.trim()) {
    throw new ErrorResponse(400, "cartId is empty");
  }
  const cart = await Cart.findById(cartId)
    .populate("products.productId")
    .populate("user");
  if (!cart) {
    throw new ErrorResponse(400, `No cart has id ${cartId}`);
  }
  return new SuccessResponse(200, cart).send(res);
});
