"use client";
import React from "react";
import HorizontalMenu from "./HorizontalMenu";
import categories from "../utils/categories";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import {
  Build,
  Computer,
  EventSeat,
  Headset,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  PhoneIphone,
  SportsEsports,
  TableChart,
  VideogameAsset,
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

export default function CategoryMenu() {
  return (
    <HorizontalMenu>
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
    </HorizontalMenu>
  );
}
