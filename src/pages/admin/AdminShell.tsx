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
import { LENSES, parseAppLens } from "@/components/apps/appLenses";
import { productName } from "@/config/product-names";
import UserAvatar from "@/components/UserAvatar";
import {
  ArrowRightLeft,
  User,
  Brain,
  KeyRound,
  Wrench,
  Activity,
  Settings,
  LogOut,
  X,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bot,
  BarChart3,
  Bell,
  Code2,
  HardDrive,
  Terminal,
  ChevronRight,
  ChevronDown,
  FileText,
  Clock,
  Fingerprint,
  Sparkles,
  BookOpen,
  FlaskConical,
  ShieldAlert,
  Users as UsersIcon,
  Gauge,
  ShieldHalf,
  HeartPulse,
  ShieldCheck,
  ScrollText,
  MessagesSquare,
  BellRing,
  LayoutDashboard,
  PlugZap,
  FolderKanban,
  Plane,
  ListTodo,
  ClipboardCheck,
  ReceiptText,
  CreditCard,
  LockKeyhole,
  Tags,
  FileStack,
  FileCode2,
  SlidersHorizontal,
  Trophy,
  TowerControl,
  GraduationCap,
  Ticket,
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

/**
 * Connections group: everything the account reaches OUT to, per the operator's
 * IA (docs/connections-ia.md + docs/prd/connections-apps-holistic.md).
 * Apps is THE list; the lens sublinks are views of it (?lens=), sourced from
 * the same LENSES array the page renders, so the sidebar can never drift from
 * the page. Passport remains until the P3 dissolve; Websites ships with the
 * extension surface and is shown as planned, not linked.
 */
function ConnectionsNavGroup({ onLinkClick }: { onLinkClick?: () => void }) {
  const location = useLocation();
  const onApps = location.pathname === "/admin/apps";
  const onCircle = location.pathname.startsWith("/admin/circle");
  const open = onApps || onCircle || location.pathname.startsWith("/admin/keychain");
  const activeLens = parseAppLens(new URLSearchParams(location.search).get("lens"));

  return (
    <div>
      <NavLink
        to="/admin/apps"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive || open
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <PlugZap className="h-4 w-4 shrink-0" />
        <span className="flex-1">Connections</span>
        {open
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {open && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          <Link
            to="/admin/apps"
            onClick={onLinkClick}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card/40 ${
              onApps && activeLens === "all" ? "text-primary" : "text-muted-foreground hover:text-body"
            }`}
          >
            Apps
          </Link>
          {LENSES.filter((l) => l.id !== "all").map(({ id, label }) => (
            <Link
              key={id}
              to={`/admin/apps?lens=${id}`}
              onClick={onLinkClick}
              className={`rounded-md py-1.5 pl-6 pr-3 text-xs font-medium transition-colors hover:bg-card/40 ${
                onApps && activeLens === id ? "text-primary" : "text-muted-foreground/80 hover:text-body"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admin/keychain"
            onClick={onLinkClick}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card/40 ${
              location.pathname.startsWith("/admin/keychain") ? "text-primary" : "text-muted-foreground hover:text-body"
            }`}
          >
            Passport
          </Link>
          <Link
            to="/admin/circle"
            onClick={onLinkClick}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card/40 ${
              onCircle ? "text-primary" : "text-muted-foreground hover:text-body"
            }`}
          >
            {productName("circle")}
          </Link>
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground/40">
            Websites
            <span className="rounded border border-white/10 px-1 py-px text-[9px] uppercase tracking-wide">soon</span>
          </span>
        </div>
      )}
    </div>
  );
}

/** Titled master division in the sidebar: HUMAN (your stuff) vs AGENTS (the workforce). */
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mt-4 mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 first:mt-0">
      {label}
    </div>
  );
}

/**
 * Jobs links carry a lane query (?lane=human / ?lane=agent) over the same
 * /admin/jobs route, so active state must consider the search string, which
 * NavLink ignores. One todo substrate, two queues; see jobLanes.ts.
 */
