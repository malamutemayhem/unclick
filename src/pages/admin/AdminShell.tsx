/**
 * AdminShell - OS shell layout for the admin surfaces.
 *
 * Persistent sidebar (desktop) or top nav (tablet) with surface icons,
 * a global Ctrl+K search bar in the header, user avatar/email, logout.
 * Content rendered via React Router <Outlet>.
 *
 * Dark palette: design tokens via Tailwind (bg-background, text-primary, etc).
 * Amber accents on the Admin submenu intentionally signal superuser surface.
 * Each surface is extractable as a native app later.
 */

import { useState, useEffect, type ComponentType, type SVGProps } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSession, signOut } from "@/lib/auth";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import BugReportButton from "@/components/admin/BugReportButton";
import MemoryHealthPill from "@/components/admin/MemoryHealthPill";
import {
  User,
  Brain,
  KeyRound,
  Wrench,
  Activity,
  Settings,
  LogOut,
  X,
  Menu,
  Bot,
  BarChart3,
  Bell,
  Code2,
  Terminal,
  ChevronRight,
  ChevronDown,
  FileText,
  Clock,
  Fingerprint,
  Sparkles,
  BookOpen,
  FlaskConical,
  PenSquare,
  ShieldAlert,
  Users as UsersIcon,
  HeartPulse,
  ShieldCheck,
  ScrollText,
  MessagesSquare,
  BellRing,
  LayoutDashboard,
  AppWindow,
  FolderKanban,
  Plane,
  ListTodo,
  ClipboardCheck,
  ReceiptText,
  CreditCard,
  LockKeyhole,
  ShieldHalf,
  Tags,
  FileStack,
  FileCode2,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";

function SurfaceLink({ path, label, icon: Icon, onClick, badge }: {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: number;
}) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </NavLink>
  );
}

function SeatsCascadeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M12 17v3" />
      <path d="M8 20h8" />
      <path d="M12 7V5.5" />
      <path d="M10.5 7h3" />
      <rect x="8" y="8" width="8" height="6" rx="2" />
      <path d="M10.5 11h.01" />
      <path d="M13.5 11h.01" />
      <path d="M11 13h2" />
    </svg>
  );
}

const AUTOPILOT_LINKS = [
  { path: "/admin/autopilot/expressbuild", label: "DraftRoom", icon: FileCode2 },
  { path: "/admin/boardroom", label: "Boardroom", icon: MessagesSquare },
  { path: "/admin/jobs", label: "Jobs", icon: ListTodo },
  { path: "/admin/checks", label: "XPass", icon: ClipboardCheck, hasChildren: true },
  { path: "/admin/xgate", label: "XGate", icon: ShieldHalf },
  { path: "/admin/projects", label: "Projects", icon: FolderKanban },
  { path: "/admin/ledger", label: "Ledger", icon: ReceiptText },
  { path: "/admin/workers", label: "Workers", icon: Bot },
] as const;

const XPASS_LINKS = [
  { path: "/admin/checks/testpass", label: "TestPass" },
  { path: "/admin/checks/uipass", label: "UIPass" },
  { path: "/admin/checks/uxpass", label: "UXPass" },
  { path: "/admin/checks/securitypass", label: "SecurityPass" },
  { path: "/admin/checks/copypass", label: "CopyPass" },
  { path: "/admin/checks/fidelitypass", label: "FidelityPass" },
  { path: "/admin/checks/legalpass", label: "LegalPass" },
  { path: "/admin/checks/sloppass", label: "SlopPass" },
  { path: "/admin/checks/commonsensepass", label: "CommonSensePass" },
  { path: "/admin/checks/seopass", label: "SEOPass" },
  { path: "/admin/checks/geopass", label: "GEOPass" },
  { path: "/admin/checks/flowpass", label: "FlowPass" },
  { path: "/admin/checks/rotatepass", label: "RotatePass" },
  { path: "/admin/checks/wakepass", label: "WakePass" },
  { path: "/admin/checks/compliancepass", label: "CompliancePass" },
] as const;

function XPassNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isXPass = location.pathname === "/admin/checks" || location.pathname.startsWith("/admin/checks/");

  return (
    <div>
      <NavLink
        to="/admin/checks"
        onClick={onClick}
        className={() =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isXPass
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <ClipboardCheck className="h-4 w-4 shrink-0" />
        <span className="flex-1">XPass</span>
        {isXPass
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {isXPass && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          {XPASS_LINKS.map(({ path, label }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                onClick={onClick}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card/40 hover:text-body"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AutopilotNavGroup({ onLinkClick }: { onLinkClick?: () => void }) {
  const location = useLocation();
  const open = location.pathname.startsWith("/admin/autopilot") ||
    AUTOPILOT_LINKS.some((item) => location.pathname.startsWith(item.path));

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-1">
      <SurfaceLink path="/admin/autopilot" label="AutoPilot" icon={Plane} onClick={onLinkClick} />
      {open && (
        <div className="mt-1 space-y-0.5 border-l border-primary/20 pl-3">
          {AUTOPILOT_LINKS.map((item) => (
            item.hasChildren ? (
              <XPassNavItem key={item.path} onClick={onLinkClick} />
            ) : (
              <SurfaceLink
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                onClick={onLinkClick}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}

const ADMIN_SUBMENU = [
  { path: "/admin/analytics",     label: "Analytics",             icon: BarChart3   },
  { path: "/admin/codebase",      label: "Codebase",              icon: Code2       },
  { path: "/admin/users",         label: "User Management",       icon: UsersIcon   },
  { path: "/admin/system-health", label: "System Health",         icon: HeartPulse  },
  { path: "/admin/pinballwake",   label: "PinballWake",           icon: BellRing    },
  { path: "/admin/moderation",    label: "Marketplace Moderation", icon: ShieldCheck },
  { path: "/admin/audit-log",     label: "Audit Log",             icon: ScrollText  },
  { path: "/admin/brainmap",      label: "Ecosystem Brainmap",    icon: Sparkles    },
  { path: "/admin/benchmarks",    label: "Benchmarks",            icon: Trophy      },
] as const;

function AdminSubmenu({ onLinkClick }: { onLinkClick?: () => void }) {
  const location = useLocation();
  const [open, setOpen] = useState(() =>
    ADMIN_SUBMENU.some((item) => location.pathname.startsWith(item.path)),
  );

  return (
    <div className="mt-1 rounded-lg border border-[#E2B93B]/25 bg-[#E2B93B]/[0.04] p-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Internal tools for super-admins. You see this because your email is on the admin list."
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-[#E2B93B] transition-colors hover:bg-[#E2B93B]/10"
      >
        <ShieldAlert className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Admin</span>
        {open
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-0.5 border-l-2 border-[#E2B93B]/40 pl-2">
          {ADMIN_SUBMENU.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#E2B93B]/15 text-[#E2B93B]"
                    : "text-[#a68a30] hover:bg-[#E2B93B]/10 hover:text-[#E2B93B]"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

const MEMORY_TABS = [
  { id: "saved-facts",    label: "Saved Facts",    icon: FileText   },
  { id: "library",        label: "Library",        icon: BookOpen   },
  { id: "chats",          label: "Chats",          icon: MessagesSquare },
  { id: "files-notes",    label: "Files & Notes",  icon: FileStack  },
  { id: "project-briefs", label: "Project Briefs", icon: FolderKanban },
  { id: "preferences",    label: "Preferences",    icon: SlidersHorizontal },
  { id: "recall-check",   label: "Recall Check",   icon: Fingerprint },
] as const;

function MemoryNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isMemory = location.pathname === "/admin/memory";
  const activeTab = new URLSearchParams(location.search).get("tab") ?? "brain-map";

  return (
    <div>
      <NavLink
        to="/admin/memory"
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <Brain className="h-4 w-4 shrink-0" />
        <span className="flex-1">Memory</span>
        {isMemory
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {isMemory && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          {MEMORY_TABS.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              to={`/admin/memory?tab=${id}`}
              onClick={onClick}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-card/40 hover:text-body"
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SeatsNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isSeats = location.pathname === "/admin/agents" || location.pathname.startsWith("/admin/agents/");
  const heartbeatActive = location.pathname === "/admin/agents/heartbeat";

  return (
    <div>
      <SurfaceLink path="/admin/agents" label="Seats" icon={SeatsCascadeIcon} onClick={onClick} />
      {isSeats && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          <Link
            to="/admin/agents/heartbeat"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              heartbeatActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-card/40 hover:text-body"
            }`}
          >
            <HeartPulse className="h-3 w-3 shrink-0" />
            Heartbeat
          </Link>
        </div>
      )}
    </div>
  );
}

function OrchestratorNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isOrchestrator = location.pathname === "/admin/orchestrator" ||
    location.pathname.startsWith("/admin/orchestrator/");
  const storyActive = location.pathname === "/admin/orchestrator" ||
    location.pathname === "/admin/orchestrator/story";
  const timelineActive = location.pathname === "/admin/orchestrator/timeline";

  return (
    <div>
      <SurfaceLink path="/admin/orchestrator" label="Orchestrator" icon={Terminal} onClick={onClick} />
      {isOrchestrator && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          <Link
            to="/admin/orchestrator"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              storyActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-card/40 hover:text-body"
            }`}
          >
            <BookOpen className="h-3 w-3 shrink-0" />
            Story
          </Link>
          <Link
            to="/admin/orchestrator/timeline"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              timelineActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-card/40 hover:text-body"
            }`}
          >
            <Clock className="h-3 w-3 shrink-0" />
            Timeline
          </Link>
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  isAdmin,
  signalsUnread,
  onLinkClick,
}: {
  isAdmin: boolean;
  signalsUnread: number;
  onLinkClick?: () => void;
}) {
  return (
    <>
      <SurfaceLink path="/admin/dashboard" label="Dashboard"               icon={LayoutDashboard} onClick={onLinkClick} />
      <SurfaceLink path="/admin/you"      label="You"                      icon={User}    onClick={onLinkClick} />
      <MemoryNavItem onClick={onLinkClick} />
      <OrchestratorNavItem onClick={onLinkClick} />
      <SurfaceLink path="/admin/tools"    label="Apps"                     icon={AppWindow} onClick={onLinkClick} />
      <SurfaceLink path="/admin/skills"   label="Skills"                   icon={Sparkles} onClick={onLinkClick} />
      <SurfaceLink path="/admin/jobsmith" label="Jobsmith"                 icon={PenSquare} onClick={onLinkClick} />
      <SurfaceLink path="/admin/keychain" label="Passport"                 icon={KeyRound} onClick={onLinkClick} />
      <SeatsNavItem onClick={onLinkClick} />
      <AutopilotNavGroup onLinkClick={onLinkClick} />
      <SurfaceLink path="/admin/signals"      label="Signals"       icon={Bell}     onClick={onLinkClick} badge={signalsUnread} />
      <SurfaceLink path="/admin/settings" label="Settings"                 icon={Settings}  onClick={onLinkClick} />
      <SurfaceLink path="/admin/billing"  label="Billing"                  icon={CreditCard} onClick={onLinkClick} />
      {isAdmin && <AdminSubmenu onLinkClick={onLinkClick} />}
    </>
  );
}

export default function AdminShell() {
  const { user, session } = useSession();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signalsUnread, setSignalsUnread] = useState(0);

  useEffect(() => {
    const token = session?.access_token;
    if (!token) return;
    let cancelled = false;
    fetch("/api/memory-admin?action=admin_profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (!cancelled && body) setIsAdmin(Boolean(body.is_admin));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [session?.access_token]);

  useEffect(() => {
    const token = session?.access_token;
    if (!token) return;
    let cancelled = false;

    async function fetchUnread() {
      try {
        const res = await fetch("/api/memory-admin?action=list_signals", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 100, unread_only: true }),
        });
        if (!res.ok) return;
        const body = await res.json();
        if (!cancelled) setSignalsUnread((body.signals ?? []).length);
      } catch {
        if (!cancelled) setSignalsUnread(0);
      }
    }

    void fetchUnread();
    const id = setInterval(fetchUnread, 30_000);
    return () => { cancelled = true; clearInterval(id); };
  }, [session?.access_token]);

  async function handleLogout() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ── Desktop sidebar (md+) ──────────────────── */}
      <aside className="fixed left-0 z-40 hidden w-56 flex-col border-r border-border/40 bg-background md:flex" style={{ top: "var(--bbn-h, 0px)", bottom: 0 }}>
        <div className="flex h-14 items-center px-5">
          <Link to="/">
            <img
              src="/logo-wordmark.svg"
              alt="UnClick"
              style={{ height: "2.5rem" }}
              className="w-auto"
            />
          </Link>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          <SidebarNav isAdmin={isAdmin} signalsUnread={signalsUnread} />
          <a
            href="/memory"
            className="text-muted-foreground/60 hover:text-muted-foreground text-xs block px-3 py-2"
          >
            How it works →
          </a>
        </nav>

        <div className="border-t border-border/40 p-3">
          <BugReportButton />
        </div>

        <div className="border-t border-border/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">
                {user?.email ?? "Unknown"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-card/40 hover:text-foreground"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Desktop top bar (md+) with global search ─────────── */}
      <header className="fixed inset-x-0 z-30 hidden h-14 items-center border-b border-border/40 bg-background md:flex md:pl-56" style={{ top: "var(--bbn-h, 0px)" }}>
        <div className="flex flex-1 items-center gap-3 px-4 lg:px-8">
          <div className="flex-1">
            <AdminSearchBar />
          </div>
          <MemoryHealthPill />
        </div>
      </header>

      {/* ── Mobile/tablet top bar (<md) ────────────────── */}
      <header className="fixed inset-x-0 z-40 flex h-14 items-center justify-between border-b border-border/40 bg-background px-4 md:hidden" style={{ top: "var(--bbn-h, 0px)" }}>
        <Link to="/">
          <img
            src="/logo-wordmark.svg"
            alt="UnClick"
            style={{ height: "2rem" }}
            className="w-auto"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-x-0 z-30 border-b border-border/40 bg-background p-3 md:hidden" style={{ top: "calc(var(--bbn-h, 0px) + 56px)" }}>
          <div className="mb-3">
            <AdminSearchBar />
          </div>
          <nav className="flex flex-col gap-1">
            <SidebarNav
              isAdmin={isAdmin}
              signalsUnread={signalsUnread}
              onLinkClick={() => setMobileNavOpen(false)}
            />
          </nav>
          <div className="mt-3 border-t border-border/40 pt-3">
            <BugReportButton />
          </div>
          <div className="mt-2 border-t border-border/40 pt-2">
            <p className="truncate px-3 text-xs text-muted-foreground">
              {user?.email ?? "Unknown"}
            </p>
          </div>
        </div>
      )}

      {/* ── Main content ─────────────────────────── */}
      <main className="min-h-screen flex-1 md:ml-56" style={{ paddingTop: "calc(var(--bbn-h, 0px) + 56px)" }}>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
