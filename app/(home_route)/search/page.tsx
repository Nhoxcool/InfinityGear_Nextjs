import CategoryMenu from "@/app/components/CategoryMenu";
import GridView from "@/app/components/GridView";
import ProductCard, { Product } from "@/app/components/ProductCard";
import SearchFilter from "@/app/components/SearchFilter";
import startDb from "@/app/lib/db";
import ProductModel, { ProductDocument } from "@/app/models/ProductModel";
import { FilterQuery } from "mongoose";
import React from "react";

type options = {
  query: string;
  priceSort?: "asc" | "desc";
  maxRating?: number;
  minRating?: number;
};

interface Props {
  searchParams: options;
}

const searchProducts = async (options: options) => {
  const { query, maxRating, minRating, priceSort } = options;
  await startDb();

  const filter: FilterQuery<ProductDocument> = {
    title: { $regex: query, $options: "i" },
  };

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
      brand: product.brand,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
      rating: product.rating,
    };
  });

  return JSON.stringify(productList);
};

export default async function Search({ searchParams }: Props) {
  const { maxRating, minRating } = searchParams;

  const results = JSON.parse(
    await searchProducts({
      ...searchParams,
      maxRating: maxRating ? +maxRating : undefined,
      minRating: minRating ? +minRating : undefined,
    })
  ) as Product[];

  const noProducts = !results.length;

  return (
    <div className="mt-9 py-4">
      <CategoryMenu />
      <SearchFilter>
        {noProducts ? (
          <h1 className="text-lg font-semibold text-blue-gray-500 text-center">
            No Product Found
          </h1>
        ) : (
          <GridView>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </GridView>
        )}
      </SearchFilter>
    </div>
  );
}
