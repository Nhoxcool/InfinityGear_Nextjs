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
    return NextResponse.json(
      { error: (error as any).message },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.comple") {
    // create new order
    // recount our stock
  }

  return NextResponse.json({});
};
