"use client";
import React from "react";
import HorizontalMenu from "./HorizontalMenu";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/helper";
import { CardHeader, Chip } from "@material-tailwind/react";

interface Props {
  products: {
    id: string;
    title: string;
    thumbnail: string;
    price: {
      base: number;
      discounted: number;
    };
    sale: number;
  }[];
}

export default function SimilarProductsList({ products }: Props) {
  return (
    <div className="py-6 w-full mt-6">
      <h1 className="font-semibold text-lg mb-4 text-blue-gray-600">
        Also you may like
      </h1>
      <HorizontalMenu>
        {products.map((product) => {
          return (
            <Link href={`/${product.title}/${product.id}`} key={product.id}>
              <div className="w-[200px] space-y-2 mr-4">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="relative w-full aspect-square m-0 overflow-hidden"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    objectFit="contain"
                  />
                  {product.price.base > 0 ? (
                    <div className="absolute right-0 p-2">
                      <Chip color="red" value={`${product.sale}% off`} />
                    </div>
                  ) : null}
                </CardHeader>
                <div>
                  <h2 className="text-sm line-clamp-3">{product.title}</h2>
                  <h2>{formatPrice(product.price.discounted)}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </HorizontalMenu>
    </div>
  );
}
