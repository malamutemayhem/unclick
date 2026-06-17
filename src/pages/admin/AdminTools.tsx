import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { KeyRound, PenSquare, Sparkles, Wrench } from "lucide-react";
import { useSession } from "@/lib/auth";
import { APP_CATALOG, APP_COUNT, TOOL_COUNT, type AppEntry } from "@/lib/appCatalog";
import { AppsTable, type AppStatus } from "@/components/apps/AppsTable";
import { ConnectAppModal } from "@/components/apps/ConnectAppModal";
import { AppLensBar } from "@/components/apps/AppLensBar";
import { applyLens, lensCounts, actionLabelFor, parseAppLens, type AppLens } from "@/components/apps/appLenses";
import { AdminAppsIntro } from "./AdminEcosystemPages";

// A connector row as returned by /api/memory-admin?action=admin_tools. Used here
// only to derive each app's connection status (connected / needs key / built-in)
// and to feed the connect wizard.
interface Connector {
  id: string;
  auth_type?: "oauth2" | "api_key" | "bot_token";
  setup_url?: string | null;
  supports_managed_connection?: boolean;
  supports_hosted_mcp_connection?: boolean;
  managed_provider_config_key?: string | null;
  credential: {
    id?: string | null;
    is_valid: boolean;
    last_tested_at: string | null;
    source?: "platform_credentials" | "user_credentials" | "managed_app_connections" | "mixed";
    managed?: {
      provider: string;
      provider_config_key: string | null;
      external_connection_id: string;
      auth_mode: string;
      status: string;
      account_label: string | null;
      scope_summary: string | null;
      connected_at: string | null;
    } | null;
  } | null;
}

