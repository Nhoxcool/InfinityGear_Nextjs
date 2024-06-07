"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure(
      (window.CRISP_WEBSITE_ID = "b6883c1e-efbb-4ed1-87ca-b1eda6e561a3")
    );
  });

  return null;
};

export default CrispChat;
