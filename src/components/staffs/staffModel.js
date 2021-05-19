import mongoose from "mongoose";
import Joi from "joi";
const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    staffName: {
      type: String,
      require: [true, "staffName is required"],
    },
    dateOfBirth: {
      type: Date,
      require: [true, "dateOfBirth is required"],
    },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    phone: {
      type: String,
      require: [true, "phone is required"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "email is required"],
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Staff = mongoose.model("Staff", StaffSchema);
export const validateStaff = (staff) => {
  const schema = Joi.object({
    staffName: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)

      .required(),
    dateOfBirth: Joi.date().required(),
  }).unknown(true);
  return schema.validate(staff);
};