export default function AdminToolsPage() {
  const { session } = useSession();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [disabled, setDisabled] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [connectTarget, setConnectTarget] = useState<AppEntry | null>(null);
  // One filter state, two controls: the rail and the chips both read/write
  // this URL param, so views are linkable and survive refresh.
  const [searchParams, setSearchParams] = useSearchParams();
  const lens = parseAppLens(searchParams.get("lens"));
  const selectLens = useCallback(
    (next: AppLens) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next === "all") params.delete("lens");
          else params.set("lens", next);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const refreshStatus = useCallback(async () => {
    if (!session) return;
    try {
      const res = await fetch("/api/memory-admin?action=admin_tools", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const body = await res.json();
        setConnectors(body.connectors ?? []);
        setDisabled(new Set((body.disabled_apps as string[] | undefined) ?? []));
      }
    } catch {
      // status is best-effort; the catalog still renders without it.
    }
  }, [session]);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

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

  // Persist the disabled set to the tenant store the MCP server enforces against.
  // Optimistic: update the UI first, roll back if the save fails.
  async function persist(next: Set<string>) {
    if (!session) {
      setSaveError("You are signed out. Sign in again to change your apps.");
      return;
    }
    const prev = disabled;
    setDisabled(new Set(next));
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/memory-admin?action=admin_set_app_state", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ disabled_apps: [...next] }),
      });
      if (!res.ok) {
        // Surface why the save failed instead of silently reverting.
        const detail = await res.text().catch(() => "");
        setDisabled(prev);
        setSaveError(`Could not save (${res.status}). Your change was undone. ${detail.slice(0, 200)}`.trim());
      }
    } catch (err) {
      setDisabled(prev);
      setSaveError(`Could not save: ${err instanceof Error ? err.message : "network error"}. Your change was undone.`);
    } finally {
      setSaving(false);
    }
  }

  function handleToggle(slug: string, on: boolean) {
    const next = new Set(disabled);
    if (on) next.delete(slug);
    else next.add(slug);
    void persist(next);
  }

  function handleToggleAll(on: boolean) {
    void persist(on ? new Set() : new Set(APP_CATALOG.map((a) => a.slug)));
  }

  function statusOf(app: { slug: string }): AppStatus | null {
    const c = connectorBySlug.get(app.slug);
    if (!c) return { label: "Built-in", tone: "border-white/10 bg-white/[0.04] text-white/45" };
    if (c.credential?.source === "managed_app_connections" && c.credential.is_valid) {
      return { label: "Connected", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" };
    }
    // OAuth connections are created by a successful provider sign-in, so they
    // should read as connected even before a later tool-use timestamp exists.
    if (c.credential?.is_valid && (c.auth_type === "oauth2" || c.credential.last_tested_at)) {
      return { label: "Connected", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" };
    }
    if (c.credential?.is_valid) {
      return { label: "Added", tone: "border-sky-300/25 bg-sky-300/10 text-sky-100" };
    }
    if (c.auth_type === "oauth2") return { label: "Connect", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    if (c.supports_managed_connection) return { label: "Connect", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    if (c.supports_hosted_mcp_connection) return { label: "Connect", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    if (c.auth_type) return { label: "Add access", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
    return { label: "Built-in", tone: "border-white/10 bg-white/[0.04] text-white/45" };
  }

  // Clicking the status pill opens the connect wizard for any connector-backed
  // app (also lets you replace or re-prove an existing key). Built-in apps have
  // nothing to connect.
  function handleStatusClick(app: AppEntry) {
    if (!connectorBySlug.has(app.slug)) return;
    setConnectTarget(app);
  }

  // Buttons say the action (Connect / Add key / Manage); pills say the truth.
  function actionOf(app: AppEntry) {
    const label = actionLabelFor(connectorBySlug.get(app.slug));
    if (!label) return null;
    return { label, onClick: () => setConnectTarget(app) };
  }

  function disconnectActionOf(app: AppEntry) {
    const connector = connectorBySlug.get(app.slug);
    if (!connector?.credential?.is_valid) return null;
    return {
      label: "Disconnect",
      onClick: () => {
        if (!window.confirm(`Disconnect ${app.name}?`)) return;
        setSaving(true);
        setSaveError(null);
        void disconnectApp(app.slug)
          .catch((err) => {
            setSaveError(err instanceof Error ? err.message : "Disconnect failed.");
          })
          .finally(() => setSaving(false));
      },
    };
  }

  async function disconnectApp(slug: string) {
    if (!session) throw new Error("Sign in again to disconnect apps.");
    const res = await fetch("/api/memory-admin?action=admin_disconnect_app", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ platform: slug }),
    });
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) throw new Error(body.error ?? `Disconnect failed with ${res.status}.`);
    await refreshStatus();
    setConnectTarget(null);
  }

  async function beginManagedConnection(slug: string) {
    if (!session) throw new Error("Sign in again to connect apps.");
    const res = await fetch("/api/memory-admin?action=admin_begin_managed_connection", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ platform: slug }),
    });
    const body = (await res.json().catch(() => ({}))) as { connect_url?: string; error?: string };
    if (!res.ok) throw new Error(body.error ?? `Connect failed with ${res.status}.`);
    if (!body.connect_url) throw new Error("The connection provider did not return a sign-in link.");
    window.location.assign(body.connect_url);
  }

  const counts = useMemo(() => lensCounts(APP_CATALOG, connectorBySlug), [connectorBySlug]);
  const lensedApps = useMemo(() => applyLens(APP_CATALOG, lens, connectorBySlug), [lens, connectorBySlug]);

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
            {APP_COUNT} apps · {TOOL_COUNT} actions your AI can reach. All on by default. Turn any off and your AI stops using it.
          </p>
        </div>
      </div>

      <AdminAppsIntro />

      {saveError && (
        <div
          role="alert"
          className="mb-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200"
        >
          {saveError}
        </div>
      )}

      <div className="mb-3">
        <AppLensBar lens={lens} counts={counts} onSelect={selectLens} />
      </div>
      <AppsTable
        apps={lensedApps}
        mode="admin"
        enabled={enabled}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        statusOf={statusOf}
        onStatusClick={handleStatusClick}
        actionOf={actionOf}
        disconnectOf={disconnectActionOf}
        busy={saving}
      />

      {connectTarget && session && connectorBySlug.get(connectTarget.slug) && (
        <ConnectAppModal
          app={connectTarget}
          connector={connectorBySlug.get(connectTarget.slug)!}
          accessToken={session.access_token}
          onClose={() => setConnectTarget(null)}
          onSaved={() => void refreshStatus()}
          isConnected={Boolean(connectorBySlug.get(connectTarget.slug)?.credential?.is_valid)}
          statusLabel={statusOf(connectTarget)?.label ?? null}
          onDisconnect={() => disconnectApp(connectTarget.slug)}
          onStartManagedConnection={() => beginManagedConnection(connectTarget.slug)}
        />
      )}

      {/* Slim footer: where keys and related libraries live */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <FooterLink to="/admin/keychain" icon={<KeyRound className="h-4 w-4 text-[#E2B93B]" />} title="Connections" desc="Manage app connections your AI is allowed to use." />
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
