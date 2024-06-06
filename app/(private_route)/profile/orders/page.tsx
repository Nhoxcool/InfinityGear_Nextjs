import OrderListPublic, { Orders } from "@/app/components/OrderListPublic";
import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const fetchOrders = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  await startDb();
  const order = await OrderModel.find({ userId: session.user.id }).sort(
    "-createdAt"
  );
  const result: Orders[] = order.map((order) => {
    return {
      id: order._id.toString(),
      paymentStatus: order.paymentStatus,
      date: order.createdAt.toString(),
      total: order.totalAmount,
      deliveryStatus: order.deliveryStatus,
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

export default async function Order() {
  const result = await fetchOrders();
  if (!result) {
    return redirect("/404");
  }
  return (
    <div>
      <div className="mb-4 py-4">
        <h1 className="text-2xl font-semibold">Your Order Details</h1>
        <hr />
      </div>
      <OrderListPublic orders={JSON.parse(result)} />
    </div>
  );
}
