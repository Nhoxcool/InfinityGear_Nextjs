import React from "react";
import startDb from "../lib/db";
import ProductModel from "../models/ProductModel";
import ProductSlider from "../components/ProductSlider";
import Link from "next/link";

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
    };
  });

  return JSON.stringify(productList);
};

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const parsedProducts = JSON.parse(latestProducts) as LatestProduct[];

  return (
    <div className="relative mt-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">NewProduct</h2>
        <Link
          className="text-black underline hover:text-blue-800 text-lg"
          href="/"
        >
          Find More
        </Link>
      </div>
      <ProductSlider latestProducts={parsedProducts} />
    </div>
  );
}
