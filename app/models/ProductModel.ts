import { Document, Model, model, models, Schema, Types } from "mongoose";
import categories from "../utils/categories";

export interface NewProduct {
  title: string;
  description: string;
  bulletPoints?: string[];
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string }[];
  price: {
    base: number;
    discounted: number;
  };
  brand: string;
  category: string;
  quantity: number;
  rating?: number;
}

export interface ProductDocument extends NewProduct {
  // Virtual property
  sale: number;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: { type: [String] },
    thumbnail: {
      type: Object,
      required: true,
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    brand: { type: String, required: true },
    category: { type: String, enum: [...categories], required: true },
    quantity: { type: Number, required: true },
    rating: Number,
  },
  { timestamps: true }
);

productSchema.virtual("sale").get(function (this: ProductDocument) {
  return Math.round(
    ((this.price.base - this.price.discounted) / this.price.base) * 100
  );
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
