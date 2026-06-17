// Connection wizard for apps that need setup on the admin Apps page. Click the
// status pill -> this modal opens -> paste the key ->
// Submit. The server (admin_connect_app) live-tests the credential against the
// platform's test endpoint BEFORE storing it:
//   - test passes  -> stored, green "Connected, live-tested"
//   - test fails   -> NOT stored, the provider's rejection is shown
//   - no test path -> stored, amber "Saved, not yet proven"
// So a green tick is always a proven connection, never an assumption.

import { useState } from "react";
import { CheckCircle2, ExternalLink, KeyRound, Loader2, X, XCircle, AlertTriangle } from "lucide-react";
import type { AppEntry } from "@/lib/appCatalog";
import { CONNECTORS } from "@/lib/connectors";
import connectorSetupData from "@/data/connector-setup.generated.json";

interface ConnectorSetupRow {
  displayName?: string;
  credential?: string;
  arg?: string;
  envVar?: string;
  setupUrl?: string;
  note?: string;
}

const CONNECTOR_SETUP: Record<string, ConnectorSetupRow> =
  (connectorSetupData as { connectors: Record<string, ConnectorSetupRow> }).connectors;

export interface ConnectableConnector {
  id: string;
  auth_type?: "oauth2" | "api_key" | "bot_token";
  setup_url?: string | null;
  credential?: { is_valid: boolean; last_tested_at: string | null } | null;
}

interface ConnectAppModalProps {
  app: AppEntry;
  connector: ConnectableConnector;
  accessToken: string;
  onClose: () => void;
  /** Called after a credential was stored, so the caller can refresh statuses. */
  onSaved: () => void;
  isConnected?: boolean;
  statusLabel?: string | null;
  onDisconnect?: () => Promise<void> | void;
}

type Outcome =
  | { kind: "connected"; message: string }
  | { kind: "saved_unproven"; message: string }
  | { kind: "rejected"; message: string };

function readLocalApiKey(): string | null {
  try {
    return localStorage.getItem("unclick_api_key");
  } catch {
    return null;
  }
}

