import React from "react";
import NavUI from "./NavUi";
import { auth } from "@/auth";
import CartModel from "@/app/models/CartModel";
import { Types } from "mongoose";

const getCartItemsCount = async () => {
  try {
    const session = await auth();
    if (!session?.user) return 0;

    const userId = session.user.id;

    const cart = await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$_id",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
    ]);

    if (cart.length) {
      return cart[0].totalQuantity;
    } else {
      return 0;
    }
  } catch (error) {
    console.log("Error while fetching cart items count: ", error);
    return 0;
  }
};

export default async function Navbar() {
  const cartItemsCount = await getCartItemsCount();
  return (
    <div>
      <NavUI cartItemsCount={cartItemsCount} />
    </div>
  );
}
