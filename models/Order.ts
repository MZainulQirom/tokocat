// models/Order.ts
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productId: String,
  name: String,
  phone: String,
  address: String,
  city: String,

  quantity: Number,
  color: String,

  price: Number,
  subtotal: Number,
  ongkir: Number,
  total: Number,

  paymentMethod: String,

  status: {
    type: String,
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);