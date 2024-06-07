"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b6883c1e-efbb-4ed1-87ca-b1eda6e561a3");
  }, []); // Ensure this runs only once on mount

  return null;
};

export default CrispChat;
