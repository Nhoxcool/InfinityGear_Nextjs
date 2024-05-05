"use client";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function EmailVerficationBanner() {
  const [submitting, setSubmitting] = useState(false);
  const { profile } = useAuth();

  const applyForReverification = async () => {
    if (!profile) return;

    setSubmitting(true);
    const res = await fetch("/api/users/verify?userId=" + profile?.id, {
      method: "GET",
    });
    const { message, error } = await res.json();
    if (!res.ok && error) {
      toast.error(error);
    }

    toast.success(message);
    setSubmitting(false);
  };

  if (profile?.verified) return null;

  return (
    <div className="p-1 text-center bg-blue-50">
      <span>It looks like you havent verified your email.</span>

      <button
        disabled={submitting}
        onClick={applyForReverification}
        className="ml-2 font-semibold underline"
      >
        {submitting ? "Generating link..." : "Get verification link."}
      </button>
    </div>
  );
}
