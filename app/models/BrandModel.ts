import { Document, Model, Schema, model, models } from "mongoose";

interface BrandDocument extends Document {
  brandName: string;
  category: string;
}

const brandSchema = new Schema<BrandDocument>(
  {
    brandName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const BrandModel: Model<BrandDocument> =
  models.Brand || model<BrandDocument>("Brand", brandSchema);

export default BrandModel;
