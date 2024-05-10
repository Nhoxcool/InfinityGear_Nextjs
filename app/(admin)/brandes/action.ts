"use server";

import startDb from "@/app/lib/db";
import BrandModel, { NewBrand } from "@/app/models/BrandeModel";
import { BrandResponse, BrandToUpdate } from "@/app/types";
import { removeImageFromCloud } from "../products/action";

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

export const updateBrand = async (id: string, brandInfo: BrandToUpdate) => {
  try {
    await startDb();

    await BrandModel.findByIdAndUpdate(id, {
      ...brandInfo,
    });
  } catch (error) {
    console.log("Error while updating product, ", (error as any).message);
    throw error;
  }
};

export const deleteBrand = async (id: string) => {
  try {
    await startDb();
    const deleteBrand = (await BrandModel.findById(id)) as BrandResponse;

    removeImageFromCloud(deleteBrand?.logo.id);

    await BrandModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error while deleting brand, ", (error as any).message);
    throw error;
  }
};
