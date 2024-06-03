import ProductTable from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/ProductModel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { query: string; page: number };
}

const searchProducts = async (
  query: string,
  pageNo: number,
  perPage: number
) => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const products = await ProductModel.find({
    title: { $regex: query, $options: "i" },
  })
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  const results = products.map(
    ({
      _id,
      title,
      price,
      thumbnail,
      description,
      sale,
      category,
      brand,
      quantity,
    }) => {
      return {
        id: _id.toString(),
        title: title,
        thumbnail: thumbnail.url,
        description,
        price: {
          mrp: price.base,
          salePrice: price.discounted,
          saleOff: sale,
        },
        category,
        brand,
        quantity,
      };
    }
  );

  return JSON.stringify(results);
};

const PRODUCTS_PER_PAGE = 100;

export default async function AdminSearch({ searchParams }: Props) {
  const { query } = searchParams;
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  let hasMore = true;

  const results = JSON.parse(
    await searchProducts(query, +page, PRODUCTS_PER_PAGE)
  );
  if (results.length < PRODUCTS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <ProductTable
        products={results}
        showPageNavigator={false}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
