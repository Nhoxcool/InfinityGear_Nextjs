import dynamic from "next/dynamic";
import { ReactNode } from "react";

const CrispWithNoSSR = dynamic(() => import("./crisp"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CrispWithNoSSR />
        {children}
      </body>
    </html>
  );
}
