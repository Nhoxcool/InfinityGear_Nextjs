"use client";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, {
  useEffect,
  useState,
  useTransition,
  ChangeEventHandler,
} from "react";
import ImageSelector from "@components/ImageSelector";
import { NewBrandInfo } from "../types";
import categories from "../utils/categories";

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewBrandInfo): void;
}

export interface InitialValue {
  id: string;
  logo: string;
  category: string;
  brand: string;
}

const defaultValue = {
  category: "",
  brand: "",
};

export default function BrandForm(props: Props) {
  const { onSubmit, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [logo, setLogoInfo] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [brandInfo, setBrandInfo] = useState({ ...defaultValue });
  const [logoSource, setLogoSource] = useState<string[]>();

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating" : "Update";
    return isPending ? "Creating" : "Create";
  };

  useEffect(() => {
    if (initialValue) {
      setBrandInfo({ ...initialValue });
      setLogoSource([initialValue.logo]);
      setIsForUpdate(true);
    }
  }, []);

  const onLogoChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setLogoInfo(file);
      setLogoSource([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="mb-2 text-xl">Add new Brand</h1>

      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...brandInfo, logo });
          })
        }
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3>logo</h3>
          <ImageSelector
            id="logo"
            images={logoSource}
            onChange={onLogoChange}
          />
        </div>

        <Input
          label="BrandName"
          value={brandInfo.brand}
          onChange={({ target }) =>
            setBrandInfo({ ...brandInfo, brand: target.value })
          }
        />

        <Select
          onChange={(category) => {
            if (category) setBrandInfo({ ...brandInfo, category });
          }}
          value={brandInfo.category}
          label="Select Category"
        >
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>

        <Button disabled={isPending} type="submit">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
