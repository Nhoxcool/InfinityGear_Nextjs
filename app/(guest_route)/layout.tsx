import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RootLayout from "../components/layout";

interface Props {
  children: ReactNode;
}

export default async function Guestayout({ children }: Props) {
  const session = await auth();
  if (session) return redirect("/");
  return (
    <div>
      <Navbar />
      <RootLayout>{children}</RootLayout>
      <Footer />
    </div>
  );
}
