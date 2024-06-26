import React, { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  XMarkIcon,
  RectangleGroupIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@app/types";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { CategoryItems } from "../utils/categoriesItems";
import SearchForm from "./SearchForm";

interface Props {
  open: boolean;
  onClose(): void;
  menuItems: MenuItems[];
}

export function MobileNav({ open, onClose, menuItems }: Props) {
  const { isAdmin, loggedIn } = useAuth();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  return (
    <>
      <Drawer open={open} onClose={onClose}>
        <div className="mb-2 flex items-center justify-between p-4 z-50">
          <div className="flex flex-row items-center">
            <Image
              width={50}
              height={50}
              src="/image/logo_only.png"
              alt="logo image"
            />
            <Typography variant="h5" color="blue-gray">
              InfinityGear
            </Typography>
          </div>

          <IconButton variant="text" color="blue-gray" onClick={onClose}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="flex justify-center">
          <div className="md:block w-64">
            <SearchForm submitTo="/search?query=" />
          </div>
        </div>

        <List>
          {menuItems.map(({ href, icon, label }) => {
            return (
              <Link key={href} href={href}>
                <ListItem onClick={onClose}>
                  <ListItemPrefix>{icon}</ListItemPrefix>
                  {label}
                </ListItem>
              </Link>
            );
          })}

          {isAdmin && (
            <Link href="/dashboard">
              <ListItem onClick={onClose}>
                <ListItemPrefix>
                  <RectangleGroupIcon className="h-4 w-4" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
          )}

          <Accordion
            open={categoryDropdownOpen === true}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  categoryDropdownOpen === true ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={categoryDropdownOpen === true}>
              <AccordionHeader
                onClick={() => toggleCategoryDropdown()}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ArchiveBoxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Product Category
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                {CategoryItems.map(({ href, icon, label }) => {
                  return (
                    <Link key={href} href={href}>
                      <ListItem onClick={onClose}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        <ListItemPrefix>{icon}</ListItemPrefix>
                        {label}
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </AccordionBody>
          </Accordion>

          {loggedIn ? (
            <SignOutButton>
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Sign Out
              </ListItem>
            </SignOutButton>
          ) : (
            <div className="flex items-cente flex-col mt-10 gap-10">
              <Link
                className="px-4 py-1 flex-1 text-center"
                href="/auth/signin"
              >
                Sign in
              </Link>
              <Link
                className="bg-blue-500 text-white px-4 py-1 rounded flex-1 text-center focus:bg-blue-700"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </div>
          )}
        </List>
      </Drawer>
    </>
  );
}
