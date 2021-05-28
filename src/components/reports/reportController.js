import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import { orderService } from "../orders/orderService.js";
import Order from "../orders/orderModel.js";

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

  const newReport = new Report({
    from_date,
    to_date,
    report: aggProduct,
  });
  await newReport.save();
  return new SuccessResponse(200, newReport).send(res);
});
export const createReportCategory = asyncMiddleware(async (req, res, next) => {
  const { from_date, to_date } = req.body;
  const aggCategory = await Order.aggregate([
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
  const newCategoryReport = new Report({
    from_date,
    to_date,
    report: aggCategory,
  });
  await newCategoryReport.save();
  return new SuccessResponse(200, newCategoryReport).send(res);
});
