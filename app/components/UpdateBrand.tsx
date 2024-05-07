"use client";
import React from "react";
import { BrandResponse, BrandToUpdate, NewBrandInfo } from "../types";
import BrandForm, { InitialValue } from "./BrandForm";
import { updateBrandInfoSchema } from "../utils/validationSchema";
import { removeImageFromCloud, updateBrand } from "../(admin)/products/action";
import { uploadImage } from "../utils/helper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
interface Props {
  brand: BrandResponse;
}

export default function UpdateBrand({ brand }: Props) {
  const router = useRouter();
  const initialValue: InitialValue = {
    ...brand,
    logo: brand.logo.url,
  };

  const handleOnSubmit = async (values: NewBrandInfo) => {
    try {
      const { logo } = values;
      await updateBrandInfoSchema.validate(values, { abortEarly: false });

      const dataToUpdate: BrandToUpdate = {
        brand: values.brand,
        category: values.category,
      };

      if (logo) {
        await removeImageFromCloud(brand.logo.id);
        const { id, url } = await uploadImage(logo);
        dataToUpdate.logo = { id, url };
      }

      // update our product
      updateBrand(brand.id, dataToUpdate);
      toast.success("Brand Update Successfully");
      router.refresh();
      router.back();
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return <BrandForm initialValue={initialValue} onSubmit={handleOnSubmit} />;
}
