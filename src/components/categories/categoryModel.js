import mongoose from "mongoose";
const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      require: [true, "categoryName is required"],
    },
    descriptionCategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", CategorySchema);
export default Category;
