"use client";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function EmailVerficationBanner() {
  const { profile } = useAuth();

  if (profile?.verified) return null;

  return (
    <div className="p-1 text-center bg-blue-50">
      <span>It looks like you haven't verified your email.</span>

      <button className="ml-2 font-semibold underline">
        Get verification link.
      </button>
    </div>
  );
}
