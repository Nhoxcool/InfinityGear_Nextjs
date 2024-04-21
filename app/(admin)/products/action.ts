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

export const checkProduct = async (title: string) => {
  try {
    await startDb();
    const existingProduct = await ProductModel.findOne({
      title: title,
    });

    if (existingProduct) {
      return false;
    }
    return true;
  } catch (error) {
    console.log((error as any).message);
    throw new Error("Something went wrong, can not create product!");
  }
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

export const checkBrand = async (brand: string, category: string) => {
  try {
    await startDb();
    const existingBrand = await BrandModel.findOne({
      brand: brand,
      category: category,
    });

    if (existingBrand) {
      return false;
    }
    return true;
  } catch (error) {
    console.log((error as any).message);
    throw new Error("Something went wrong, can not create brand!");
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

export const removeImageFromCloud = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

export const removeAndUpdateProductImage = async (
  id: string,
  publicId: string
) => {
  const { result } = await cloudinary.uploader.destroy(publicId);

  try {
    if (result === "ok") {
      await startDb();
      await ProductModel.findByIdAndUpdate(id, {
        $pull: { images: { id: publicId } },
      });
    }
  } catch (error) {
    console.log(
      "Error while removing image from cloud: ",
      (error as any).message
    );
    throw error;
  }
};
