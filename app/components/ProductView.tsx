import React from "react";
import BuyingOptions from "@components/BuyingOptions";
import { formatPrice } from "../utils/helper";
import ProductImageGallery from "@components/ProductImageGallery";
import Rating from "./Rating";

interface Props {
  title: string;
  description: string;
  images: string[];
  points?: string[];
  price: { base: number; discounted: number };
  sale: number;
  brand: string;
  category: string;
  rating: number;
  outOfstock: boolean;
  isWishlist?: boolean;
}

export default function ProductView({
  description,
  images,
  title,
  points,
  price,
  sale,
  brand,
  category,
  rating,
  outOfstock,
  isWishlist,
}: Props) {
  return (
    <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
      <div className="flex-1 lg:self-start self-center ">
        {/* Product Image Slider */}
        <ProductImageGallery images={images} />
      </div>

      <div className="flex-1 md:space-y-4 space-y-2">
        <h1 className="md:text-3xl text-xl font-semibold">{title}</h1>
        <p className="font-semibold">
          Category:{" "}
          <span className="text-xl text-blue-700 ml-3"> {category}</span>
        </p>
        <p className="font-semibold">
          Brand: <span className="text-xl text-blue-700 ml-3"> {brand}</span>
        </p>
        <p>{description}</p>

        <div className="pl-4 space-y-2">
          {points?.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </div>

        {rating ? (
          <Rating value={parseFloat(rating.toFixed(1))} />
        ) : (
          <Rating value={0} />
        )}

        <div className="flex items-center space-x-2 mb-2">
          {price.base > 0 && (
            <p className="line-through text-xl">{formatPrice(price.base)}</p>
          )}
          <p className="font-semibold text-xl">
            {formatPrice(price.discounted)}
          </p>
          {price.base > 0 && (
            <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
              {`${sale}% off`}
            </p>
          )}
        </div>
        <div className="flex py-4">
          <BuyingOptions wishlist={isWishlist} outOfstock={outOfstock} />
        </div>
      </div>
    </div>
  );
}
