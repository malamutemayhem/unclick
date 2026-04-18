/**
 * AdminShell -- shared layout for the admin pages (Settings, Connect,
 * Memory Admin). Provides Navbar + Footer + a sidebar so individual
 * pages stay focused on content.
 */

import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Settings, Plug, Brain } from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/connect", label: "Connect", icon: Plug },
  { to: "/memory/admin", label: "Memory Admin", icon: Brain },
];

interface AdminShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AdminShell({ title, subtitle, children }: AdminShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="md:w-56 md:shrink-0">
            <nav className="flex gap-1 overflow-x-auto md:flex-col">
              {NAV.map((item) => {
                const active = pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-primary/10 font-medium text-heading"
                        : "text-body hover:bg-card/40 hover:text-heading"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
