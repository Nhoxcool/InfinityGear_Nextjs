import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import EmailVerificationBanner from "../components/EmailVerficationBanner";
import Navbar from "../components/navbar";
import { BackToTopButton } from "../components/BackToTopButton";
import Footer from "../components/footer";

interface Props {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  const session = await auth();
  if (!session) return redirect("/auth/signin");

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4 xl:p-0">
        <Navbar />

        {children}
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}
