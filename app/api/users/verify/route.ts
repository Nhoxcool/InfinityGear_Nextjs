import EmailVerificationToken from "@/app/models/emailVerification";
import UserModel from "@/app/models/userModel";
import { EmailVerifyRequest } from "@/app/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { token, userId } = (await req.json()) as EmailVerifyRequest;

    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json(
        { error: "Invalid request, userid and token is required!" },
        { status: 401 }
      );
    }

    const verifyToken = await EmailVerificationToken.findOne({ user: userId });

    if (!verifyToken) {
      return NextResponse.json({ error: "Invalid token!" }, { status: 401 });
    }

    const isMatched = await verifyToken.compareToken(token);

    if (!isMatched) {
      return NextResponse.json(
        { error: "Invalid token, token doesn't match! " },
        { status: 401 }
      );
    }

    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(verifyToken._id);

    return NextResponse.json({ message: "Your Email is Verified!" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not verified email, something went wrong!",
      },
      { status: 500 }
    );
  }
};
