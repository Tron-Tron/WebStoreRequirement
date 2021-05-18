import mongoose from "mongoose";
const { Schema } = mongoose;
const NotificationSchema = new Schema({
  message: {
    type: String,
    require: [true, "message is required"],
  },
  idOrder: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
  },
});
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
