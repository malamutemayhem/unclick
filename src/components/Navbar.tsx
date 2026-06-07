import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth";

/**
 * Navbar (Apple-inspired polish pass, 2026-05-28).
 *
 *  - Text-only links. No per-item icons. Apple-style restraint.
 *  - Sentence case labels.
 *  - Border appears only after scroll. Otherwise the bar is transparent over the page.
 *  - "Boardroom" replaces any reference to Fishbowl.
 *  - BuildDesk and BackstagePass are not surfaced here per Chris 2026-05-28.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const installHref = isHome ? "#install" : "/#install";
  const { session } = useSession();
  const isLoggedIn = Boolean(session);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Apps", href: "/apps" },
    { label: "Memory", href: "/memory" },
    { label: "XPass", href: "/xpass" },
    { label: "Docs", href: "/docs" },
    { label: "New to AI", href: "/new-to-ai" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border/40 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
      style={{ top: "var(--bbn-h, 0px)" }}
    >
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="inline-flex min-h-6 shrink-0 items-center" aria-label="UnClick home">
          <img
            src="/logo-wordmark.svg"
            alt="UnClick"
            style={{ height: "3.3rem" }}
            className="w-auto pt-2 pb-[3px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`inline-flex min-h-6 items-center text-sm transition-colors hover:text-heading ${
                isActive(link.href) ? "text-heading" : "text-body"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              to="/admin/you"
              className="hidden min-h-6 items-center whitespace-nowrap text-sm text-body transition-colors hover:text-heading hover:underline sm:inline-flex"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden min-h-6 items-center whitespace-nowrap text-sm text-body transition-colors hover:text-heading hover:underline sm:inline-flex"
              >
                Log in
              </Link>
              <a
                href={installHref}
                className="hidden min-h-9 items-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
              >
                Get started
              </a>
            </>
          )}

          {/* Hamburger */}
          <button
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              className="block h-0.5 w-5 bg-[hsl(var(--heading-text))] origin-center"
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-[hsl(var(--heading-text))]"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-[hsl(var(--heading-text))] origin-center"
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <Link
                  to="/admin/you"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                  >
                    Log in
                  </Link>
                  <a
                    href={installHref}
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Get started
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
