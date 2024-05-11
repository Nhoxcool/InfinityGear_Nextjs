"use client";
import { Avatar, Chip } from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import categories from "../utils/categories";
import Link from "next/link";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {
  Computer,
  SportsEsports,
  Laptop,
  Monitor,
  Mouse,
  Headset,
  Keyboard,
  EventSeat,
  TableChart,
  VideogameAsset,
  PhoneIphone,
  Build,
} from "@mui/icons-material";
type Category = (typeof categories)[number];

const categoryIcons: Record<Category, JSX.Element> = {
  PC: <Computer />,
  "Gaming PC": <SportsEsports />,
  Laptop: <Laptop />,
  "Gaming Laptop": <SportsEsports />,
  Monitor: <Monitor />,
  "Gaming Monitor": <SportsEsports />,
  Mouse: <Mouse />,
  "Gaming Mouse": <SportsEsports />,
  MousePad: <EventSeat />,
  HeadPhone: <Headset />,
  "Gaming HeadPhone": <SportsEsports />,
  Keyboard: <Keyboard />,
  "Gaming KeyBoard": <SportsEsports />,
  Chair: <EventSeat />,
  "Gaming Chair": <SportsEsports />,
  Table: <TableChart />,
  "Gaming Table": <SportsEsports />,
  "Gaming Console": <VideogameAsset />,
  "Handle Pc": <PhoneIphone />,
  accessories: <Build />,
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      className="px-2 transition"
      disabled={isFirstItemVisible}
      style={{ opacity: isFirstItemVisible ? "0" : "1" }}
      onClick={() => scrollPrev()}
    >
      <ChevronLeftIcon className="w-4 h-4" />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <button
      className="px-2 transition"
      style={{ opacity: isLastItemVisible ? "0" : "1" }}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <ChevronRightIcon className="w-4 h-4" />
    </button>
  );
}

export default function HorizontalMenu() {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto h-20">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {categories.map((c) => (
          <Link key={c} href={`/browse-products/${c}`}>
            <Chip
              color="blue"
              className="mr-2 h-10 hover:bg-blue-700 hover:text-white"
              variant="outlined"
              value={c}
              icon={<div className="m-auto">{categoryIcons[c]}</div>}
            ></Chip>
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
}
