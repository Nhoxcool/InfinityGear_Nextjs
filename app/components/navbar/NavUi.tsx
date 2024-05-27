'use client';
import Link from 'next/link';
import React from 'react';
import {
  Navbar as MaterialNav,
  IconButton,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ProfileMenu from '../ProfileMenu';
import { MobileNav } from '../MobileNav';
import CartIcon from '../CartIcon';
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import useAuth from '@hooks/useAuth';
import Image from 'next/image';

interface Props {
  cartItemsCount: number;
  avatar?: string;
}

export const menuItems = [
  {
    href: '/profile',
    icon: <UserCircleIcon className="h-4 w-4" />,
    label: 'My Profile',
  },
  {
    href: '/profile/orders',
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    label: 'Orders',
  },
];

export default function NavUI({ cartItemsCount, avatar }: Props) {
  const [open, setOpen] = React.useState(false);
  const { loading, loggedIn } = useAuth();

  React.useEffect(() => {
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <MaterialNav className="mx-auto max-w-screen-xl px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div>
            <Link
              href="/"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-semibold flex flex-row items-center"
            >
              <Image
                width={50}
                height={50}
                src="/image/logo_only.png"
                alt="logo image"
              />
              <div>InfinityGear</div>
            </Link>
          </div>

          <div className="hidden lg:flex gap-2 items-center">
            <CartIcon cartItems={cartItemsCount} />
            {loggedIn ? (
              <ProfileMenu menuItems={menuItems} avatar={avatar} />
            ) : loading ? (
              <Spinner />
            ) : (
              <>
                <Link className="px-4 py-1 hover:underline" href="/auth/signin">
                  Sign in
                </Link>
                <Link
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                  href="/auth/signup"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <CartIcon cartItems={cartItemsCount} />

            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
      </MaterialNav>
      <div className="lg:hidden">
        <MobileNav
          menuItems={menuItems}
          onClose={() => setOpen(false)}
          open={open}
        />
      </div>
    </>
  );
}
