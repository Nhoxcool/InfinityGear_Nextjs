import React from "react";
import startDb from "../lib/db";
import ProductModel from "../models/ProductModel";
import ProductSlider from "../components/ProductSlider";
import Link from "next/link";
import FeaturedProductsSlider from "../components/FeaturedProductsSlider";
import FeaturedProductModel from "../models/featuredProduct";
import CategoryMenu from "../components/CategoryMenu";

export interface LatestProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
}
[];

const fetchLatestProducts = async () => {
  await startDb();
  const products = await ProductModel.find().sort("-createdAt").limit(20);

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

const fetchFeaturedProducts = async () => {
  await startDb();
  const products = await FeaturedProductModel.find().sort("-createdAt");

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      banner: product.banner.url,
      link: product.link,
      linkTitle: product.linkTitle,
    };
  });
};

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const parsedProducts = JSON.parse(latestProducts) as LatestProduct[];
  const featuredProduct = await fetchFeaturedProducts();

  return (
    <div className="py-4 space-y-4">
      <FeaturedProductsSlider products={featuredProduct} />
      <CategoryMenu />
      <div className="relative mt-5">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">NewProduct</h2>
          <Link
            className="text-black underline hover:text-blue-800 text-lg"
            href="/all-products"
          >
            Find More
          </Link>
        </div>
        <div className=" custom-slider min-h-[300px]">
          <ProductSlider products={parsedProducts} />
        </div>
      </div>
    </div>
  );
}
