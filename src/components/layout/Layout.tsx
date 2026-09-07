import type { ReactNode } from "react";
import { Nav } from "./nav/Nav";
import Footer from "./footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-full bg-[var(--bg)] px-4 text-[var(--fg)] sm:px-12">
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
