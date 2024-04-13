import EmailVerificationToken from "@models/emailVerification";
import { NewUserRequest } from "@/app/types";
import startDb from "@lib/db";
import UserModel from "@models/userModel";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  const newUser = await UserModel.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  const token = crypto.randomBytes(36).toString("hex");
  EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fce70f504bc08a",
      pass: "89c27ee828139c",
    },
  });

  const verificationUrl = `http://localhost:4000/verify?token=${token}&userId=${newUser._id}`;

  transport.sendMail({
    from: "verification@infinitygear.com",
    to: newUser.email,
    html: `<h1>Please verify your email by clicking on <a href="${verificationUrl}">This link</a>`,
  });

  return NextResponse.json(newUser);
};
