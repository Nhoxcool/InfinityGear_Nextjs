"use client";
import Link from "next/link";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ShoppingBagIcon,
  TagIcon,
  UserGroupIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "@components/SignOutButton";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex font-semibold h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#51AFFF] w-64 p-4 sm:p-6 lg:p-10 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <ul className="space-y-4 text-white">
          <li>
            <Link href="/">
              <div className="flex justify-center items-center">
                <Image
                  width={100}
                  height={100}
                  src="/image/logo_3.png"
                  alt="logo image"
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48"
                />
              </div>
            </Link>
          </li>

          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-7">
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/dashboard"
                onClick={() => setSidebarOpen(false)}
              >
                <Squares2X2Icon className="w-5 h-5 text-white" />
                <span>Dashboard</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/users"
                onClick={() => setSidebarOpen(false)}
              >
                <UserGroupIcon className="w-5 h-5 text-white" />
                <span>Users</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/products"
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingCartIcon className="w-5 h-5 text-white" />
                <span>Products</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/brandes"
                onClick={() => setSidebarOpen(false)}
              >
                <TagIcon className="w-5 h-5 text-white" />
                <span>Brands</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/products/featured/add"
                onClick={() => setSidebarOpen(false)}
              >
                <SparklesIcon className="w-5 h-5 text-white" />
                <span>Featured</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/sales"
                onClick={() => setSidebarOpen(false)}
              >
                <CurrencyDollarIcon className="w-5 h-5 text-white" />
                <span>Sales</span>
              </Link>
              <hr className="w-full" />
            </li>
            <li>
              <Link
                className="flex items-center space-x-2 hover:text-blue-700"
                href="/orders"
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBagIcon className="w-5 h-5 text-white" />
                <span>Orders</span>
              </Link>
              <hr className="w-full" />
            </li>
          </div>
        </ul>

        <div>
          <SignOutButton>
            <div className="mx-auto">
              <div className="cursor-pointer text-white flex flex-row items-center gap-2 hover:text-red-500">
                <PowerIcon className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </div>
          </SignOutButton>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto lg:ml-64">
        {/* Burger Menu */}
        <div className="lg:hidden">
          <button
            className="text-blue-500 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <div className="flex py-4">
                <p>Admin SideBar</p>
                <Bars3Icon className="w-6 h-6 text-blue-500" />
              </div>
            ) : (
              <div className="flex py-4">
                <p>Admin SideBar</p>
                <Bars3Icon className="w-6 h-6 text-blue-500" />
              </div>
            )}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
