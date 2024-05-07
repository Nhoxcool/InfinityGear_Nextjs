"use client";

import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "@components/CartCountUpdater";

export default function BuyingOptions() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  return (
    <div className="flex items-center space-x-2">
      <CartCountUpdater
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        value={quantity}
      />

      <Button variant="text" color="blue">
        Add to Cart
      </Button>
      <Button color="amber" className="rounded-full">
        Buy Now
      </Button>
    </div>
  );
}
