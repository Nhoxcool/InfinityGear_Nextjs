import { Brand } from "@/app/components/BrandTable";
import ProductTable, { Product } from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import ProductModel from "@/app/models/ProductModel";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async (
  pageNo: number,
  perPage: number
): Promise<Product[]> => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const products = await ProductModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);
  return products.map((products) => {
    return {
      id: products._id.toString(),
      title: products.title,
      thumbnail: products.thumbnail.url,
      description: products.description,
      price: {
        mrp: products.price.base,
        salePrice: products.price.discounted,
        saleOff: products.sale,
      },
      category: products.category,
      brand: products.brand,
      quantity: products.quantity,
    };
  });
};


const PRODUCTS_PER_PAGE = 10;

interface Props {
  searchParams: { page: string };
}

export default async function Products({ searchParams }: Props) {
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  const products = await fetchProducts(+page, PRODUCTS_PER_PAGE);
  let hasMore = true;
  if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
  else hasMore = true;
  return (
    <div>
      <ProductTable
        products={products}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
