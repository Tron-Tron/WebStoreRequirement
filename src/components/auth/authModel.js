import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
const AuthSchema = new Schema(
  {
    authName: {
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
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

AuthSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
AuthSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
const Auth = mongoose.model("Auth", AuthSchema);
export default Auth;
