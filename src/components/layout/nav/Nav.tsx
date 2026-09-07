import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NAV_ROUTES } from "../../../data/Mockdata";
import Button from "../../common/Button";

const navRoutes = NAV_ROUTES.map(({ label }) => ({
  path: `/${label.toLowerCase()}`,
  label,
}));

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-lg px-3 py-1.5",
    "text-sm",
    "transition-all duration-150",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring)]",
    "focus-visible:ring-offset-2",
    isActive
      ? "bg-black/5 font-medium text-[var(--fg)]"
      : [
          "text-[var(--fg-muted)]",
          "hover:bg-black/5",
          "hover:text-[var(--fg)]",
        ].join(" "),
  ].join(" ");

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobile = () => {
    setMobileOpen((open) => !open);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto pt-4 pb-2">
        {/* Floating navigation */}
        <div
          className={[
            "flex h-12 items-center justify-between",
            "rounded-2xl px-4",
            "border",
            "backdrop-blur-xl",
            "transition-all duration-300",
            scrolled
              ? [
                  "border-[var(--border-hi)]",
                  "bg-white/92",
                  "shadow-[0_4px_24px_rgba(0,0,0,0.07)]",
                ].join(" ")
              : [
                  "border-black/[0.06]",
                  "bg-[var(--bg)]/70",
                  "shadow-none",
                ].join(" "),
          ].join(" ")}
        >
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMobile}
            aria-label="Novi home"
            className="
              flex items-center gap-2
              font-display text-base font-medium
              text-[var(--fg)]
              transition-colors
              hover:text-[var(--accent)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--focus-ring)]
              focus-visible:ring-offset-2
            "
          >
            <span
              className="
                flex h-6 w-6
                items-center justify-center
                rounded-md
                bg-[var(--accent)]
                text-xs font-bold
                text-white
              "
            >
              N
            </span>
            Novi
          </NavLink>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navRoutes.map(({ label, path }) => (
              <NavLink key={label} to={path} className={navLinkClasses}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/signin"
              className="
                hidden
                rounded-lg px-3 py-1.5
                text-sm
                text-[var(--fg-muted)]
                transition-all duration-150
                hover:bg-black/5
                hover:text-[var(--fg)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--focus-ring)]
                focus-visible:ring-offset-2
                md:inline-block
              "
            >
              Sign in
            </NavLink>

            <NavLink
              to="/startfree"
              className="
                rounded-xl
                bg-[var(--accent)]
                px-4 py-1.5
                text-sm font-medium
                text-white
                transition-all duration-150
                hover:opacity-85
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--focus-ring)]
                focus-visible:ring-offset-2
              "
            >
              Start free
            </NavLink>

            {/* Mobile toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="p-1.5 md:hidden"
              onClick={toggleMobile}
              leftIcon={mobileOpen ? X : Menu}
            />
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="
              mt-1
              flex flex-col gap-1
              rounded-2xl
              border border-[var(--border)]
              bg-white/95
              px-4 py-3
              shadow-lg
              backdrop-blur-xl
              md:hidden
            "
          >
            {navRoutes.map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                onClick={closeMobile}
                className={`
                  rounded-lg
                  px-2 py-2
                  text-sm
                  text-[var(--fg-muted)]
                  transition-colors duration-150
                  hover:bg-black/5
                  hover:text-[var(--fg)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--focus-ring)]
                  focus-visible:ring-offset-2
                `}
              >
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/signin"
              onClick={closeMobile}
              className="
                rounded-lg
                px-2 py-2
                text-sm
                text-[var(--fg-muted)]
                transition-colors duration-150
                hover:bg-black/5
                hover:text-[var(--fg)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--focus-ring)]
                focus-visible:ring-offset-2
              "
            >
              Sign in
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Nav };
