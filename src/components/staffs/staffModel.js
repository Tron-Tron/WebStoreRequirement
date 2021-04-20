import mongoose from "mongoose";
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
const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;
