"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "@components/CartCountUpdater";
import { useParams, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Wishlist from "../ui/Wishlist";

interface Props {
  wishlist?: boolean;
  outOfstock: boolean;
}

export default function BuyingOptions({ wishlist, outOfstock }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { product } = useParams();
  const productId = product[1];
  const { loggedIn } = useAuth();
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const addToCart = async () => {
    if (!productId) return;

    if (!loggedIn) return router.push("/auth/signin");

    const res = await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);
    toast.success("Add to cart successfully");

    router.refresh();
  };

  const updateWishlist = async () => {
    if (!productId) return;

    if (!loggedIn) return router.push("/auth/signin");

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);

    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      {outOfstock ? (
        <div className="uppercase text-gray-700">Out of stock </div>
      ) : (
        <>
          {" "}
          <CartCountUpdater
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            value={quantity}
          />
          <Button
            onClick={() => {
              startTransition(async () => await addToCart());
            }}
            variant="text"
            color="blue"
            disabled={isPending}
          >
            Add to Cart
          </Button>
          <Button color="amber" className="rounded-full">
            Buy Now
          </Button>
        </>
      )}

      <Button
        onClick={() => {
          startTransition(async () => await updateWishlist());
        }}
        variant="text"
        color="blue"
        disabled={isPending}
      >
        <Wishlist isActive={wishlist} />
      </Button>
    </div>
  );
}
