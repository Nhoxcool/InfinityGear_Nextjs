import BrandTable, { Brand } from "@/app/components/BrandTable";
import ProductTable, { Product } from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import React from "react";

const fetchBrandes = async (
  pageNo: number,
  perPage: number
): Promise<Brand[]> => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const brands = await BrandModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);
  return brands.map((brands) => {
    return {
      id: brands._id.toString(),
      category: brands.category,
      brand: brands.brand,
      logo: brands.logo.url,
    };
  });
};

export default async function Brandes() {
  const brands = await fetchBrandes(1, 10);
  return (
    <div>
      <BrandTable brands={brands} />
    </div>
  );
}
