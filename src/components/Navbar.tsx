import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSession } from "@/lib/auth";

/**
 * Public site navigation (2026-06-07).
 *
 *  - Mirrors the logged-in admin sidebar product surfaces, shown the same
 *    whether signed in or out. App surfaces resolve to /admin/* (login-gated
 *    for signed-out visitors); Apps, Memory, Docs, New to AI, and XPass have
 *    public pages.
 *  - Autopilot is a dropdown (desktop) / expandable group (mobile).
 *  - Border appears only after scroll; otherwise the bar is translucent over
 *    the aurora canvas. "Boardroom" never appears as "Fishbowl".
 */

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

// Header is the brochure: every item links to a public marketing page that
// explains the product. The interactive surfaces live in the signed-in
// dashboard at /admin/*, reached via "Get started" / "Dashboard".
const NAV_ITEMS: NavItem[] = [
  { label: "Why UnClick", href: "/why" },
  { label: "Apps", href: "/apps" },
  { label: "Skills", href: "/skills" },
  { label: "Orchestrator", href: "/orchestrator" },
  { label: "Passport", href: "/passport" },
  { label: "Seats", href: "/seats" },
  { label: "Memory", href: "/memory" },
  {
    label: "Autopilot",
    href: "/autopilot",
    children: [
      { label: "XPass", href: "/xpass" },
      { label: "XGate", href: "/xgate" },
      { label: "Jobs", href: "/jobs" },
      { label: "Control Tower", href: "/control-tower" },
      { label: "Ledger", href: "/ledger" },
      { label: "Workers", href: "/workers" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "Intro", href: "/new-to-ai" },
];

/**
 * Desktop dropdown for a nav item with children. State-controlled so it closes
 * reliably: on child click, on route change, on mouse-leave, on focus leaving
 * the group, and on Escape. (A pure CSS group-hover/focus-within dropdown stays
 * stuck open after a click because the clicked link keeps focus.)
 */
function NavDropdown({
  item,
  linkClass,
  isActive,
}: {
  item: NavItem;
  linkClass: (href: string) => string;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        to={item.href}
        className={`${linkClass(item.href)} gap-1`}
        aria-expanded={open}
        aria-haspopup="menu"
        onFocus={() => setOpen(true)}
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="min-w-[190px] rounded-2xl border border-[#86dadd]/15 bg-[#0a2c3c]/95 p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md">
          {item.children?.map((child) => (
            <Link
              key={child.label}
              to={child.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(child.href)
                  ? "bg-primary/10 text-primary"
                  : "text-body hover:bg-white/[0.05] hover:text-heading"
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileAutopilotOpen, setMobileAutopilotOpen] = useState(false);
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

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const linkClass = (href: string) =>
    `inline-flex min-h-6 items-center text-sm transition-colors hover:text-heading ${
      isActive(href) ? "text-heading" : "text-body"
    }`;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border/40 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
      style={{ top: "var(--bbn-h, 0px)" }}
    >
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="inline-flex min-h-6 shrink-0 items-center" aria-label="UnClick home">
          <img
            src="/logo-wordmark.svg"
            alt="UnClick"
            style={{ height: "3.3rem" }}
            className="w-auto pt-2 pb-[3px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-x-5 xl:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} linkClass={linkClass} isActive={isActive} />
            ) : (
              <Link key={item.label} to={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ),
          )}
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
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 xl:hidden"
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
            className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md xl:hidden"
          >
            <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-6 py-4">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-8 flex-1 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setMobileAutopilotOpen((v) => !v)}
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={mobileAutopilotOpen}
                        className="flex h-8 w-8 items-center justify-center text-muted-foreground"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileAutopilotOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    {mobileAutopilotOpen && (
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-border/40 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-8 items-center py-1.5 text-sm text-body transition-colors hover:text-heading"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <div className="mt-2 border-t border-border/40 pt-3">
                {isLoggedIn ? (
                  <Link
                    to="/admin/you"
                    onClick={() => setOpen(false)}
                    className="flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex min-h-8 items-center py-2 text-sm text-body transition-colors hover:text-heading"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
