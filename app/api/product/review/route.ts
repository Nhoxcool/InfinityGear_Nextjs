import startDb from "@/app/lib/db";
import ReviewModel from "@/app/models/reviewModel";
import { ReviewRequeetBody } from "@/app/types";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "unauthorized request!" },
      { status: 401 }
    );
  }

  const { productId, comment, rating } =
    (await req.json()) as ReviewRequeetBody;

  if (!isValidObjectId(productId)) {
    return NextResponse.json({ error: "Invalid product id!" }, { status: 401 });
  }

  if (rating <= 0 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating!" }, { status: 401 });
  }

  const userId = session.user.id;

  const data = {
    userId,
    rating,
    comment,
    product: productId,
  };

  await startDb();
  await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
    upsert: true,
  });

  return NextResponse.json({ success: true }, { status: 201 });
};
