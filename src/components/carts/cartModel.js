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
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
CartSchema.virtual("user", {
  ref: "Auth",
  localField: "email",
  foreignField: "email",
  justOne: true,
});
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
