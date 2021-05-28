import mongoose from "mongoose";
const { Schema } = mongoose;

const dateNow = new Date();
const ReportSchema = new Schema(
  {
    from_date: {
      type: Date,
      required: function () {
        return this.from_date.getTime() < dateNow.getTime();
      },
    },
    to_date: {
      type: Date,
      required: function () {
        return this.to_date.getTime() > this.from_date.getTime();
      },
    },
    report: [
      {
        _id: {
          type: String,
          require: [true, "_id is required"],
          ref: "Cart",
        },
        revenue: {
          type: Number,
          require: [true, "revenue is required"],
          default: 0,
        },
        total_order: {
          type: Number,
          require: [true, "total_order is required"],
        },
      },
    ],
  },
  { timestamps: true }
);
const Report = mongoose.model("Report", ReportSchema);
export default Report;
