"use client";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  searchParams: { token: string; userId: string };
}

export default function Verify(props: Props) {
  const { token, userId } = props.searchParams;
  const router = useRouter();

  //verify the token and userId
  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
    }).then(async (res) => {
      const apiRes = await res.json();

      const { message, error } = apiRes as { message: string; error: string };

      if (res.ok) {
        console.log(message);
        router.replace("/");
      }

      if (!res.ok && error) {
        console.log(error);
      }
    });
  }, []);

  if (!token || !userId) return notFound();

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
}
