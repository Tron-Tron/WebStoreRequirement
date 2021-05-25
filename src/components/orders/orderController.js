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
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new ErrorResponse(400, `No cart has id ${cartId}`));
    }
    let totalOrder = 0;
    cart.products.reduce((acc, value) => {
      totalOrder = value.total * value.amountCart + acc;
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
    const notifi = new Notification({
      idOrder: createdOrder._id,
      message: `Having a new order of ${req.user.email} customer`,
    });
    await notifi.save();
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json(new SuccessResponse(200, createdOrder));
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return next(new ErrorResponse(400, err));
  }
});
export const getOrderById = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  if (!orderId) {
    return next(new ErrorResponse(400, "orderId is empty"));
  }
  const order = await Order.findById(orderId).populate("cart_detail");
  if (!order) {
    return next(new ErrorResponse(400, `No order has id ${orderId}`));
  }
  return res.status(200).json(new SuccessResponse(200, order));
});
export const deleteOrderById = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  if (!orderId.trim()) {
    return next(new ErrorResponse(400, "orderId is empty"));
  }
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorResponse(400, `No order has id ${orderId}`));
  }
  if (order.status === "shipped" || order.status === "completed") {
    return next(
      new ErrorResponse(
        401,
        `Can not delete order when status is ${order.status}`
      )
    );
  }
  await Order.findByIdAndDelete(orderId);
  return res
    .status(200)
    .json(new SuccessResponse(200, `Deleted Order has id ${orderId}`));
});
export const updateStatusOrder = asyncMiddleware(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const staff = req.user.email;
  if (!orderId.trim()) {
    return next(new ErrorResponse(400, "orderId is empty"));
  }
  const checkStaff = await Order.findById(orderId);
  console.log("checkStaff", checkStaff);
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    { new: true }
  );
  if (!order) {
    return next(new ErrorResponse(400, `No order has id ${orderId}`));
  }
  return res.status(200).json(new SuccessResponse(200, order));
});
