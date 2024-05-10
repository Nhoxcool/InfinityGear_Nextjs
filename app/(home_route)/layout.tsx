import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { BackToTopButton } from "../components/BackToTopButton";

interface Props {
  children: ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto xl:p-0 p-4">
        <Navbar />
        {children}
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}
