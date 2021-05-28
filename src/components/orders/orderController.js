import asyncMiddleware from "../../middleware/asyncMiddleware.js";

import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";

import { orderService } from "./orderService.js";
import { cartService } from "../carts/cartService.js";
import { productService } from "../products/productService.js";
import { notificationService } from "../notification/notificationService.js";
import mongoose from "mongoose";

export const createOrder = asyncMiddleware(async (req, res, next) => {
  const { status, cartId, note } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const cart = await cartService.findById(cartId, null, "products.productId");

    console.log(cart);
    if (!cart) {
      throw new ErrorResponse(400, `No cart has id ${cartId}`);
    }
    let totalOrder = 0;
    cart.products.reduce((acc, value) => {
      totalOrder = value.productId.price * value.amountCart + acc;
      return totalOrder;
    }, 0);
    cart.products.forEach(async (value) => {
      await productService.findOneAndUpdate(
        { _id: value.productId },
        { $inc: { amount: -value.amountCart } },
        opts
      );
    });

    const productOrder = cart.products;
    await cart.update({ $set: { products: [] } }, opts);

    const createdOrder = await orderService.create(
      {
        cartId,
        productOrder,
        totalOrder,
        status,
        note,
      },
      opts
    );

    await notificationService.create({
      idOrder: createdOrder._id,
      message: `Having a new order of ${req.user.email} customer`,
    });
    await session.commitTransaction();
    session.endSession();
    return new SuccessResponse(200, createdOrder).send(res);
  } catch (err) {
    await session.abortTransaction();
    throw new ErrorResponse(400, err);
  } finally {
    session.endSession();
  }
});
export const getOrder = asyncMiddleware(async (req, res, next) => {
  console.log(req.user);
  const emailUser = req.user.email;
  const cart = await cartService.findOne({ email: emailUser });

  const order = await orderService.getAll(
    { cartId: cart._id },
    null,
    "cart_detail"
  );

  if (!order) {
    throw new ErrorResponse(400, `No order`);
  }
  return new SuccessResponse(200, order).send(res);
});
export const getOrderOfUser = asyncMiddleware(async (req, res, next) => {
  const { cartId } = req.params;
  const order = await orderService.getAll({ cartId });
  if (!order.length) {
    throw new ErrorResponse(400, "No order");
  }
  return new SuccessResponse(200, order).send(res);
});

export const deleteOrderByIdOfAdmin = asyncMiddleware(
  async (req, res, next) => {
    const { orderId } = req.params;
    const order = await orderService.findByIdAndDelete(orderId);
    if (!order) {
      throw new ErrorResponse(400, `No order has id ${orderId}`);
    }
    return new SuccessResponse(
      200,
      `Order id ${orderId} is deleted successfully`
    ).send(res);
  }
);
export const deleteOrderByIdOfUser = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  const email = req.user.email;
  const cart = await cartService.findOne({ email }, "cartId");
  const order = await orderService.findOne({
    _id: orderId,
    cartId: cart._id,
  });

  if (!order) {
    throw new ErrorResponse(400, `No order has id ${orderId}`);
  }
  if (order.status === "shipped" || order.status === "completed") {
    throw new ErrorResponse(
      401,
      `Can not delete order when status is ${order.status}`
    );
  }
  await orderService.findByIdAndDelete(orderId);
  return new SuccessResponse(200, `Deleted Order has id ${orderId}`);
});
export const updateStatusOrder = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await orderService.findOneAndUpdate(
    { _id: orderId },
    { status },
    { new: true }
  );
  if (!order) {
    throw new ErrorResponse(400, `No order has id ${orderId}`);
  }
  return new SuccessResponse(200, order).send(res);
});
