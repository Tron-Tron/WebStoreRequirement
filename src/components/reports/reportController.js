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
      $group: {
        _id: "$carts.products.productId",
        revenue: { $sum: "$carts.products.total" },
        total_order: { $sum: "$carts.products.amountCart" },
      },
    },
  ]);

  // const arrProductCart = [];
  // agg.forEach((value) => {
  //   value.carts.map((valueCart) => {
  //     valueCart.products.map((valueProductCart) => {
  //       arrProductCart.push(valueProductCart);
  //     });
  //   });
  // });

  // const arrProductReport = [];
  // let product_report = { product_id: "", revenue: 0, total_order: 0 };

  // arrProductCart.forEach((value) => {
  //   const indexProductReport = arrProductReport.findIndex(
  //     (valueArr) =>
  //       valueArr.product_id.toString() === value.productId.toString()
  //   );
  //   if (indexProductReport > -1) {
  //     const report = arrProductReport[indexProductReport];
  //     report.revenue += value.total;
  //     report.total_order += value.amountCart;
  //     arrProductReport[indexProductReport] = report;
  //   } else {
  //     product_report = { product_id: "", revenue: 0, total_order: 0 };
  //     product_report.product_id = value.productId;
  //     product_report.revenue = value.total;
  //     product_report.total_order = value.amountCart;
  //     arrProductReport.push(product_report);
  //   }
  // });
  const newReport = new Report({
    from_date,
    to_date,
    product_report: aggProduct,
  });
  await newReport.save();
  return res.status(200).json(new SuccessResponse(200, newReport));
});
export const createReportCategory = asyncMiddleware(async (req, res, next) => {
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
