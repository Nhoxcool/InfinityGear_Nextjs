import BrandTable from "@/app/components/BrandTable";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { query: string; page: number };
}

const searchBrands = async (query: string, pageNo: number, perPage: number) => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const brands = await BrandModel.find({
    brand: { $regex: query, $options: "i" },
  })
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  const results = brands.map(({ id, category, brand, logo }) => {
    return {
      id,
      category,
      brand,
      logo: logo.url,
    };
  });

  return JSON.stringify(results);
};

const BRANDS_PER_PAGE = 100;

export default async function AdminSearch({ searchParams }: Props) {
  const { query } = searchParams;
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  let hasMore = true;

  const results = JSON.parse(await searchBrands(query, +page, BRANDS_PER_PAGE));
  if (results.length < BRANDS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <BrandTable
        brands={results}
        showPageNavigator={false}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
