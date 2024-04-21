import ProductTable, { Product } from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/ProductModel";
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

export default async function Products() {
  const products = await fetchProducts(1, 10);
  return (
    <div>
      <ProductTable products={products} />
    </div>
  );
}
