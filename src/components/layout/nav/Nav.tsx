import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { C } from "../../../theme/color";
import { NAV_LINKS } from "../../../data/Mockdata";
import Button from "../../common/Button";

const navRoutes = NAV_LINKS.map((label) => ({
  label,
  path: `/${label.toLowerCase()}`,
}));

export const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto pt-4 pb-2">
        {/* Floating pill */}
        <div
          className="flex items-center justify-between h-12 px-4 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled
              ? "rgba(255,255,255,0.92)"
              : "rgba(250,250,249,0.7)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${
              scrolled ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.06)"
            }`,
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-base font-medium"
            style={{ color: C.fg }}
          >
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: C.accent, color: "#fff" }}
            >
              N
            </div>
            Novi
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navRoutes.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150 hover:text-[#08080b] hover:bg-black/5"
                style={{ color: C.fgMuted }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="hidden md:inline-block px-3 py-1.5 rounded-lg text-sm transition-all duration-150 hover:text-[#08080b] hover:bg-black/5"
              style={{ color: C.fgMuted }}
            >
              Sign in
            </Link>

            <Link
              to="/startfree"
              className="text-sm font-medium px-4 py-1.5 rounded-xl transition-all duration-150 hover:opacity-85"
              style={{ background: C.accent, color: "#fff" }}
            >
              Start free
            </Link>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-1.5"
              onClick={toggleMobile}
              leftIcon={mobileOpen ? X : Menu}
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden mt-1 px-4 py-3 rounded-2xl flex flex-col gap-1"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            {[...navRoutes, { label: "Sign in", path: "/signin" }].map(
              ({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="py-2 px-2 text-sm rounded-lg transition-colors hover:text-[#08080b] hover:bg-black/5"
                  style={{ color: C.fgMuted }}
                  onClick={closeMobile}
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </header>
  );
};