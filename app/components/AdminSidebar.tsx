'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ShoppingBagIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import SignOutButton from '@components/SignOutButton';
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-black h-screen sticky top-0 w-64 p-10">
        <ul className="space-y-4 text-white">
          <li>
            <Link href="/">
              <div className="flex justify-center items-center">
                <Image
                  width={200}
                  height={200}
                  src="/image/logo_3.png"
                  alt="logo image"
                />
              </div>
            </Link>
          </li>

          <div className=" flex flex-col gap-7">
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/dashboard"
              >
                <Squares2X2Icon className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/users"
              >
                <UserGroupIcon className="w-4 h-4" />
                <span>Users</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/products"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span>Products</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/brandes"
              >
                <TagIcon className="w-4 h-4" />
                <span>Brands</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/products/featured/add"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Featured</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/sales"
              >
                <CurrencyDollarIcon className="w-4 h-4" />
                <span>Sales</span>
              </Link>
              <hr className="w-full " />
            </li>
            <li>
              <Link
                className="flex items-center space-x-1 hover:text-blue-700"
                href="/orders"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                <span>Orders</span>
              </Link>
              <hr className="w-full " />
            </li>
          </div>
        </ul>

        <div>
          <SignOutButton>
            <div className=" mx-auto p-3 bg-red-500 rounded-lg w-fit">
              <div className="cursor-pointer text-white ">Logout</div>
            </div>
          </SignOutButton>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
