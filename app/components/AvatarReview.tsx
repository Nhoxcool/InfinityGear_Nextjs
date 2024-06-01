"use client";
import { Avatar } from "@material-tailwind/react";
import React from "react";

interface Props {
  avatar?: string;
  title: string;
}

export default function AvatarReview({ avatar, title }: Props) {
  return (
    <div>
      <Avatar
        variant="circular"
        size="sm"
        alt={title}
        src={
          avatar ||
          "https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain"
        }
      />
    </div>
  );
}
