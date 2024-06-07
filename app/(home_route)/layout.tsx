import { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { BackToTopButton } from "../components/BackToTopButton";
import RootLayout from "../components/layout";

interface Props {
  children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <RootLayout>
      <div className="max-w-screen-xl mx-auto xl:p-0 p-4">
        <Navbar />
        {children}
      </div>
      <BackToTopButton />
      <Footer />
    </RootLayout>
  );
}
