import BrandTable, { Brand } from "@/app/components/BrandTable";
import ProductTable, { Product } from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import { redirect } from "next/navigation";
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

const BRANDS_PER_PAGE = 5;

interface Props {
  searchParams: { page: string };
}

export default async function Brandes({ searchParams }: Props) {
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  const brands = await fetchBrandes(+page, BRANDS_PER_PAGE);
  let hasMore = true;

  if (brands.length < BRANDS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <BrandTable brands={brands} currentPageNo={+page} hasMore={hasMore} />
    </div>
  );
}
