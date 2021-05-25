import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";
const { Schema } = mongoose;
const AuthSchema = new Schema(
  {
    authName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "guest", "employee"],
      required: true,
      default: "guest",
    },
    permissions: [
      {
        permissionKey: {
          type: String,
          required: true,
          default: null,
        },
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
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
export const Auth = mongoose.model("Auth", AuthSchema);

export const validateAuth = (auth) => {
  const schema = Joi.object({
    authName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    role: Joi.string().trim(),
  });
  return schema.validate(auth);
};