function JobsLaneLink({ lane, label, icon: Icon, onClick }: {
  lane: "human" | "agent";
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  const location = useLocation();
  const active =
    location.pathname === "/admin/jobs" &&
    new URLSearchParams(location.search).get("lane") === lane;
  return (
    <NavLink
      to={`/admin/jobs?lane=${lane}`}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
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
  { path: "/admin/controltower", label: "Control Tower", icon: TowerControl },
  // XGate (pre-execution gates) sits above XPass (after-action proof): prechecks
  // run before the work, so they read first in the list.
  { path: "/admin/xgate", label: "XGate", icon: ShieldHalf, hasChildren: true },
  { path: "/admin/checks", label: "XPass", icon: ClipboardCheck, hasChildren: true },
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

// XGate is the pre-execution bookend twin of XPass: XPass proves what happened
// (after), XGate decides what is allowed (before). Its members are the gates.
// The gate sub-routes share the single XGate page for now (filtered by hash);
// they can split into their own pages later, mirroring XPass.
const XGATE_LINKS = [
  { path: "/admin/xgate#commandgate", label: "CommandGate" },
  { path: "/admin/xgate#gitgate", label: "GitGate" },
  { path: "/admin/xgate#datagate", label: "DataGate" },
  { path: "/admin/xgate#secretgate", label: "SecretGate" },
  { path: "/admin/xgate#trendslopgate", label: "TrendSlopGate" },
  { path: "/admin/xgate#shipgate", label: "ShipGate" },
  { path: "/admin/xgate#scopegate", label: "ScopeGate" },
  { path: "/admin/xgate#spendgate", label: "SpendGate" },
  { path: "/admin/xgate#killgate", label: "KillGate" },
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

function XGateNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isXGate = location.pathname === "/admin/xgate" || location.pathname.startsWith("/admin/xgate");

  return (
    <div>
      <NavLink
        to="/admin/xgate"
        onClick={onClick}
        className={() =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isXGate
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <ShieldHalf className="h-4 w-4 shrink-0" />
        <span className="flex-1">XGate</span>
        {isXGate
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {isXGate && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          {XGATE_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClick}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-card/40 hover:text-body"
            >
              {label}
            </Link>
          ))}
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
    <div>
      <NavLink
        to="/admin/autopilot"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <Plane className="h-4 w-4 shrink-0" />
        <span className="flex-1">AutoPilot</span>
        {open
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {open && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          {AUTOPILOT_LINKS.map((item) => {
            if (item.hasChildren && item.path === "/admin/checks") {
              return <XPassNavItem key={item.path} onClick={onLinkClick} />;
            }
            if (item.hasChildren && item.path === "/admin/xgate") {
              return <XGateNavItem key={item.path} onClick={onLinkClick} />;
            }
            if (item.path === "/admin/jobs") {
              return <JobsLaneLink key={item.path} lane="agent" label="Jobs (AI)" icon={item.icon} onClick={onLinkClick} />;
            }
            return (
              <SurfaceLink
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                onClick={onLinkClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const ADMIN_SUBMENU = [
  { path: "/admin/analytics",     label: "Analytics",             icon: BarChart3   },
  { path: "/admin/capability-balance", label: "Capability Balance", icon: SlidersHorizontal },
  { path: "/admin/codebase",      label: "Codebase",              icon: Code2       },
  { path: "/admin/users",         label: "User Management",       icon: UsersIcon   },
  { path: "/admin/system-health", label: "System Health",         icon: HeartPulse  },
  { path: "/admin/pinballwake",   label: "PinballWake",           icon: BellRing    },
  { path: "/admin/moderation",    label: "Marketplace Moderation", icon: ShieldCheck },
  { path: "/admin/audit-log",     label: "Audit Log",             icon: ScrollText  },
  { path: "/admin/backstagepass", label: "BackstagePass", icon: Ticket },
  { path: "/admin/brainmap",      label: "Ecosystem Brainmap",    icon: Sparkles    },
  { path: "/admin/app-testing",   label: "App Testing",           icon: FlaskConical },
  { path: "/admin/benchmarks",    label: "Benchmarks",            icon: Trophy      },
  { path: "/admin/truth-rate",    label: "Truth Rate",            icon: Gauge       },
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

const SEATS_CHILDREN = [
  { path: "/admin/agents/api",              label: "API",          icon: KeyRound   },
  { path: "/admin/agents/api/routing",      label: "Routing",      icon: ArrowRightLeft },
  { path: "/admin/agents/api/usage",        label: "Usage",        icon: BarChart3  },
  { path: "/admin/agents/local",            label: "Local",        icon: HardDrive  },
  { path: "/admin/agents/subscription",     label: "Subscription", icon: CreditCard },
  { path: "/admin/agents/heartbeat",        label: "Heartbeat",    icon: HeartPulse },
] as const;

function SeatsNavItem({ onClick }: { onClick?: () => void }) {
  const location = useLocation();
  const isSeats = location.pathname === "/admin/agents" || location.pathname.startsWith("/admin/agents/");

  return (
    <div>
      <NavLink
        to="/admin/agents"
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <SeatsCascadeIcon className="h-4 w-4 shrink-0" />
        <span className="flex-1">Seats</span>
        {isSeats
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
      {isSeats && (
        <div className="ml-7 mt-0.5 flex flex-col gap-0.5">
          {SEATS_CHILDREN.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={onClick}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card/40 hover:text-body"
                }`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {label}
              </Link>
            );
          })}
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
  const logActive = location.pathname === "/admin/orchestrator/log";

  return (
    <div>
      <NavLink
        to="/admin/orchestrator"
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
          }`
        }
      >
        <Terminal className="h-4 w-4 shrink-0" />
        <span className="flex-1">Orchestrator</span>
        {isOrchestrator
          ? <ChevronDown className="h-3 w-3 shrink-0" />
          : <ChevronRight className="h-3 w-3 shrink-0" />}
      </NavLink>
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
          <Link
            to="/admin/orchestrator/log"
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              logActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-card/40 hover:text-body"
            }`}
          >
            <ScrollText className="h-3 w-3 shrink-0" />
            Log
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

      <SectionHeader label="Human" />
      <SurfaceLink path="/admin/you"      label="You"                      icon={User}    onClick={onLinkClick} />
      <MemoryNavItem onClick={onLinkClick} />
      <OrchestratorNavItem onClick={onLinkClick} />
      <SurfaceLink path="/admin/chat"     label="Chat"                     icon={MessagesSquare} onClick={onLinkClick} />
      <ConnectionsNavGroup onLinkClick={onLinkClick} />
      <JobsLaneLink lane="human" label="Jobs (Human)" icon={ListTodo} onClick={onLinkClick} />
      <SurfaceLink path="/admin/signals"      label="Signals"       icon={Bell}     onClick={onLinkClick} badge={signalsUnread} />
      <SurfaceLink path="/admin/settings" label="Settings"                 icon={Settings}  onClick={onLinkClick} />
      <SurfaceLink path="/admin/billing"  label="Billing"                  icon={CreditCard} onClick={onLinkClick} />

      <SectionHeader label="Agents" />
      <SeatsNavItem onClick={onLinkClick} />
      <SurfaceLink path="/admin/skills"   label="Skills"                   icon={Sparkles} onClick={onLinkClick} />
      <SurfaceLink path="/admin/induction" label="Induction"               icon={GraduationCap} onClick={onLinkClick} />
      <AutopilotNavGroup onLinkClick={onLinkClick} />

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
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("admin-sidebar-collapsed") === "1",
  );

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

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
    <div className="flex min-h-screen text-foreground">
      {/* ── Desktop sidebar (md+) ────────────────── */}
      <aside className={`fixed left-0 z-40 hidden w-56 flex-col border-r border-border/40 bg-[#06202c]/70 backdrop-blur-xl ${collapsed ? "" : "md:flex"}`} style={{ top: "var(--bbn-h, 0px)", bottom: 0 }}>
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
            <UserAvatar user={user} className="h-8 w-8" />
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

      {/* ── Desktop top bar (md+) with global search ───────── */}
      <header className={`fixed inset-x-0 z-30 hidden h-14 items-center border-b border-border/40 bg-[#06202c]/70 backdrop-blur-xl md:flex ${collapsed ? "md:pl-0" : "md:pl-56"}`} style={{ top: "var(--bbn-h, 0px)" }}>
        <div className="flex flex-1 items-center gap-3 px-4 lg:px-8">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-card/40 hover:text-foreground"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
          <div className="flex-1">
            <AdminSearchBar />
          </div>
          <MemoryHealthPill />
        </div>
      </header>

      {/* ── Mobile/tablet top bar (<md) ──────────────── */}
      <header className="fixed inset-x-0 z-40 flex h-14 items-center justify-between border-b border-border/40 bg-[#06202c]/80 backdrop-blur-xl px-4 md:hidden" style={{ top: "var(--bbn-h, 0px)" }}>
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
        <div className="fixed inset-x-0 z-30 border-b border-border/40 bg-[#06202c]/95 backdrop-blur-xl p-3 md:hidden" style={{ top: "calc(var(--bbn-h, 0px) + 56px)" }}>
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
          <div className="mt-2 flex items-center gap-2 border-t border-border/40 px-3 pt-2">
            <UserAvatar user={user} className="h-6 w-6" />
            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {user?.email ?? "Unknown"}
            </p>
          </div>
        </div>
      )}

      {/* ── Main content ───────────────────── */}
      <main className={`min-h-screen flex-1 ${collapsed ? "md:ml-0" : "md:ml-56"}`} style={{ paddingTop: "calc(var(--bbn-h, 0px) + 56px)" }}>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
