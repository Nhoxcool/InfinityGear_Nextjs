import { Document, Model, Schema, model, models } from "mongoose";
import categories from "../utils/categories";

export interface NewBrand {
  brand: string;
  category: string;
  logo: { url: string; id: string };
}

export interface BrandDocument extends NewBrand, Document {}

const brandSchema = new Schema<BrandDocument>(
  {
    brand: { type: String, required: true },
    category: { type: String, enum: [...categories], required: true },
    logo: {
      type: Object,
      required: true,
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const BrandModel = models.Brand || model("Brand", brandSchema);

export default BrandModel as Model<BrandDocument>;
