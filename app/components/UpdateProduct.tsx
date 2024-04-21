"use client";
import React from "react";
import ProductForm, { InitialValue } from "./ProductForm";
import { ProductResponse } from "../types";
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
  return <ProductForm initialValue={initialValue} />;
}
