import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { C } from "../../../theme/color";
import { NAV_LINKS } from "../../../data/Mockdata";
import Button from "../../common/Button";

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
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-2">
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
          <a
            href="#"
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
          </a>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150"
                style={{ color: C.fgMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.fg;
                  e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.fgMuted;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              as="a"
              href="#"
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
            >
              Sign in
            </Button>

            {/*  primary button */}
            <Button
              as="a"
              href="#"
              variant="primary"
              size="sm"
              className="text-white"
            >
              Start free
            </Button>

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
            {[...NAV_LINKS, "Sign in"].map((l) => (
              <a
                key={l}
                href="#"
                className="py-2 px-2 text-sm rounded-lg transition-colors"
                style={{ color: C.fgMuted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.fg;
                  e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.fgMuted;
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={closeMobile}
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
