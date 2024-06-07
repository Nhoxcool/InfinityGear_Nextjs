import React from "react";
import startDb from "@lib/db";

import GridView from "@components/GridView";
import ProductCard from "@components/ProductCard";
import ProductModel, { ProductDocument } from "@/app/models/ProductModel";
import CategoryMenu from "@/app/components/CategoryMenu";
import SearchFilter from "@/app/components/SearchFilter";
import SearchFilterCatogriesPage from "@/app/components/SearchFilterCatogriesPage";
import { FilterQuery } from "mongoose";
import SearchFilterAllProductsPage from "@/app/components/SearchFilterAllProductsPage";

interface LatestProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  brand: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
  quantity: number;
}

type Options = {
  priceSort?: "asc" | "desc";
  maxRating?: number;
  minRating?: number;
};

const fetchProductsByCategory = async (options: Options): Promise<string> => {
  const { maxRating, minRating, priceSort } = options;
  await startDb();

  const filter: FilterQuery<ProductDocument> = {};

  if (typeof minRating === "number" && typeof maxRating === "number") {
    const mindCondition = minRating >= 0;
    const maxCondition = maxRating <= 5;
    if (mindCondition && maxCondition) {
      filter.rating = { $gte: minRating, $lte: maxRating };
    }
  }

  const products = await ProductModel.find({
    ...filter,
  }).sort({ "price.discounted": priceSort === "asc" ? 1 : -1 });

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
      rating: product.rating,
      quantity: product.quantity,
    };
  });

  return JSON.stringify(productList);
};

interface Props {
  params: { category: string };
  searchParams: Options;
}

export default async function ProductByCategory({
  params,
  searchParams,
}: Props) {
  const { maxRating, minRating } = searchParams;

  const products = await fetchProductsByCategory({
    ...searchParams,
    maxRating: maxRating ? +maxRating : undefined,
    minRating: minRating ? +minRating : undefined,
  });
  const parsedProducts = JSON.parse(products) as LatestProduct[];

  return (
    <div className="py-4 space-y-4">
      <CategoryMenu />
      <SearchFilterAllProductsPage>
        {parsedProducts.length ? (
          <GridView>
            {parsedProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </GridView>
        ) : (
          <h1 className="text-center pt-10 font-semibold text-2xl opacity-40">
            Sorry there are no products in this category!
          </h1>
        )}
      </SearchFilterAllProductsPage>
    </div>
  );
}
