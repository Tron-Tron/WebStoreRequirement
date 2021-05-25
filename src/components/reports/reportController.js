import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import Report from "./reportModel.js";
import mongoose from "mongoose";
import Order from "../orders/orderModel.js";
import Cart from "../carts/CartModel.js";
export const createReportProduct = asyncMiddleware(async (req, res, next) => {
  const { from_date, to_date } = req.body;
  const aggProduct = await Order.aggregate([
    {
      $match: {
        updatedAt: {
          $gte: new Date(from_date),
          $lte: new Date(to_date),
        },
      },
    },
    {
      $unwind: "$productOrder",
    },
    {
      $lookup: {
        from: "products",
        localField: "productOrder.productId",
        foreignField: "_id",
        as: "product-detail",
      },
    },
    {
      $unwind: "$product-detail",
    },
    {
      $group: {
        _id: "$productOrder.productId",
        revenue: {
          $sum: {
            $multiply: ["$product-detail.price", "$productOrder.amountCart"],
          },
        },
        total_order: { $sum: "$productOrder.amountCart" },
      },
    },
    {
      $project: {
        productId: "$_id",
        amount: "$total_order",
        revenue: "$revenue",
      },
    },
  ]);
  console.log(aggProduct);
  // const newReport = new Report({
  //   from_date,
  //   to_date,
  //   product_report: aggProduct,
  // });
  // await newReport.save();
  // return new SuccessResponse(200, newReport).send(res);
});
export const createReportCategory = asyncMiddleware(async (req, res, next) => {
  const { from_date, to_date } = req.body;
  const newReport = await Order.aggregate([
    {
      $match: {
        updatedAt: {
          $gte: new Date(from_date),
          $lte: new Date(to_date),
        },
      },
    },
    {
      $unwind: "$productOrder",
    },
    {
      $lookup: {
        from: "products",
        localField: "productOrder.productId",
        foreignField: "_id",
        as: "cart_product",
      },
    },
    {
      $unwind: "$cart_product",
    },
    {
      $group: {
        _id: "$cart_product.categoryId",
        revenue: {
          $sum: {
            $multiply: ["$product-detail.price", "$productOrder.amountCart"],
          },
        },
        total_order: { $sum: "$productOrder.amountCart" },
      },
    },
  ]);
  return new SuccessResponse(200, newReport).send(res);
});
export const createReportStaff = asyncMiddleware(async (req, res, next) => {
  const { from_date, to_date } = req.body;
  const agg = await Order.aggregate([
    {
      $match: {
        updatedAt: {
          $gte: new Date(from_date),
          $lte: new Date(to_date),
        },
      },
    },
    {
      $addFields: {
        cart: { $toObjectId: "$cartId" },
      },
    },
    {
      $lookup: {
        from: "carts",
        localField: "cart",
        foreignField: "_id",
        as: "carts",
      },
    },
    {
      $unwind: "$carts",
    },
    {
      $unwind: "$carts.products",
    },
    {
      $lookup: {
        from: "products",
        localField: "carts.products.productId",
        foreignField: "_id",
        as: "cart_product",
      },
    },
    {
      $unwind: "$cart_product",
    },
    {
      $group: {
        _id: "$cart_product.categoryId",
        revenue: { $sum: "$carts.products.total" },
        total_order: { $sum: "$carts.products.amountCart" },
      },
    },
  ]);
  return res.status(200).json(agg);
});
