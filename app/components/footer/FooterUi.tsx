'use client';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

export function FooterUi() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow"></main>
      <footer className="w-full p-8 bg-gray-900 text-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-y-6 md:gap-x-12 text-center md:justify-between">
          <Typography
            variant="h3"
            href="/"
            as="a"
            className="items-center flex flex-row"
          >
            <Image
              width={80}
              height={80}
              src="/image/logo_only.png"
              alt="logo image"
            />
            Infinity Gear
          </Typography>
          <ul className="flex flex-col md:flex-row items-center gap-y-2 md:gap-x-8">
            <li>
              <Typography
                as="a"
                href="#"
                color="white"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="white"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="white"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="white"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
        <div className="flex pt-5 gap-6 flex-row-reverse justify-center md:justify-start">
          <Typography as="a" href="#">
            <Image
              width={40}
              height={40}
              src="/image/linkedin.png"
              alt="logo image"
            />
          </Typography>
          <Typography as="a" href="#">
            <Image
              width={40}
              height={40}
              src="/image/twitter.png"
              alt="logo image"
            />
          </Typography>
          <Typography as="a" href="#">
            <Image
              width={40}
              height={40}
              src="/image/instagram.png"
              alt="logo image"
            />
          </Typography>
          <Typography as="a" href="#">
            <Image
              width={40}
              height={40}
              src="/image/facebook.png"
              alt="logo image"
            />
          </Typography>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="white" className="text-center font-normal">
          &copy; 2024 InfinityGear All Rights Reserved
        </Typography>
      </footer>
    </div>
  );
}
