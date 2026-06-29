// Admin control room for BackstagePass, the encrypted credential vault.
//
// This superuser surface owns the per-tenant On/Off toggle. On = credential
// resolution uses the vault as a source of truth (centralized storage,
// rotation, audit). Off = tools still resolve credentials from inline args /
// env vars / local vault, so they stay functional but lose those benefits.
//
// Auth: like every other admin surface, this authenticates with the Supabase
// login session (session.access_token), NOT a browser-stored API key. The
// /api/backstagepass-settings endpoint resolves that session to the tenant's
// api_key_hash server-side - the same hash the agent runtime derives - so
// flipping this here gates that tenant's agent credential lookups.
//
// Day-to-day credential management (add / reveal / rotate / delete) lives on
// the Passport surface at /admin/keychain; this page links to it rather than
// duplicating it.

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Ticket,
  RefreshCw,
  Loader2,
  ShieldCheck,
  KeyRound,
  RotateCw,
  ScrollText,
  ArrowRight,
} from "lucide-react";

const YELLOW = "#E2B93B";

interface VaultSettings {
  vault_enabled: boolean;
}

function Benefit({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof KeyRound;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Icon className="h-4 w-4 shrink-0" style={{ color: YELLOW }} />
        {title}
      </div>
      <div className="mt-2 text-xs leading-relaxed text-[#9aa]">{body}</div>
    </div>
  );
}

export default function AdminBackstagePass() {
  const { toast } = useToast();
  const { session, loading: sessionLoading } = useSession();
  const authToken = session?.access_token ?? "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(true);

  const load = useCallback(async () => {
    if (!authToken) {
      // Either the session is still resolving (keep the spinner) or the user
      // is genuinely signed out (show a sign-in prompt).
      if (!sessionLoading) {
        setError("Sign in to manage BackstagePass.");
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/backstagepass-settings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const body = (await r.json()) as VaultSettings & { error?: string };
      if (!r.ok) throw new Error(body.error ?? "Failed to load BackstagePass settings");
      setEnabled(body.vault_enabled !== false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [authToken, sessionLoading]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggle = useCallback(
    async (next: boolean) => {
      if (!authToken) {
        toast({
          title: "Sign in first",
          description: "Your login session is needed to save this setting.",
          variant: "destructive",
        });
        return;
      }
      const previous = enabled;
      setEnabled(next);
      setSaving(true);
      try {
        const r = await fetch("/api/backstagepass-settings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vault_enabled: next }),
        });
        const body = (await r.json().catch(() => ({}))) as { error?: string };
        if (!r.ok) throw new Error(body.error ?? "Failed to save");
        toast({
          title: next ? "BackstagePass vault ON" : "BackstagePass vault OFF",
          description: next
            ? "Agents will resolve credentials from the encrypted vault."
            : "Agents fall back to inline / env / local credentials.",
        });
      } catch (e) {
        setEnabled(previous);
        toast({
          title: "Could not save",
          description: e instanceof Error ? e.message : "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    },
    [authToken, enabled, toast],
  );

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" style={{ color: YELLOW }} />
            <h1 className="text-xl font-semibold text-white">BackstagePass</h1>
          </div>
          <p className="mt-1 max-w-xl text-sm text-[#888]">
            The encrypted credential vault that lets your agents pick up API keys
            and tokens just-in-time, without you pasting secrets into a chat or a
            config file. Toggle it for this account below.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#aaa] transition-colors hover:bg-white/5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* The toggle */}
      <div
        className="mt-6 rounded-xl border p-5"
        style={{ borderColor: `${YELLOW}40`, background: `${YELLOW}0A` }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              Use the BackstagePass vault
            </div>
            <div className="mt-1 text-xs text-[#999]">
              {enabled
                ? "ON - agents resolve credentials from the encrypted vault first."
                : "OFF - still functional via inline / env / local credentials, but without the vault's rotation, audit, and portability."}
            </div>
          </div>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#666]" />
          ) : (
            <div className="flex items-center gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin text-[#666]" />}
              <Switch
                checked={enabled}
                onCheckedChange={(v) => void toggle(v)}
                disabled={saving}
                aria-label="Toggle BackstagePass vault"
              />
            </div>
          )}
        </div>
        <div className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] leading-relaxed text-[#666]">
          The switch is reversible either way: the plumbing stays wired whether
          it is on or off. An env override (BACKSTAGEPASS_VAULT_ENABLED) can hard
          set it for self-hosted or development runtimes.
        </div>
      </div>

      {/* What ON buys you */}
      <div className="mt-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#777]">
          What the vault gives you
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Benefit
            icon={KeyRound}
            title="Just-in-time keys"
            body="Agents fetch the key they need at call time, instead of you wiring secrets into every tool or environment."
          />
          <Benefit
            icon={RotateCw}
            title="Rotatable"
            body="Every stored credential is re-encryptable in place, with a last-rotated timestamp and staleness reminders."
          />
          <Benefit
            icon={ScrollText}
            title="Audited"
            body="Every reveal, update, and delete is written to an append-only audit log, scoped to your account."
          />
        </div>
      </div>

      {/* Link to Passport for actual credential management */}
      <Link
        to="/admin/keychain"
        className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[#E2B93B]/30 hover:bg-white/[0.05]"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: YELLOW }} />
          <div>
            <div className="text-sm font-semibold text-white">
              Manage stored credentials (Passport)
            </div>
            <div className="mt-0.5 text-xs text-[#888]">
              Add, reveal, rotate, and remove the keys this vault holds.
            </div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#666]" />
      </Link>
    </div>
  );
}
