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
  const brandes = await BrandModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);
  return brandes.map((brandes) => {
    return {
      id: brandes._id.toString(),
      category: brandes.category,
      brand: brandes.brand,
      logo: brandes.logo.url,
    };
  });
};

export default async function Brandes() {
  const brandes = await fetchBrandes(1, 10);
  return (
    <div>
      <BrandTable brandes={brandes} />
    </div>
  );
}
