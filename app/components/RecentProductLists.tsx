"use client";
import React from "react";
import HorizontalMenu from "./HorizontalMenu";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/helper";
import { CardHeader, Chip, Typography } from "@material-tailwind/react";
import truncate from "truncate";
import Rating from "./Rating";

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
  rating: number;
}

interface Props {
  products?: Product[];
}

export default function RecentProductLists({ products }: Props) {
  return (
    <div className="py-6 w-full mt-6">
      <h1 className="font-semibold text-lg mb-4 text-blue-gray-600">
        Recent Products
      </h1>
      <HorizontalMenu>
        {products ? (
          products.map((product) => {
            return (
              <Link href={`/${product.title}/${product.id}`} key={product.id}>
                <div className="w-[200px] space-y-2 mr-11">
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
                    <div className="mb-2">
                      <h3 className="line-clamp-1 font-medium text-blue-gray-800">
                        {truncate(product.title, 50)}
                      </h3>
                      <div className="flex justify-end">
                        {product.rating ? (
                          <Rating
                            value={parseFloat(product.rating.toFixed(1))}
                          />
                        ) : (
                          <Rating value={0} />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end items-center space-x-2 mb-2 mr-5">
                      {product.price.base > 0 ? (
                        <Typography
                          color="blue-gray"
                          className="font-medium line-through"
                        >
                          {formatPrice(product.price.base)}
                        </Typography>
                      ) : null}
                      <Typography color="blue" className="font-medium">
                        {formatPrice(product.price.discounted)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </HorizontalMenu>
    </div>
  );
}
