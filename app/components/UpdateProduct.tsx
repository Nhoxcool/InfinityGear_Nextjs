"use client";
import React from "react";
import ProductForm, { InitialValue } from "./ProductForm";
import { ProductResponse } from "../types";
import { removeAndUpdateProductImage } from "../(admin)/products/action";
interface Props {
  product: ProductResponse;
}

export default function UpdateProduct({ product }: Props) {
  const initialValue: InitialValue = {
    ...product,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    mrp: product.price.base,
    salePrice: product.price.discounted,
    bulletPoints: product.bulletPoints || [],
  };

  const handleImageRemove = (source: string) => {
    const splitedData = source.split("/");
    const lastItem = splitedData[splitedData.length - 1];
    const publicId = lastItem.split(".")[0];
    removeAndUpdateProductImage(product.id, publicId);
  };

  return (
    <ProductForm
      onImageRemove={handleImageRemove}
      initialValue={initialValue}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
}
