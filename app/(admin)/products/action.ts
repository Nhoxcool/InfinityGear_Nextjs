"use server";

import { Brand } from "@/app/components/BrandTable";
import startDb from "@/app/lib/db";
import BrandModel, { NewBrand } from "@/app/models/BrandeModel";
import ProductModel, { NewProduct } from "@/app/models/ProductModel";
import ReviewModel from "@/app/models/reviewModel";
import {
  BrandResponse,
  BrandToUpdate,
  ProductResponse,
  ProductToUpdate,
} from "@/app/types";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
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

export const updateProduct = async (
  id: string,
  productInfo: ProductToUpdate
) => {
  try {
    await startDb();
    let images: typeof productInfo.images = [];
    if (productInfo.images) {
      images = productInfo.images;
    }
    delete productInfo.images;
    await ProductModel.findByIdAndUpdate(id, {
      ...productInfo,
      $push: { images },
    });
  } catch (error) {
    console.log("Error while updating product, ", (error as any).message);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await startDb();
    const deleteProduct = (await ProductModel.findById(id)) as ProductResponse;

    removeImageFromCloud(deleteProduct?.thumbnail.id);

    if (deleteProduct.images) {
      deleteProduct.images.map((image) => {
        removeImageFromCloud(image.id);
      });
    }

    await ProductModel.findByIdAndDelete(id);
    await ReviewModel.deleteMany({ product: id });
  } catch (error) {
    console.log("Error while deleting product, ", (error as any).message);
    throw error;
  }
};

type BrandResponse2 = {
  _id: string;
  brand: string;
  category: string;
  logo: string; // Adjust logo type to a direct string
};

export const fetchBrands = async (): Promise<Brand[]> => {
  await startDb();
  const brands = await BrandModel.find();
  return brands.map((brand) => {
    return {
      id: brand._id.toString(),
      category: brand.category,
      brand: brand.brand,
      logo: brand.logo.url,
    };
  });
};
