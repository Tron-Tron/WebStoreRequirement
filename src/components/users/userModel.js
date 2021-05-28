import mongoose from "mongoose";
import Joi from "joi";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
      minlength: [6, "Name must have more than 6 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
