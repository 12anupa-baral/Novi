import type { ReactNode } from "react";
import { Nav } from "./nav/Nav";
import Footer from "./footer/Footer";
import { C } from "../../theme/color";

interface LayoutProps {
  children: ReactNode;
}

 const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ background: C.bg, color: C.fg, minHeight: "100%" }} className="px-4 sm:px-12">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout