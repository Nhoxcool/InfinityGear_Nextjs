"use server";

import startDb from "@/app/lib/db";
import BrandModel, { NewBrand } from "@/app/models/BrandeModel";
import ProductModel, { NewProduct } from "@/app/models/ProductModel";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const getCloudConfig = async () => {
  return {
    name: process.env.CLOUD_NAME!,
    key: process.env.CLOUD_API_KEY!,
  };
};

// generate our cloud signature
export const getCloudSignature = async () => {
  const secret = cloudinary.config().api_secret!;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp }, secret);

  return { timestamp, signature };
};

export const createProduct = async (info: NewProduct) => {
  try {
    await startDb();
    await ProductModel.create({ ...info });
  } catch (error) {
    console.log((error as any).message);
    throw new Error("Something went wrong, can not create product!");
  }
};

export const createBrand = async (info: NewBrand) => {
  try {
    await startDb();
    await BrandModel.create({ ...info });
  } catch (error) {
    console.log((error as any).message);
    throw new Error("Something went wrong, can not create brand!");
  }
};
