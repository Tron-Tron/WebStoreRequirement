import mongoose from "mongoose";
const { Schema } = mongoose;
const CartSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    products: [
      {
        sku: {
          type: String,
          default: null,
          require: [true, "sku is required"],
        },
        name: {
          type: String,
          default: null,
          require: [true, "name product is required"],
        },
        amount: {
          type: Number,
          require: [true, "amount is required"],
          default: 0,
        },
        total: {
          type: Number,
          require: [true, "total is required"],
          default: 0,
        },
      },
    ],
    dateAddCart: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
