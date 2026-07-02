// ============================================================
// ServerKeysTable - the account's AI provider keys, as a table.
//
// Columns: Provider | API key (masked, with edit) | Balance | Last used |
// Status | delete. Balance is live for OpenRouter (via /api/ai-provider-balance);
// providers without a key-balance API show a dash. Keys are server-scheme
// (encrypted to the account, rotation-proof) so they are never revealed - the
// edit pen re-opens the add flow to replace the key.
// ============================================================

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Pencil, Trash2, Loader2, RefreshCw } from "lucide-react";
import { relativeTime } from "@/lib/relativeTime";

export interface ServerProviderKey {
  id: string;
  platform_slug: string;
  label: string | null;
  is_valid: boolean | null;
  last_tested_at: string | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

const PROVIDER_NAMES: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  openrouter: "OpenRouter",
  "google-ai": "Google AI",
  cohere: "Cohere",
  mistral: "Mistral",
  groq: "Groq",
  perplexity: "Perplexity",
  "together-ai": "Together AI",
  replicate: "Replicate",
};

interface Balance {
  supported?: boolean;
  used?: number | null;
  limit?: number | null;
  remaining?: number | null;
  error?: string;
}

const timeAgo = (iso: string | null | undefined) => relativeTime(iso, { justNow: true });
const money = (n: number) => `$${n.toFixed(2)}`;

function BalanceCell({ item, accessToken }: { item: ServerProviderKey; accessToken: string | null }) {
  const [bal, setBal] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken || item.platform_slug !== "openrouter") return;
    let cancelled = false;
    setLoading(true);
    const qs = `platform=${encodeURIComponent(item.platform_slug)}${item.label ? `&label=${encodeURIComponent(item.label)}` : ""}`;
    fetch(`/api/ai-provider-balance?${qs}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => {
        if (!cancelled && b) setBal(b as Balance);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken, item.platform_slug, item.label]);

  if (item.platform_slug !== "openrouter") {
    return <span className="text-[#555]" title="This provider has no balance API">-</span>;
  }
  if (loading) return <Loader2 className="h-3.5 w-3.5 animate-spin text-[#666]" />;
  if (!bal || bal.error || bal.supported === false) {
    return <span className="text-[#555]">-</span>;
  }

  const { remaining, limit, used } = bal;
  if (typeof remaining === "number") {
    const pct = typeof limit === "number" && limit > 0 ? Math.max(0, Math.min(1, remaining / limit)) : null;
    return (
      <div className="min-w-[72px]">
        <span className="text-sm text-white">{money(remaining)}</span>
        {pct != null && (
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-700"
              style={{ width: `${pct * 100}%` }}
            />
          </div>
        )}
      </div>
    );
  }
  if (typeof used === "number") {
    return <span className="text-sm text-[#aaa]">{money(used)} used</span>;
  }
  return <span className="text-[#555]">-</span>;
}

export function ServerKeysTable({
  serverKeys,
  accessToken,
  deleting,
  onDelete,
  onEdit,
  onRefresh,
}: {
  serverKeys: ServerProviderKey[];
  accessToken: string | null;
  deleting: Record<string, boolean>;
  onDelete: (id: string) => void;
  onEdit: (slug: string, label: string | null) => void;
  onRefresh: () => void;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-white">AI provider keys</h2>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#aaa] transition-colors hover:border-[#61C1C4]/40 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-wide text-[#666]">
              <th className="px-4 py-2.5 font-medium">Provider</th>
              <th className="px-4 py-2.5 font-medium">API key</th>
              <th className="px-4 py-2.5 font-medium">Balance</th>
              <th className="px-4 py-2.5 font-medium">Last used</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {serverKeys.map((item) => {
              const name = PROVIDER_NAMES[item.platform_slug] ?? item.platform_slug;
              const connected = item.is_valid !== false;
              return (
                <tr key={item.id} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-white">{name}</div>
                    {item.label && <div className="text-[11px] text-[#666]">{item.label}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-[#888]">{"•".repeat(8)} managed</code>
                      <button
                        type="button"
                        onClick={() => onEdit(item.platform_slug, item.label)}
                        className="text-[#666] transition-colors hover:text-white"
                        title="Replace key"
                        aria-label="Replace key"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <BalanceCell item={item} accessToken={accessToken} />
                  </td>
                  <td className="px-4 py-3 text-xs text-[#aaa]">{timeAgo(item.last_used_at)}</td>
                  <td className="px-4 py-3">
                    {connected ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-400">
                        <AlertTriangle className="h-3 w-3" />
                        Needs attention
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {confirmId === item.id ? (
                      <span className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onDelete(item.id);
                            setConfirmId(null);
                          }}
                          disabled={Boolean(deleting[item.id])}
                          className="inline-flex items-center gap-1 rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                        >
                          {deleting[item.id] ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmId(null)}
                          className="rounded-md border border-white/[0.08] px-2 py-1 text-[10px] text-[#aaa] hover:text-white"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(item.id)}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5 text-[#888] transition-colors hover:border-red-500/30 hover:text-red-400"
                        title="Delete key"
                        aria-label="Delete key"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
