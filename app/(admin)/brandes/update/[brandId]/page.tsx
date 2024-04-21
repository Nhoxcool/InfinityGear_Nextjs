import UpdateBrand from "@/app/components/UpdateBrand";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    brandId: string;
  };
}

const fetchBrandInfo = async (brandId: string): Promise<string> => {
  if (!isValidObjectId(brandId)) return redirect("/404");

  await startDb();

  const brand = await BrandModel.findById(brandId);
  if (!brand) return redirect("/404");

  const finalBrand = {
    id: brand._id.toString(),
    logo: brand.logo,
    category: brand.category,
    brand: brand.brand,
  };

  return JSON.stringify(finalBrand);
};

export default async function UpdatePage(props: Props) {
  const { brandId } = props.params;
  const brand = await fetchBrandInfo(brandId);
  return <UpdateBrand brand={JSON.parse(brand)} />;
}
