import CartItems from "@/app/components/CartItems";
import startDb from "@/app/lib/db";
import CartModel from "@/app/models/CartModel";
import { auth } from "@/auth";
import { Types } from "mongoose";
import React from "react";
import { string } from "yup";

const fetchCartProducts = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  await startDb();
  const [cartItems] = await CartModel.aggregate([
    { $match: { userId: new Types.ObjectId(session.user.id) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" },
        totalQty: { $sum: "$items.quantity" },
        products: {
          id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
          thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
          title: { $arrayElemAt: ["$product.title", 0] },
          price: { $arrayElemAt: ["$product.price.discounted", 0] },
          qty: "$items.quantity",
          totalPrice: {
            $multiply: [
              "$items.quantity",
              { $arrayElemAt: ["$product.price.discounted", 0] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        id: { $first: "$id" },
        totalQty: { $sum: "$totalQty" },
        totalPrice: { $sum: "$products.totalPrice" },
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        totalQty: 1,
        totalPrice: 1,
        products: 1,
      },
    },
  ]);

  return cartItems;
};

export default async function Cart() {
  const cart = await fetchCartProducts();
  if (!cart) return <div>Not found</div>;

  return (
    <CartItems
      cartTotal={cart.totalPrice}
      cartId={cart.id}
      products={cart.products}
      totalQty={cart.totalQty}
    />
  );
}
