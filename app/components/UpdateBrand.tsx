"use client";
import React from "react";
import { BrandResponse } from "../types";
import BrandForm, { InitialValue } from "./BrandForm";
interface Props {
  brand: BrandResponse;
}

export default function UpdateBrand({ brand }: Props) {
  const initialValue: InitialValue = {
    ...brand,
    logo: brand.logo.url,
  };
  return <BrandForm initialValue={initialValue} />;
}