export function ConnectAppModal({
  app,
  connector,
  accessToken,
  onClose,
  onSaved,
  isConnected = false,
  statusLabel = null,
  onDisconnect,
}: ConnectAppModalProps) {
  const setup = CONNECTOR_SETUP[app.slug];
  const [credential, setCredential] = useState("");
  const [busy, setBusy] = useState(false);
  const [disconnectBusy, setDisconnectBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disconnectError, setDisconnectError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const credentialLabel = setup?.credential ?? "API key";
  const setupUrl = setup?.setupUrl ?? connector.setup_url ?? null;
  const isOAuth = connector.auth_type === "oauth2";
  const fieldCount = CONNECTORS[app.slug]?.credentialFields.length ?? 1;
  const needsFullConnectionPage = !isOAuth && fieldCount > 1;

  async function submit() {
    const apiKey = readLocalApiKey();
    if (!apiKey) {
      setError("Your UnClick API key is not cached in this browser. Visit the You page (/admin/you) to claim it, then retry.");
      return;
    }
    if (!credential.trim()) {
      setError(`Paste your ${credentialLabel} first.`);
      return;
    }
    setBusy(true);
    setError(null);
    setOutcome(null);
    try {
      const res = await fetch("/api/memory-admin?action=admin_connect_app", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ platform: app.slug, credential: credential.trim(), api_key: apiKey }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean | null;
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(body.error ?? `Connect failed with ${res.status}.`);
        return;
      }
      if (body.ok === true) {
        setOutcome({ kind: "connected", message: body.message ?? "Credential verified." });
        setCredential("");
        onSaved();
      } else if (body.ok === null) {
        setOutcome({
          kind: "saved_unproven",
          message: "Connection added. This app has no automatic live test yet, so it is marked as added until its first real use.",
        });
        setCredential("");
        onSaved();
      } else {
        setOutcome({ kind: "rejected", message: body.message ?? "The platform rejected this credential. Nothing was stored." });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Connect failed.");
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    if (!onDisconnect) return;
    setDisconnectBusy(true);
    setDisconnectError(null);
    try {
      await onDisconnect();
    } catch (e) {
      setDisconnectError(e instanceof Error ? e.message : "Disconnect failed.");
    } finally {
      setDisconnectBusy(false);
    }
  }

  const disconnectButton = isConnected && onDisconnect ? (
    <button
      type="button"
      onClick={() => void disconnect()}
      disabled={disconnectBusy}
      className="rounded-lg border border-red-400/25 px-3 py-2 text-xs font-medium text-red-200 transition-colors hover:bg-red-400/10 disabled:opacity-50"
    >
      {disconnectBusy ? "Disconnecting..." : "Disconnect"}
    </button>
  ) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-xl border border-white/[0.08] bg-[#101418] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
            <KeyRound className="h-4 w-4 text-[#E2B93B]" />
            {isConnected ? "Manage" : "Connect"} {app.name}
          </h3>
          <button onClick={onClose} className="rounded-md p-1 text-[#888] transition-colors hover:bg-white/[0.04] hover:text-white" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {isConnected && (
          <div role="status" className="mb-3 flex items-start gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-[11px] leading-4 text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              <strong>{statusLabel ?? "Connected"}.</strong> {app.name} is available while this app stays turned on.
            </span>
          </div>
        )}

        {isOAuth || needsFullConnectionPage ? (
          <div className="text-xs leading-5 text-white/60">
            <p>
              {needsFullConnectionPage
                ? `${app.name} needs a few fields, so it uses the full connection page instead of this quick key box.`
                : isConnected
                  ? `Reconnect ${app.name} if you want to refresh permissions or switch accounts.`
                  : `${app.name} connects with a provider sign-in instead of a pasted key.`}
            </p>
            {setup?.note && <p className="mt-2 text-[11px] leading-4 text-white/45">{setup.note}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href={`/connect/${app.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#61C1C4] px-3 py-2 font-medium text-black hover:bg-[#61C1C4]/90"
              >
                {needsFullConnectionPage
                  ? isConnected
                    ? `Update ${app.name} connection`
                    : `Open ${app.name} connection page`
                  : isConnected
                    ? `Reconnect ${app.name}`
                    : `Continue to ${app.name} login`}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {disconnectButton}
            </div>
            {disconnectError && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{disconnectError}</p>
            )}
          </div>
        ) : (
          <>
            <p className="text-xs leading-5 text-white/60">
              Paste your {app.name} {credentialLabel}. It is tested first; if the platform accepts it, this app shows as connected.
            </p>
            {setup?.note && <p className="mt-2 text-[11px] leading-4 text-white/45">{setup.note}</p>}
            {setupUrl && (
              <a
                href={setupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#9be4e6] hover:underline"
              >
                Where do I get my {credentialLabel}?
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            <input
              type="password"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) void submit();
              }}
              placeholder={`Paste ${credentialLabel} here`}
              autoFocus
              className="mt-3 w-full rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[#444] focus:border-[#E2B93B]/40 focus:outline-none"
            />

            {error && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{error}</p>
            )}

            {outcome && (
              <div
                role="status"
                className={`mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-[11px] leading-4 ${
                  outcome.kind === "connected"
                    ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                    : outcome.kind === "saved_unproven"
                      ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                      : "border-red-400/30 bg-red-400/10 text-red-200"
                }`}
              >
                {outcome.kind === "connected" && <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                {outcome.kind === "saved_unproven" && <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                {outcome.kind === "rejected" && <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                <span>
                  {outcome.kind === "connected" && <strong>Connected, live-tested. </strong>}
                  {outcome.message}
                </span>
              </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <div className="mr-auto">
                {disconnectButton}
              </div>
              <div className="flex gap-2">
                <button onClick={onClose} className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] hover:text-white">
                  {outcome && outcome.kind !== "rejected" ? "Done" : "Cancel"}
                </button>
                <button
                  onClick={() => void submit()}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#E2B93B] px-3 py-2 text-xs font-medium text-black hover:bg-[#E2B93B]/90 disabled:opacity-50"
                >
                  {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {busy ? "Testing..." : isConnected ? "Test and update" : "Test and connect"}
                </button>
              </div>
            </div>
            {disconnectError && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{disconnectError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
