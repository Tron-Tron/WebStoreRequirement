import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import Cart from "../carts/CartModel.js";
import Product from "../products/productModel.js";
import Notification from "../notification/notificationModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";
import Order from "./orderModel.js";
import mongoose from "mongoose";

export const createOrder = asyncMiddleware(async (req, res, next) => {
  const { status, cartId, note } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const cart = await Cart.findById(cartId).populate("products.productId");
    console.log(cart);
    if (!cart) {
      throw new ErrorResponse(400, `No cart has id ${cartId}`);
    }
    let totalOrder = 0;
    cart.products.reduce((acc, value) => {
      //console.log(value.productId.price);
      totalOrder = value.productId.price * value.amountCart + acc;
      return totalOrder;
    }, 0);
    cart.products.forEach(async (value) => {
      await Product.findOneAndUpdate(
        { _id: value.productId },
        { $inc: { amount: -value.amountCart } },
        opts
      );
    });

    const productOrder = cart.products;
    await cart.update({ $set: { products: [] } }, opts);

    const newOrder = new Order({
      cartId,
      productOrder,
      totalOrder,
      status,
      note,
    });
    const createdOrder = await newOrder.save(opts);
    const notification = new Notification({
      idOrder: createdOrder._id,
      message: `Having a new order of ${req.user.email} customer`,
    });
    await notification.save();
    await session.commitTransaction();
    session.endSession();
    return new SuccessResponse(200, createdOrder).send(res);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ErrorResponse(400, err);
  }
});
export const getOrderById = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  if (!orderId) {
    throw new ErrorResponse(400, "orderId is empty");
  }
  const order = await Order.findById(orderId).populate("cart_detail");
  if (!order) {
    throw new ErrorResponse(400, `No order has id ${orderId}`);
  }
  return new SuccessResponse(200, order).send(res);
});
export const deleteOrderById = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  if (!orderId.trim()) {
    throw new ErrorResponse(400, "orderId is empty");
  }
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ErrorResponse(400, `No order has id ${orderId}`);
  }
  if (order.status === "shipped" || order.status === "completed") {
    throw new ErrorResponse(
      401,
      `Can not delete order when status is ${order.status}`
    );
  }
  await Order.findByIdAndDelete(orderId);
  return new SuccessResponse(200, `Deleted Order has id ${orderId}`);
});
export const updateStatusOrder = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const staff = req.user.email;
  if (!orderId.trim()) {
    throw new ErrorResponse(400, "orderId is empty");
  }
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    { new: true }
  );
  if (!order) {
    throw new ErrorResponse(400, `No order has id ${orderId}`);
  }
  return new SuccessResponse(200, order).send(res);
});
