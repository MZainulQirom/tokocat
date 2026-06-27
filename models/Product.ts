import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  color: string[];
  description: string;
  image: string;
  unggulan: boolean; // 🔥 penting
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  color: [{ type: String }],
  description: { type: String },
  image: { type: String },
  unggulan: { type: Boolean, default: false }, // 🔥 default false
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);