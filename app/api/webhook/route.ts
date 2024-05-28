import Product from "@/app/(home_route)/[...product]/page";
import CartItems from "@/app/components/CartItems";
import { getCartItems } from "@/app/lib/cartHelper";
import CartModel from "@/app/models/CartModel";
import ProductModel from "@/app/models/ProductModel";
import OrderModel from "@/app/models/orderModel";
import { StripeCustomer } from "@/app/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SERECT_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2022-11-15",
});

export const POST = async (req: Request) => {
  const data = await req.text();

  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = await stripe.webhooks.constructEvent(
      data,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as any).message },
      {
        status: 400,
      }
    );
  }
  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as {
      customer: string;
      payment_intent: string;
      amount_subtotal: number;
      customer_details: any;
      payment_status: string;
    };

    const customer = (await stripe.customers.retrieve(
      stripeSession.customer
    )) as unknown as StripeCustomer;

    const { cartId, userId, type } = customer.metadata;
    const { address, email, name } = stripeSession.customer_details;

    // create new order
    if (type === "checkout") {
      const cartItems = await getCartItems(userId, cartId);
      await OrderModel.create({
        userId,
        stripeCustomerId: stripeSession.customer,
        paymentIntent: stripeSession.payment_intent,
        totalAmount: stripeSession.amount_subtotal / 100,
        shippingDetails: {
          address: {
            ...address,
            state: address.state || "N/A", // Ensure state is provided or default to "N/A"
          },
          email,
          name,
        },
        paymentStatus: stripeSession.payment_status,
        deliveryStatus: "ordered",
        orderItems: cartItems.products,
      });
      // recount stock
      const updateProductPromise = cartItems.products.map(async (product) => {
        return await ProductModel.findByIdAndUpdate(product.id, {
          $inc: { quantity: -product.qty },
        });
      });

      await Promise.all(updateProductPromise);

      // remove the cart
      await CartModel.findByIdAndDelete(cartId);
    }
  }

  return NextResponse.json({});
};
