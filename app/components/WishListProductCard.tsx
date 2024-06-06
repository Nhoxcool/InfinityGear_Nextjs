"use client";
import Image from "next/image";
import React, { useTransition } from "react";
import { formatPrice } from "../utils/helper";
import { Button } from "@material-tailwind/react";
import Wishlist from "../ui/Wishlist";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
  };
}

export default function WishListProductCard({ product }: Props) {
  const [isPending, startTransition] = useTransition();
  const { id, thumbnail, price, title } = product;
  const router = useRouter();

  const updateWishlist = async () => {
    if (!id) return;

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);

    router.refresh();
  };

  return (
    <div className="flex space-x-4 items-center ">
      <Link
        className="relative w-[100px] h-[100px] flex-none"
        href={`/${title}/${id}`}
      >
        <Image src={thumbnail} layout="fill" objectFit="contain" alt={title} />
      </Link>
      <Link className="flex-1 h-full" href={`/${title}/${id}`}>
        <h1 className="text-lg text-blue-gray-700 font-semibold">{title}</h1>
        <p>{formatPrice(price)}</p>
      </Link>
      <Button
        onClick={() => {
          startTransition(async () => await updateWishlist());
        }}
        variant="text"
        color="blue"
        disabled={isPending}
      >
        <Wishlist isActive />
      </Button>
    </div>
  );
}
