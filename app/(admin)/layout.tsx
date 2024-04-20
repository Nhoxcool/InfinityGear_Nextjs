import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import AdminSidebar from "../components/AdminSidebar";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/");
  }

  const isAdmin = session.user?.role === "admin";

  if (!isAdmin) {
    return redirect("/auth/signin");
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
