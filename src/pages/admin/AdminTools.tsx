import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, PenSquare, Sparkles, Wrench } from "lucide-react";
import { useSession } from "@/lib/auth";
import { APP_CATALOG, APP_COUNT, TOOL_COUNT } from "@/lib/appCatalog";
import { AppsTable, type AppStatus } from "@/components/apps/AppsTable";
import { AdminAppsIntro } from "./AdminEcosystemPages";

// A connector row as returned by /api/memory-admin?action=admin_tools. Used here
// only to derive each app's connection status (connected / needs key / built-in).
interface Connector {
  id: string;
  auth_type?: "oauth2" | "api_key" | "bot_token";
  credential: { is_valid: boolean; last_tested_at: string | null } | null;
}

const DISABLED_KEY = "unclick.apps.disabled.v1";

function loadDisabled(): Set<string> {
  try {
    const raw = localStorage.getItem(DISABLED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveDisabled(set: Set<string>) {
  try {
    localStorage.setItem(DISABLED_KEY, JSON.stringify([...set]));
  } catch {
    // ignore storage failures (private mode etc.)
  }
}

export default function AdminToolsPage() {
  const { session } = useSession();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [disabled, setDisabled] = useState<Set<string>>(() => loadDisabled());

  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const res = await fetch("/api/memory-admin?action=admin_tools", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (res.ok) {
          const body = await res.json();
          setConnectors(body.connectors ?? []);
        }
      } catch {
        // status is best-effort; the catalog still renders without it.
      }
    })();
  }, [session]);

  const connectorBySlug = useMemo(() => {
    const map = new Map<string, Connector>();
    for (const c of connectors) map.set(c.id, c);
    return map;
  }, [connectors]);

  const enabled = useMemo(() => {
    const rec: Record<string, boolean> = {};
    for (const slug of disabled) rec[slug] = false;
    return rec;
  }, [disabled]);

  function setAndSave(next: Set<string>) {
    saveDisabled(next);
    setDisabled(new Set(next));
  }

  function handleToggle(slug: string, on: boolean) {
    const next = new Set(disabled);
    if (on) next.delete(slug);
    else next.add(slug);
    setAndSave(next);
  }

  function handleToggleAll(on: boolean) {
    setAndSave(on ? new Set() : new Set(APP_CATALOG.map((a) => a.slug)));
  }

  function statusOf(app: { slug: string }): AppStatus | null {
    const c = connectorBySlug.get(app.slug);
    if (!c) return { label: "Built-in", tone: "border-white/10 bg-white/[0.04] text-white/45" };
    if (c.credential?.is_valid) return { label: "Connected", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" };
    if (c.auth_type === "oauth2") return { label: "Needs login", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    if (c.auth_type) return { label: "Needs key", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    return { label: "Built-in", tone: "border-white/10 bg-white/[0.04] text-white/45" };
  }

  if (!session) {
    return <p className="text-sm text-white/50">Sign in to manage Apps.</p>;
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#61C1C4]/10">
          <Wrench className="h-5 w-5 text-[#61C1C4]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Apps</h1>
          <p className="text-sm text-white/50">
            {APP_COUNT} apps, {TOOL_COUNT} tools your AI can reach. All on by default.
          </p>
        </div>
      </div>

      <AdminAppsIntro />

      <AppsTable
        apps={APP_CATALOG}
        mode="admin"
        enabled={enabled}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        statusOf={statusOf}
      />

      {/* Slim footer: where keys and related libraries live */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <FooterLink to="/admin/keychain" icon={<KeyRound className="h-4 w-4 text-[#E2B93B]" />} title="Passport" desc="Add API keys and logins for apps that need them." />
        <FooterLink to="/admin/skills" icon={<Sparkles className="h-4 w-4 text-[#61C1C4]" />} title="Skills Library" desc="Reusable skill packs your agents can install." />
        <FooterLink to="/admin/copypass" icon={<PenSquare className="h-4 w-4 text-fuchsia-300" />} title="CopyPass" desc="Quality checks for writing and copy." />
      </div>
    </>
  );
}

function FooterLink({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/45">{desc}</p>
    </Link>
  );
}
