import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed"],
      default: "pending",
    },
    cartId: {
      type: String,
      require: [true, "cartId is required"],
    },
    totalOrder: {
      type: Number,
      require: [true, "totalOrder is required"],
      default: 0,
    },
    note: {
      type: String,
      require: [true, "note is required"],
      default: "No comment",
    },
    staffId: {
      type: String,
      require: [true, "staffId is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
OrderSchema.virtual("cart_detail", {
  ref: "Cart",
  localField: "cartId",
  foreignField: "_id",
  justOne: true,
});
OrderSchema.virtual("staff_detail", {
  ref: "Staff",
  localField: "staffId",
  foreignField: "_id",
  justOne: true,
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
