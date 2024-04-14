import startDb from "@/app/lib/db";
import PasswordResetTokenModel from "@/app/models/passwordResetTokenModel";
import UserModel from "@/app/models/userModel";
import { UpdatePasswordRequest } from "@/app/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  try {
    const { password, token, userId } =
      (await req.json()) as UpdatePasswordRequest;

    if (!password || !token || !isValidObjectId(userId))
      return NextResponse.json({ error: "Invalid request!" }, { status: 401 });

    await startDb();
    const resetToken = await PasswordResetTokenModel.findOne({ user: userId });
    if (!resetToken)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const matched = await resetToken.compareToken(token);
    if (!matched)
      return NextResponse.json(
        {
          error: "Unauthorized request!",
        },
        { status: 401 }
      );

    const user = await UserModel.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found!" }, { status: 404 });

    const isMatched = await user.comparePassword(password);
    if (isMatched) {
      return NextResponse.json(
        { error: "New Password must be different!" },
        { status: 401 }
      );
    }

    user.password = password;
    await user.save();

    await PasswordResetTokenModel.findByIdAndDelete(resetToken._id);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transport.sendMail({
      from: "verification@infinitygear.com",
      to: user.email,
      html: `<h1>Your password is now change</h1>`,
    });

    return NextResponse.json({ message: "Your password is now changed." });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not update password, something went wrong!",
      },
      { status: 500 }
    );
  }
};
