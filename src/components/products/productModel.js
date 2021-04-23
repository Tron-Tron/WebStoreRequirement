import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      unique: true,
      require: [true, "productName is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
    amount: {
      type: Number,
      require: [true, "amount is required"],
    },
    images: {
      type: Array,
    },
    description: {
      type: String,
      require: [true, "description is required"],
    },
    distributor: {
      type: String,
      require: [true, "distributor is required"],
    },
    remark: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
ProductSchema.virtual("category_detail", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});
const Product = mongoose.model("Product", ProductSchema);
export default Product;
