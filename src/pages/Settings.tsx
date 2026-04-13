import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Brain,
  Key,
  Bell,
  Shield,
  User,
  Plug,
  Wrench,
  Activity,
  Users,
  ChevronRight,
  Globe,
  Palette,
  HardDrive,
} from "lucide-react";

type SettingsSection = "profile" | "api-keys" | "notifications" | "admin";

const NAV_ITEMS: { id: SettingsSection; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "admin", label: "Admin", icon: Shield },
];

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 p-8">
      <h2 className="text-base font-semibold text-heading">{title}</h2>
      <p className="mt-1 text-sm text-body">{description}</p>
      <div className="mt-6 rounded-lg border border-dashed border-border/50 bg-muted/5 p-6 text-center">
        <span className="font-mono text-xs text-muted-foreground">Coming soon</span>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <PlaceholderSection
      title="Profile"
      description="Your name, avatar, and public profile information."
    />
  );
}

function ApiKeysSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/40 bg-card/20 p-8">
        <h2 className="text-base font-semibold text-heading">API Keys</h2>
        <p className="mt-1 text-sm text-body">
          Use API keys to authenticate requests to the UnClick API.
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-border/50 bg-muted/5 p-6 text-center">
          <span className="font-mono text-xs text-muted-foreground">
            Key management coming soon. See{" "}
            <a href="/docs" className="text-primary hover:underline">
              /docs
            </a>{" "}
            to get started
          </span>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <PlaceholderSection
      title="Notifications"
      description="Email alerts, Arena activity, and digest preferences."
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Admin section - OS-style control panel with cards                  */
/* ------------------------------------------------------------------ */

interface AdminCardProps {
  icon: typeof Brain;
  title: string;
  description: string;
  to?: string;
  badge?: string;
  badgeColor?: string;
  status?: "live" | "soon" | "beta";
}

function AdminCard({ icon: Icon, title, description, to, badge, badgeColor, status = "soon" }: AdminCardProps) {
  const statusStyles: Record<string, string> = {
    live: "border-green-500/30 bg-green-500/10 text-green-400",
    beta: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    soon: "border-border/40 bg-muted/10 text-muted-foreground",
  };

  const content = (
    <div className="group flex h-full flex-col rounded-xl border border-border/40 bg-card/20 p-5 transition-all hover:border-primary/30 hover:bg-card/40">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${badgeColor || "border-primary/20 bg-primary/10 text-primary"}`}>
              {badge}
            </span>
          )}
          <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex-1">
        <h3 className="text-sm font-semibold text-heading">{title}</h3>
        <p className="mt-1 text-xs text-body leading-relaxed">{description}</p>
      </div>
      {to && (
        <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Open <ChevronRight className="h-3 w-3" />
        </div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
}

function AdminSection() {
  return (
    <div className="space-y-6">
      {/* Admin header */}
      <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-6">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-heading">Control Panel</h2>
          <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
            Admin
          </span>
        </div>
        <p className="mt-1 text-sm text-body">
          System-level controls for the UnClick platform. Manage memory, integrations, tools, and more.
        </p>
      </div>

      {/* System cards grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          icon={Brain}
          title="Memory"
          description="View and manage persistent agent memory across all 6 layers. Monitor decay tiers and fact status."
          to="/memory/admin"
          badge="6 layers"
          status="live"
        />
        <AdminCard
          icon={Plug}
          title="Integrations"
          description="Connect platforms and manage API credentials. OAuth flows and BackstagePass vault."
          to="/backstagepass"
          badge="40+"
          status="live"
        />
        <AdminCard
          icon={Wrench}
          title="Tools"
          description="Browse and configure the tool marketplace. Enable, disable, and set preferences for 450+ endpoints."
          to="/tools"
          badge="450+"
          status="live"
        />
        <AdminCard
          icon={Activity}
          title="System Status"
          description="Health checks, uptime monitoring, API response times, and error rates across all services."
          status="soon"
        />
        <AdminCard
          icon={Users}
          title="Team"
          description="Manage team members, roles, and permissions. Share memory and tool configs across accounts."
          status="soon"
        />
        <AdminCard
          icon={Globe}
          title="Domains"
          description="Custom domain configuration, SSL certificates, and routing rules for your UnClick instance."
          status="soon"
        />
        <AdminCard
          icon={Palette}
          title="Appearance"
          description="Theme customization, branding, and UI preferences for your platform experience."
          status="soon"
        />
        <AdminCard
          icon={HardDrive}
          title="Storage"
          description="Data usage, backup management, and storage tier configuration. Local and cloud mode settings."
          status="soon"
        />
        <AdminCard
          icon={Shield}
          title="Security"
          description="Authentication settings, session management, audit logs, and access control policies."
          status="soon"
        />
      </div>
    </div>
  );
}

const SECTION_CONTENT: Record<SettingsSection, React.ReactNode> = {
  profile: <ProfileSection />,
  "api-keys": <ApiKeysSection />,
  notifications: <NotificationsSection />,
  admin: <AdminSection />,
};

export default function SettingsPage() {
  const [active, setActive] = useState<SettingsSection>("profile");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-32 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-body">Manage your account and platform preferences.</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-48 shrink-0">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      active === item.id
                        ? "bg-primary/10 text-heading font-medium"
                        : "text-body hover:bg-card/40 hover:text-heading"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0 flex-1">{SECTION_CONTENT[active]}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
