/**
 * WorkerKeysCard - manage static agt_ "worker keys" (/admin/you)
 *
 * A worker key is a static agt_* UnClick key for headless / CI / cloud agents.
 * Unlike the interactive login, a worker key carried in the connection URL
 * re-authorizes itself, so an unattended session reconnects after an idle drop
 * instead of going dark. Worker keys share the account's memory and connections
 * but are independently revocable, and rotating the main uc_ key never breaks
 * them.
 *
 * Talks to /api/worker-keys (login-authed via the Supabase session JWT):
 *   POST   -> mint (returns the plaintext once)
 *   GET    -> list (masked prefix only)
 *   DELETE -> revoke by id
 */

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import {
  Bot,
  Copy,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Trash2,
  AlertTriangle,
  Plus,
} from "lucide-react";

const MCP_BASE_URL = "https://unclick.world/api/mcp";

interface WorkerKeyRow {
  id: string;
  label: string | null;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}

interface MintedKey {
  id: string;
  api_key: string;
  prefix: string;
  label: string | null;
}

function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "never";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function WorkerKeysCard() {
  const { session } = useSession();
  const token = session?.access_token ?? null;

  const [keys, setKeys] = useState<WorkerKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // The freshly minted key is held in memory only and shown exactly once. After
  // dismissal or reload only the masked prefix in the list remains.
  const [minted, setMinted] = useState<MintedKey | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const [revokingId, setRevokingId] = useState<string | null>(null);

  const loadKeys = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setListError(null);
    try {
      const res = await fetch("/api/worker-keys", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = (await res.json()) as { worker_keys?: WorkerKeyRow[]; error?: string };
      if (!res.ok) {
        setListError(body.error ?? "Could not load worker keys.");
        return;
      }
      setKeys(body.worker_keys ?? []);
    } catch (e) {
      setListError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    void loadKeys();
  }, [token, loadKeys]);

  async function handleCreate() {
    if (!token || creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/worker-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ label: label.trim() || undefined }),
      });
      const body = (await res.json()) as MintedKey & { error?: string };
      if (!res.ok || !body.api_key) {
        setCreateError(body.error ?? "Could not create a worker key.");
        return;
      }
      setMinted({ id: body.id, api_key: body.api_key, prefix: body.prefix, label: body.label });
      setRevealed(false);
      setLabel("");
      await loadKeys();
    } catch (e) {
      setCreateError((e as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(id: string) {
    if (!token || revokingId) return;
    setRevokingId(id);
    try {
      const res = await fetch(`/api/worker-keys?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
        // If the just-minted key was revoked, drop its one-time reveal too.
        setMinted((prev) => (prev?.id === id ? null : prev));
      }
    } finally {
      setRevokingId(null);
    }
  }

  async function copy(text: string, mark: (v: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      mark(true);
      window.setTimeout(() => mark(false), 2_000);
    } catch {
      // Clipboard writes can be blocked; fail silent.
    }
  }

  const workerUrl = minted ? `${MCP_BASE_URL}?key=${minted.api_key}` : "";

  return (
    <div id="you-worker-keys" className="scroll-mt-24 rounded-xl border border-white/[0.06] bg-[#111111] p-6">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
        <Bot className="h-4 w-4 text-[#E2B93B]" />
        Worker Keys
        <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">
          Headless agents
        </span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#888]">
        Static keys for cloud, CI, or headless agents. A worker key carried in the connection URL
        reconnects itself, so an unattended session never goes dark. Each key shares your memory and
        connections, is revocable on its own, and survives rotating your main key.
      </p>

      {/* Create */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value.slice(0, 80))}
          placeholder="Label (e.g. CI runner, laptop agent)"
          aria-label="Worker key label"
          className="min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-xs text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#61C1C4]/50"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating || !token}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#61C1C4] px-3 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
          {creating ? "Creating..." : "Create worker key"}
        </button>
      </div>
      {createError && <p className="mt-2 text-[11px] text-red-400">{createError}</p>}

      {/* One-time reveal of a freshly minted key */}
      {minted && (
        <div className="mt-4 rounded-lg border border-[#E2B93B]/30 bg-[#E2B93B]/5 p-3">
          <div className="flex items-start gap-2 text-xs text-[#E2B93B]">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Copy this worker key now. It is shown only once and cannot be retrieved later. Treat the
              URL like a password.
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 truncate rounded bg-[#0A0A0A] px-3 py-2 font-mono text-xs text-white">
              {revealed ? minted.api_key : `${minted.prefix}${"•".repeat(12)}`}
            </code>
            <button
              onClick={() => setRevealed((v) => !v)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
              title={revealed ? "Hide key" : "Reveal key"}
            >
              {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {revealed ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={() => copy(minted.api_key, setCopiedKey)}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#61C1C4]/35 bg-[#61C1C4]/10 px-3 py-2 text-xs font-semibold text-[#9edfe1] transition-colors hover:bg-[#61C1C4]/15"
              title="Copy worker key"
            >
              {copiedKey ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedKey ? "Copied" : "Copy key"}
            </button>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Connection URL (self-reconnecting)
            </p>
            <div className="mt-1.5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <code className="min-w-0 flex-1 truncate rounded bg-black/30 px-3 py-2 font-mono text-xs text-white/70">
                {revealed ? workerUrl : `${MCP_BASE_URL}?key=${minted.prefix}${"•".repeat(12)}`}
              </code>
              <button
                onClick={() => copy(workerUrl, setCopiedUrl)}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
              >
                {copiedUrl ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedUrl ? "Copied" : "Copy URL"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="mt-5">
        {loading ? (
          <div className="flex items-center gap-2 py-6 text-[#666]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Loading worker keys...</span>
          </div>
        ) : listError ? (
          <p className="text-[11px] text-red-400">{listError}</p>
        ) : keys.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/[0.08] p-4 text-center">
            <p className="text-xs text-[#666]">
              No worker keys yet. Create one for any headless or CI agent that needs to stay connected on its own.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/[0.06]">
            {keys.map((k, index) => (
              <div
                key={k.id}
                className={`flex flex-col gap-2 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between ${
                  index > 0 ? "border-t border-white/[0.06]" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{k.label || "worker"}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-white/45">
                    <code className="font-mono text-white/60">{k.key_prefix}...</code>
                    <span>created {timeAgo(k.created_at)}</span>
                    <span>last used {timeAgo(k.last_used_at)}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRevoke(k.id)}
                  disabled={revokingId === k.id}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                >
                  {revokingId === k.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  {revokingId === k.id ? "Revoking..." : "Revoke"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
