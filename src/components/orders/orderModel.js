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
    productOrder: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        amountCart: {
          type: Number,
          require: [true, "amount is required"],
          default: 0,
        },
      },
    ],
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
    emailSatff: {
      type: String,
      require: [true, "staffId is required"],
      default: "",
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
OrderSchema.virtual("staff", {
  ref: "Auth",
  localField: "emailStaff",
  foreignField: "email",
  justOne: true,
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
