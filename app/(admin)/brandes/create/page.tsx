"use client";
import BrandForm from "@/app/components/BrandForm";
import { NewBrandInfo } from "@/app/types";
import { uploadImage } from "@/app/utils/helper";
import { newBrandInfoSchema } from "@/app/utils/validationSchema";
import React from "react";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import { checkBrand, createBrand } from "../../products/action";

export default function Create() {
  const handleCreateBrand = async (values: NewBrandInfo) => {
    try {
      const { logo, brand, category } = values;

      await newBrandInfoSchema.validate(values, { abortEarly: false });
      const check = await checkBrand(brand, category);

      if (!check) return toast.error("Both brand and category already exist!");

      const logoRes = await uploadImage(logo!);
      await createBrand({
        ...values,
        logo: logoRes,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <div>
      <BrandForm onSubmit={handleCreateBrand} />
    </div>
  );
}
