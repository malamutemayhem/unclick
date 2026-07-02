import { relativeTime } from "@/lib/relativeTime";
import {
  credentialHealth,
  maskValue,
  type CredentialHealthStatus,
} from "./keychainHelpers";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Eye,
  EyeOff,
  FileClock,
  KeyRound,
  Loader2,
  Plus,
  RefreshCw,
  RotateCw,
  Trash2,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth";
import { ServerKeysTable, type ServerProviderKey } from "@/components/admin/ServerKeysTable";


interface Credential {
  id: string;
  platform: string;
  label: string | null;
  is_valid: boolean;
  health_status?: CredentialHealthStatus;
  last_checked_at?: string | null;
  last_tested_at: string | null;
  last_used_at: string | null;
  last_rotated_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  owner_email?: string | null;
  used_by?: string[];
  expected_fields?: Array<{
    name: string;
    label: string;
    secret: boolean;
  }>;
  supports_connection_test?: boolean;
  rotation_note?: string;
  connector: {
    id: string;
    name: string;
    category: string;
    icon: string | null;
  } | null;
}

interface AuditEntry {
  id: string;
  action: string;
  credential_id: string | null;
  platform_slug: string | null;
  label: string | null;
  success: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

const AI_PROVIDER_CATALOG = [
  { slug: "anthropic", name: "Anthropic", desc: "Claude API keys", placeholder: "sk-ant-..." },
  { slug: "openai", name: "OpenAI", desc: "GPT and embeddings", placeholder: "sk-..." },
  { slug: "openrouter", name: "OpenRouter", desc: "Any model via one key", placeholder: "sk-or-v1-..." },
  { slug: "google-ai", name: "Google AI", desc: "Gemini API keys", placeholder: "AIza..." },
  { slug: "cohere", name: "Cohere", desc: "Command and embeddings", placeholder: "co-..." },
  { slug: "mistral", name: "Mistral", desc: "Mistral model access", placeholder: "..." },
  { slug: "groq", name: "Groq", desc: "Fast inference keys", placeholder: "gsk_..." },
  { slug: "perplexity", name: "Perplexity", desc: "Search and answer API", placeholder: "pplx-..." },
  { slug: "together-ai", name: "Together AI", desc: "Open model inference", placeholder: "..." },
  { slug: "replicate", name: "Replicate", desc: "Hosted model runs", placeholder: "r8_..." },
] as const;

const AI_PROVIDER_SLUGS = new Set(AI_PROVIDER_CATALOG.map((provider) => provider.slug));

const HEALTH_BADGES: Record<CredentialHealthStatus, {
  label: string;
  className: string;
  icon: LucideIcon;
}> = {
  healthy: {
    label: "Healthy",
    className: "border-green-500/20 bg-green-500/10 text-green-400",
    icon: CheckCircle2,
  },
  untested: {
    label: "Untested",
    className: "border-[#E2B93B]/20 bg-[#E2B93B]/10 text-[#E2B93B]",
    icon: AlertTriangle,
  },
  failing: {
    label: "Failing",
    className: "border-red-500/20 bg-red-500/10 text-red-400",
    icon: XCircle,
  },
  stale: {
    label: "Stale",
    className: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    icon: AlertTriangle,
  },
  needs_rotation: {
    label: "Rotate",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    icon: RotateCw,
  },
};

function readLocalApiKey(): string | null {
  try {
    const key = localStorage.getItem("unclick_api_key");
    return key && (key.startsWith("uc_") || key.startsWith("agt_")) ? key : null;
  } catch {
    return null;
  }
}



const timeAgo = (iso: string | null | undefined) => relativeTime(iso, { justNow: true });


function providerFor(slug: string) {
  return AI_PROVIDER_CATALOG.find((provider) => provider.slug === slug);
}

function isAiCredential(credential: Credential): boolean {
  const category = credential.connector?.category?.toLowerCase() ?? "";
  return AI_PROVIDER_SLUGS.has(credential.platform) || category === "ai" || category === "llm";
}


export default function AdminSeatsApi() {
  const { session } = useSession();
  const accessToken = session?.access_token ?? null;
  const authHeader = useMemo(
    () => (accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    [accessToken],
  );

  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(Boolean(session));
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addPrefill, setAddPrefill] = useState<{ provider: string; label: string | null } | null>(null);
  const [revealError, setRevealError] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, Record<string, string>>>({});
  const [revealedAt, setRevealedAt] = useState<Record<string, number>>({});
  const revealedAtRef = useRef(revealedAt);
  revealedAtRef.current = revealedAt;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [revealing, setRevealing] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [testResult, setTestResult] = useState<Record<string, { ok: boolean | null; message: string }>>({});
  const [rotateTarget, setRotateTarget] = useState<Credential | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Credential | null>(null);
  const [auditTarget, setAuditTarget] = useState<Credential | null>(null);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[] | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [serverKeys, setServerKeys] = useState<ServerProviderKey[]>([]);
  const [serverKeyError, setServerKeyError] = useState<string | null>(null);
  const [deletingServerKey, setDeletingServerKey] = useState<Record<string, boolean>>({});

  const fetchCredentials = useCallback(async () => {
    if (!accessToken) {
      setCredentials([]);
      setServerKeys([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    // Account-scoped AI keys (server-scheme) load independently, so a BackstagePass
    // hiccup never hides them and vice versa.
    try {
      const sres = await fetch("/api/ai-provider-key", { headers: authHeader });
      const sbody = await sres.json().catch(() => ({}));
      if (sres.ok) {
        setServerKeys(Array.isArray(sbody.providers) ? sbody.providers : []);
        setServerKeyError(null);
      } else {
        setServerKeys([]);
        setServerKeyError(sbody.error ?? null);
      }
    } catch {
      setServerKeys([]);
    }
    try {
      const response = await fetch("/api/backstagepass?action=list", { headers: authHeader });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `List failed with ${response.status}`);
      setCredentials(Array.isArray(body.data) ? body.data : []);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load API credentials.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, authHeader]);

  async function deleteServerKey(id: string) {
    setDeletingServerKey((current) => ({ ...current, [id]: true }));
    setServerKeyError(null);
    try {
      const response = await fetch(`/api/ai-provider-key?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: authHeader,
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `Delete failed with ${response.status}`);
      await fetchCredentials();
    } catch (deleteError) {
      setServerKeyError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setDeletingServerKey((current) => ({ ...current, [id]: false }));
    }
  }

  useEffect(() => {
    void fetchCredentials();
  }, [fetchCredentials]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const expired = Object.entries(revealedAtRef.current)
        .filter(([, timestamp]) => Date.now() - timestamp >= 60_000)
        .map(([id]) => id);
      if (expired.length === 0) return;
      setRevealed((current) => {
        const next = { ...current };
        for (const id of expired) delete next[id];
        return next;
      });
      setRevealedAt((current) => {
        const next = { ...current };
        for (const id of expired) delete next[id];
        return next;
      });
    }, 5_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const aiCredentials = useMemo(
    () => credentials
      .filter(isAiCredential)
      .sort((a, b) => {
        const aOrder = AI_PROVIDER_CATALOG.findIndex((provider) => provider.slug === a.platform);
        const bOrder = AI_PROVIDER_CATALOG.findIndex((provider) => provider.slug === b.platform);
        const normalizedAOrder = aOrder === -1 ? 99 : aOrder;
        const normalizedBOrder = bOrder === -1 ? 99 : bOrder;
        return normalizedAOrder - normalizedBOrder || displayName(a).localeCompare(displayName(b));
      }),
    [credentials],
  );

  // Server-scheme rows now include app-connection creds (Layer 2 connector vault),
  // so keep only LLM providers on this page. The API is filtered too; this is the
  // belt-and-suspenders guard so the count and table never show a connector.
  const aiServerKeys = useMemo(
    () => serverKeys.filter((key) => AI_PROVIDER_SLUGS.has(key.platform_slug)),
    [serverKeys],
  );

  const healthCounts = useMemo(() => aiCredentials.reduce<Record<CredentialHealthStatus, number>>((counts, credential) => {
    counts[credentialHealth(credential)] += 1;
    return counts;
  }, {
    healthy: 0,
    untested: 0,
    failing: 0,
    stale: 0,
    needs_rotation: 0,
  }), [aiCredentials]);

  const attentionCount = aiCredentials.length - healthCounts.healthy;
  const providerCount = new Set([
    ...aiCredentials.map((credential) => credential.platform),
    ...aiServerKeys.map((key) => key.platform_slug),
  ]).size;

  async function handleReveal(credential: Credential) {
    const localApiKey = readLocalApiKey();
    if (!localApiKey) {
      setRevealError((current) => ({
        ...current,
        [credential.id]: "No UnClick API key is cached in this browser. Re-issue it from You first.",
      }));
      return;
    }
    setRevealing((current) => ({ ...current, [credential.id]: true }));
    setRevealError((current) => ({ ...current, [credential.id]: "" }));
    try {
      const response = await fetch("/api/backstagepass?action=reveal", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ id: credential.id, api_key: localApiKey }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `Reveal failed with ${response.status}`);
      setRevealed((current) => ({ ...current, [credential.id]: body.values ?? {} }));
      setRevealedAt((current) => ({ ...current, [credential.id]: Date.now() }));
    } catch (revealProblem) {
      setRevealError((current) => ({
        ...current,
        [credential.id]: revealProblem instanceof Error ? revealProblem.message : "Reveal failed.",
      }));
    } finally {
      setRevealing((current) => ({ ...current, [credential.id]: false }));
    }
  }

  function hideCredential(credential: Credential) {
    setRevealed((current) => {
      const { [credential.id]: _hidden, ...rest } = current;
      return rest;
    });
    setRevealedAt((current) => {
      const { [credential.id]: _hidden, ...rest } = current;
      return rest;
    });
  }

  async function copyToClipboard(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField((current) => (current === key ? null : current)), 2_000);
    } catch {
      setCopiedField(null);
    }
  }

  async function handleTestConnection(credential: Credential) {
    const localApiKey = readLocalApiKey();
    if (!localApiKey) {
      setTestResult((current) => ({
        ...current,
        [credential.id]: {
          ok: false,
          message: "No UnClick API key is cached in this browser. Re-issue it from You first.",
        },
      }));
      return;
    }
    setTesting((current) => ({ ...current, [credential.id]: true }));
    try {
      const response = await fetch("/api/backstagepass?action=testConnection", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ id: credential.id, api_key: localApiKey, allow_paid: true }),
      });
      const body = await response.json().catch(() => ({}));
      setTestResult((current) => ({
        ...current,
        [credential.id]: {
          ok: response.ok ? body.ok ?? null : false,
          message: body.message ?? body.error ?? `Test failed with ${response.status}`,
        },
      }));
      if (response.ok) await fetchCredentials();
    } catch (testError) {
      setTestResult((current) => ({
        ...current,
        [credential.id]: {
          ok: false,
          message: testError instanceof Error ? testError.message : "Test failed.",
        },
      }));
    } finally {
      setTesting((current) => ({ ...current, [credential.id]: false }));
    }
  }

  async function openAudit(credential: Credential) {
    setAuditTarget(credential);
    setAuditEntries(null);
    setAuditLoading(true);
    try {
      const response = await fetch(
        `/api/backstagepass?action=audit&credential_id=${encodeURIComponent(credential.id)}&limit=50`,
        { headers: authHeader },
      );
      const body = await response.json().catch(() => ({}));
      setAuditEntries(Array.isArray(body.data) ? body.data : []);
    } finally {
      setAuditLoading(false);
    }
  }

  function openAdd(prefill: { provider: string; label: string | null } | null) {
    setAddPrefill(prefill);
    setAddOpen(true);
  }

  if (!accessToken) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-8 text-center">
          <KeyRound className="mx-auto h-8 w-8 text-[#333]" />
          <p className="mt-3 text-sm text-[#888]">Sign in to manage API providers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <section className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Active providers" value={String(providerCount)} />
        <SummaryCard label="Needs attention" value={String(attentionCount)} />
        <SummaryCard label="Untested" value={String(healthCounts.untested)} />
      </section>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
          {error}
        </div>
      )}
      {serverKeyError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
          {serverKeyError}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-[#666]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading API providers...</span>
        </div>
      ) : aiCredentials.length === 0 && aiServerKeys.length === 0 ? (
        <EmptyState onAdd={() => openAdd(null)} />
      ) : (
        <div className="space-y-6">
          {aiServerKeys.length > 0 && (
            <ServerKeysTable
              serverKeys={aiServerKeys}
              accessToken={accessToken}
              deleting={deletingServerKey}
              onDelete={(id) => void deleteServerKey(id)}
              onEdit={(provider, label) => openAdd({ provider, label })}
              onRefresh={() => void fetchCredentials()}
            />
          )}

          {aiCredentials.length > 0 && (
          <section className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Passport AI credentials</h2>
              <p className="mt-0.5 text-xs text-[#666]">
                Passport credentials filtered to API-key-based AI providers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void fetchCredentials()}
              className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#aaa] transition-colors hover:border-[#61C1C4]/40 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {aiCredentials.map((credential) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                revealed={revealed[credential.id] ?? null}
                revealError={revealError[credential.id] ?? ""}
                isRevealing={Boolean(revealing[credential.id])}
                isTesting={Boolean(testing[credential.id])}
                testResult={testResult[credential.id] ?? null}
                copiedField={copiedField}
                onReveal={() => void handleReveal(credential)}
                onHide={() => hideCredential(credential)}
                onCopy={(field, value) => void copyToClipboard(`${credential.id}:${field}`, value)}
                onTest={() => void handleTestConnection(credential)}
                onRotate={() => setRotateTarget(credential)}
                onDelete={() => setDeleteTarget(credential)}
                onAudit={() => void openAudit(credential)}
              />
            ))}
          </div>
          </section>
          )}

          <button
            type="button"
            onClick={() => openAdd(null)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#E2B93B]/30 bg-[#E2B93B]/[0.06] px-4 py-3 text-xs font-semibold text-[#E2B93B] transition-colors hover:border-[#E2B93B]/50 hover:bg-[#E2B93B]/10"
          >
            <Plus className="h-3.5 w-3.5" />
            Add provider
          </button>
        </div>
      )}

      {addOpen && (
        <AddProviderModal
          authHeader={authHeader}
          initialProvider={addPrefill?.provider}
          initialLabel={addPrefill?.label ?? undefined}
          onClose={() => {
            setAddOpen(false);
            setAddPrefill(null);
          }}
          onSaved={() => {
            setAddOpen(false);
            setAddPrefill(null);
            void fetchCredentials();
          }}
        />
      )}
      {rotateTarget && (
        <RotateCredentialModal
          credential={rotateTarget}
          authHeader={authHeader}
          onClose={() => setRotateTarget(null)}
          onSaved={() => {
            setRotateTarget(null);
            void fetchCredentials();
          }}
        />
      )}
      {deleteTarget && (
        <DeleteCredentialModal
          credential={deleteTarget}
          authHeader={authHeader}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => {
            setDeleteTarget(null);
            void fetchCredentials();
          }}
        />
      )}
      {auditTarget && (
        <AuditDrawer
          credential={auditTarget}
          entries={auditEntries}
          loading={auditLoading}
          onClose={() => setAuditTarget(null)}
        />
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight text-white">API Models</h1>
      <p className="max-w-2xl text-sm leading-6 text-[#888]">
        Your AI provider keys, encrypted to your account and unaffected by key rotation. Connect
        once and every seat can use them.
      </p>
    </header>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-wide text-[#666]">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.03] p-8 text-center">
      <KeyRound className="mx-auto h-8 w-8 text-[#333]" />
      <p className="mt-3 text-sm text-[#888]">No AI provider API keys yet</p>
      <p className="mt-1 text-xs text-[#555]">Add a provider key and every seat can run on it.</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-3 py-2 text-xs font-semibold text-[#E2B93B] transition-colors hover:bg-[#E2B93B]/20"
      >
        <Plus className="h-3.5 w-3.5" />
        Add provider
      </button>
    </div>
  );
}

function displayName(credential: Credential): string {
  return credential.connector?.name ?? providerFor(credential.platform)?.name ?? credential.platform;
}

function CredentialCard({
  credential,
  revealed,
  revealError,
  isRevealing,
  isTesting,
  testResult,
  copiedField,
  onReveal,
  onHide,
  onCopy,
  onTest,
  onRotate,
  onDelete,
  onAudit,
}: {
  credential: Credential;
  revealed: Record<string, string> | null;
  revealError: string;
  isRevealing: boolean;
  isTesting: boolean;
  testResult: { ok: boolean | null; message: string } | null;
  copiedField: string | null;
  onReveal: () => void;
  onHide: () => void;
  onCopy: (field: string, value: string) => void;
  onTest: () => void;
  onRotate: () => void;
  onDelete: () => void;
  onAudit: () => void;
}) {
  const health = credentialHealth(credential);
  const badge = HEALTH_BADGES[health];
  const HealthIcon = badge.icon;
  const isOpen = Boolean(revealed);
  const providerName = displayName(credential);
  const lastChecked = credential.last_checked_at ?? credential.last_tested_at;
  const fields = credential.expected_fields?.filter((field) => field.name || field.label) ?? [];

  return (
    <article className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-sm font-semibold text-[#888]">
            {credential.connector?.icon ?? providerName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-white">{providerName}</h2>
            <p className="truncate text-[11px] text-[#666]">
              {credential.label ?? "default"} - added {timeAgo(credential.created_at)}
            </p>
          </div>
        </div>

        <span className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}>
          <HealthIcon className="h-3 w-3" />
          {badge.label}
        </span>
      </div>

      <dl className="mt-4 grid gap-2 border-t border-white/[0.04] pt-3 text-[11px] sm:grid-cols-2">
        <div>
          <dt className="text-[#555]">Last tested</dt>
          <dd className="mt-0.5 text-[#ccc]">{timeAgo(lastChecked)}</dd>
        </div>
        <div>
          <dt className="text-[#555]">Last used</dt>
          <dd className="mt-0.5 text-[#ccc]">{timeAgo(credential.last_used_at)}</dd>
        </div>
        <div>
          <dt className="text-[#555]">Owner</dt>
          <dd className="mt-0.5 truncate text-[#ccc]">{credential.owner_email ?? "This account"}</dd>
        </div>
        <div>
          <dt className="text-[#555]">Automated test</dt>
          <dd className="mt-0.5 text-[#ccc]">{credential.supports_connection_test === false ? "Not available yet" : "Available"}</dd>
        </div>
      </dl>

      {fields.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] text-[#555]">Expected fields</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {fields.map((field) => (
              <span key={`${credential.id}-${field.name}`} className="rounded border border-white/[0.05] bg-black/20 px-1.5 py-0.5 font-mono text-[10px] text-[#aaa]">
                {field.label || field.name}{field.secret ? " - secret" : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {credential.rotation_note && (
        <p className="mt-3 text-[11px] leading-5 text-[#777]">{credential.rotation_note}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <IconButton onClick={isOpen ? onHide : onReveal} title={isOpen ? "Hide values" : "Reveal values"} disabled={isRevealing}>
          {isRevealing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : isOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </IconButton>
        <IconButton onClick={onTest} title={credential.supports_connection_test === false ? "No automated probe yet" : "Test connection"} disabled={isTesting}>
          {isTesting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
        </IconButton>
        <IconButton onClick={onRotate} title="Rotate API key">
          <RotateCw className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton onClick={onAudit} title="View audit log">
          <FileClock className="h-3.5 w-3.5" />
        </IconButton>
        <IconButton onClick={onDelete} title="Delete API key" danger>
          <Trash2 className="h-3.5 w-3.5" />
        </IconButton>
      </div>

      {revealError && <p className="mt-3 text-[11px] text-red-400">{revealError}</p>}

      {testResult && (
        <p className={`mt-3 text-[11px] ${testResult.ok === true ? "text-green-400" : testResult.ok === false ? "text-red-400" : "text-[#888]"}`}>
          {testResult.ok === true ? "Connection OK. " : testResult.ok === false ? "Connection failed. " : ""}
          {testResult.message}
        </p>
      )}

      {revealed && (
        <div className="mt-3 space-y-1.5 rounded-lg border border-white/[0.04] bg-black/30 p-3">
          {Object.entries(revealed).map(([field, value]) => {
            const copyKey = `${credential.id}:${field}`;
            return (
              <div key={field} className="flex items-center justify-between gap-3 text-[11px]">
                <span className="shrink-0 font-mono text-[#666]">{field}</span>
                <code className="min-w-0 flex-1 truncate font-mono text-[#ccc]">{maskValue(String(value))}</code>
                <button
                  type="button"
                  onClick={() => onCopy(field, String(value))}
                  className="rounded p-1 text-[#666] transition-colors hover:text-[#E2B93B]"
                  title="Copy full value"
                >
                  {copiedField === copyKey ? <ClipboardCheck className="h-3 w-3 text-green-400" /> : <Clipboard className="h-3 w-3" />}
                </button>
              </div>
            );
          })}
          <p className="border-t border-white/[0.04] pt-2 text-[10px] text-[#444]">
            Auto-hides after 60s. Values stay masked on-screen.
          </p>
        </div>
      )}
    </article>
  );
}

function IconButton({
  children,
  onClick,
  title,
  disabled = false,
  danger = false,
}: {
  children: ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5 text-[#888] transition-colors hover:bg-white/[0.05] disabled:opacity-40 ${
        danger ? "hover:border-red-500/30 hover:text-red-400" : "hover:border-[#61C1C4]/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-xl border border-white/[0.08] bg-[#0b2533] p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#888] transition-colors hover:bg-white/[0.04] hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AddProviderModal({
  authHeader,
  initialProvider,
  initialLabel,
  onClose,
  onSaved,
}: {
  authHeader: Record<string, string>;
  initialProvider?: string;
  initialLabel?: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [providerSlug, setProviderSlug] = useState(initialProvider ?? AI_PROVIDER_CATALOG[0].slug);
  const [label, setLabel] = useState(initialLabel ?? "");
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const provider = providerFor(providerSlug) ?? AI_PROVIDER_CATALOG[0];
  const replacing = Boolean(initialProvider);

  async function save() {
    if (!secret.trim()) {
      setError("API key is required.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      // Account-scoped, login-authed save: no cached UnClick key needed, and the
      // key survives master-key rotation (see api/ai-provider-key.ts).
      const response = await fetch("/api/ai-provider-key", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: providerSlug,
          label: label.trim() || null,
          api_key: secret.trim(),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `Add failed with ${response.status}`);
      onSaved();
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : "Add failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalShell title={replacing ? `Replace ${provider.name} key` : "Add AI provider"} onClose={onClose}>
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-[11px] text-[#888]">Provider</span>
          <select
            value={providerSlug}
            onChange={(event) => setProviderSlug(event.target.value)}
            disabled={replacing}
            className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white focus:border-[#E2B93B]/40 focus:outline-none disabled:opacity-60"
          >
            {AI_PROVIDER_CATALOG.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>

        <p className="rounded-lg border border-white/[0.05] bg-white/[0.03] p-3 text-xs leading-5 text-[#888]">
          {provider.desc}. Encrypted to your account; usable by every seat and unaffected by key rotation.
        </p>

        <label className="block">
          <span className="mb-1 block text-[11px] text-[#888]">Label</span>
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="default"
            className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#444] focus:border-[#E2B93B]/40 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[11px] text-[#888]">API key</span>
          <input
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            type="password"
            placeholder={provider.placeholder}
            className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#444] focus:border-[#E2B93B]/40 focus:outline-none"
          />
        </label>

        {error && <p className="text-[11px] text-red-400">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] hover:text-white">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={busy}
            className="rounded-lg bg-[#E2B93B] px-3 py-2 text-xs font-medium text-black hover:bg-[#E2B93B]/90 disabled:opacity-50"
          >
            {busy ? "Saving..." : replacing ? "Replace key" : "Add provider"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function RotateCredentialModal({
  credential,
  authHeader,
  onClose,
  onSaved,
}: {
  credential: Credential;
  authHeader: Record<string, string>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    const localApiKey = readLocalApiKey();
    if (!localApiKey) {
      setError("No UnClick API key is cached in this browser. Re-issue it from You first.");
      return;
    }
    if (!secret.trim()) {
      setError("Replacement API key is required.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/backstagepass?action=update", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          id: credential.id,
          values: { api_key: secret.trim() },
          api_key: localApiKey,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `Update failed with ${response.status}`);
      onSaved();
    } catch (rotateError) {
      setError(rotateError instanceof Error ? rotateError.message : "Rotate failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalShell title={`Rotate ${displayName(credential)}`} onClose={onClose}>
      <p className="mb-3 text-xs leading-5 text-[#888]">
        Replace the stored API key after rotating it at the provider.
      </p>
      <input
        value={secret}
        onChange={(event) => setSecret(event.target.value)}
        type="password"
        placeholder="New API key"
        className="w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#444] focus:border-[#E2B93B]/40 focus:outline-none"
        autoFocus
      />
      {error && <p className="mt-2 text-[11px] text-red-400">{error}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] hover:text-white">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => void save()}
          disabled={busy}
          className="rounded-lg bg-[#E2B93B] px-3 py-2 text-xs font-medium text-black hover:bg-[#E2B93B]/90 disabled:opacity-50"
        >
          {busy ? "Rotating..." : "Rotate"}
        </button>
      </div>
    </ModalShell>
  );
}

function DeleteCredentialModal({
  credential,
  authHeader,
  onClose,
  onDeleted,
}: {
  credential: Credential;
  authHeader: Record<string, string>;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/backstagepass?action=delete", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ id: credential.id }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? `Delete failed with ${response.status}`);
      onDeleted();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ModalShell title="Delete API key?" onClose={onClose}>
      <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        <p className="text-xs text-red-400">
          This removes {displayName(credential)} from Passport. The audit log stays available.
        </p>
      </div>
      {error && <p className="mt-2 text-[11px] text-red-400">{error}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] hover:text-white">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => void remove()}
          disabled={busy}
          className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-500/90 disabled:opacity-50"
        >
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </ModalShell>
  );
}

function AuditDrawer({
  credential,
  entries,
  loading,
  onClose,
}: {
  credential: Credential;
  entries: AuditEntry[] | null;
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70" onClick={onClose}>
      <aside
        className="h-full w-full max-w-md overflow-y-auto border-l border-white/[0.08] bg-[#0b2533] p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Audit log</h3>
            <p className="mt-1 text-[11px] text-[#666]">{displayName(credential)} credential events</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#888] transition-colors hover:bg-white/[0.04] hover:text-white"
            aria-label="Close audit log"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 py-12 text-[#666]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading audit...</span>
          </div>
        ) : !entries || entries.length === 0 ? (
          <p className="py-12 text-center text-xs text-[#666]">No audit events yet.</p>
        ) : (
          <ul className="space-y-2">
            {entries.map((entry) => (
              <li key={entry.id} className="rounded-lg border border-white/[0.04] bg-white/[0.03] px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-xs font-medium text-white">
                    {entry.success ? <CheckCircle2 className="h-3 w-3 text-green-400" /> : <XCircle className="h-3 w-3 text-red-400" />}
                    {entry.action}
                  </span>
                  <span className="text-[10px] text-[#666]">{timeAgo(entry.created_at)}</span>
                </div>
                <p className="mt-1 truncate text-[11px] text-[#666]">{entry.label ?? entry.platform_slug ?? "API provider"}</p>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
