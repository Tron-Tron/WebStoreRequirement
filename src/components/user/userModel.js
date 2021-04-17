import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["owner", "guest", "employee"],
      required: true,
      default: "guest",
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
const User = mongoose.model("User", UserSchema);
export default User;
