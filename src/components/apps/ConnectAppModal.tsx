// Connection wizard for apps that need setup on the admin Apps page. Click the
// status pill -> this modal opens -> paste the key ->
// Submit. The server (admin_connect_app) live-tests the credential against the
// platform's test endpoint BEFORE storing it:
//   - test passes  -> stored, green "Connected, live-tested"
//   - test fails   -> NOT stored, the provider's rejection is shown
//   - no test path -> stored, shown as Connected while internal proof remains separate
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
  supports_managed_connection?: boolean;
  supports_hosted_mcp_connection?: boolean;
  credential?: {
    is_valid: boolean;
    last_tested_at: string | null;
    connection_state?: "connected" | "untested" | "pending" | "failing" | "stale" | "missing";
  } | null;
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
  onStartManagedConnection?: () => Promise<void> | void;
  onStartHostedMcpLogin?: () => Promise<void> | void;
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
  onStartManagedConnection,
  onStartHostedMcpLogin,
}: ConnectAppModalProps) {
  const setup = CONNECTOR_SETUP[app.slug];
  const [credential, setCredential] = useState("");
  const [busy, setBusy] = useState(false);
  const [disconnectBusy, setDisconnectBusy] = useState(false);
  const [managedBusy, setManagedBusy] = useState(false);
  const [hostedBusy, setHostedBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disconnectError, setDisconnectError] = useState<string | null>(null);
  const [managedError, setManagedError] = useState<string | null>(null);
  const [hostedError, setHostedError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const credentialLabel = setup?.credential ?? "API key";
  const setupUrl = setup?.setupUrl ?? connector.setup_url ?? null;
  const isOAuth = connector.auth_type === "oauth2";
  const fieldCount = CONNECTORS[app.slug]?.credentialFields.length ?? 1;
  const needsFullConnectionPage = !isOAuth && fieldCount > 1;
  const usesManagedConnection = connector.supports_managed_connection === true && Boolean(onStartManagedConnection);
  const usesHostedMcpConnection = connector.supports_hosted_mcp_connection === true && !usesManagedConnection;
  const hostedApiKeyCredentialLabel = app.slug === "higgsfield" ? "Cloud API key" : credentialLabel;
  const hostedApiKeySetupUrl = app.slug === "higgsfield" ? "https://cloud.higgsfield.ai/api-keys" : setupUrl;
  const hasSavedCredential = Boolean(connector.credential?.is_valid);
  const hasSavedConnection = isConnected || hasSavedCredential;
  const modalVerb = hasSavedConnection ? "Manage" : "Connect";
  const savedStatusTitle = statusLabel ?? "Connected";
  const savedStatusBody = `${app.name} is connected in UnClick. UnClick can use this connection across your devices.`;

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

  async function startManagedConnection() {
    if (!onStartManagedConnection) return;
    setManagedBusy(true);
    setManagedError(null);
    try {
      await onStartManagedConnection();
    } catch (e) {
      setManagedError(e instanceof Error ? e.message : "Connect failed.");
    } finally {
      setManagedBusy(false);
    }
  }

  async function startHostedMcpLogin() {
    if (!onStartHostedMcpLogin) return;
    setHostedBusy(true);
    setHostedError(null);
    try {
      await onStartHostedMcpLogin();
    } catch (e) {
      setHostedError(e instanceof Error ? e.message : "Connect failed.");
    } finally {
      setHostedBusy(false);
    }
  }

  const disconnectButton = hasSavedConnection && onDisconnect ? (
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
            {modalVerb} {app.name}
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

        {!isConnected && hasSavedCredential && (
          <div role="status" className="mb-3 flex items-start gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-[11px] leading-4 text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              <strong>{savedStatusTitle}.</strong> {savedStatusBody}
            </span>
          </div>
        )}

        {usesManagedConnection ? (
          <div className="text-xs leading-5 text-white/60">
            <p>
              {hasSavedConnection
                ? `Reconnect ${app.name} if you want to refresh permissions or switch accounts.`
                : `Connect ${app.name} once. It will work on every PC signed into UnClick.`}
            </p>
            <p className="mt-2 text-[11px] leading-4 text-white/45">
              UnClick stores a connection record. The managed connection provider handles the sensitive access.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void startManagedConnection()}
                disabled={managedBusy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#61C1C4] px-3 py-2 font-medium text-black hover:bg-[#61C1C4]/90 disabled:opacity-50"
              >
                {managedBusy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {managedBusy ? "Opening..." : hasSavedConnection ? `Reconnect ${app.name}` : `Connect ${app.name}`}
                {!managedBusy && <ExternalLink className="h-3.5 w-3.5" />}
              </button>
              {disconnectButton}
            </div>
            {managedError && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{managedError}</p>
            )}
            {disconnectError && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{disconnectError}</p>
            )}
          </div>
        ) : usesHostedMcpConnection ? (
          <div className="space-y-3 text-xs leading-5 text-white/60">
            <div className="rounded-lg border border-[#B8FF00]/20 bg-[#B8FF00]/[0.05] px-3 py-3">
              <p className="font-semibold text-white">
                {hasSavedConnection ? "Connected" : `Connect with ${app.name}`}
              </p>
              <p className="mt-1 text-white/55">
                This opens a Higgsfield sign-in window. It uses your Higgsfield account, plan, and credits.
              </p>
              <p className="mt-1 text-white/45">
                No Cloud API key is needed for this MCP login path.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => void startHostedMcpLogin()}
                  disabled={hostedBusy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#B8FF00]/30 bg-[#B8FF00]/15 px-2.5 py-1.5 text-[11px] font-semibold text-[#D6FF57] transition-colors hover:bg-[#B8FF00]/20 disabled:opacity-50"
                >
                  {hostedBusy && <Loader2 className="h-3 w-3 animate-spin" />}
                  {hostedBusy ? "Opening..." : hasSavedConnection ? `Reconnect ${app.name}` : `Connect ${app.name}`}
                  {!hostedBusy && <ExternalLink className="h-3 w-3" />}
                </button>
                {disconnectButton}
              </div>
              {hostedError && (
                <p role="alert" className="mt-2 text-[11px] text-red-400">{hostedError}</p>
              )}
              {disconnectError && (
                <p role="alert" className="mt-2 text-[11px] text-red-400">{disconnectError}</p>
              )}
              <a
                href="https://higgsfield.ai/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#9be4e6] hover:underline"
              >
                Higgsfield MCP guide
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-3">
              <p className="font-semibold text-white">Use it across your AI apps</p>
              <p className="mt-1 text-white/55">
                This connection is linked to your UnClick account. UnClick can run Higgsfield image and video tools through
                this MCP connection on every device.
              </p>
            </div>

            <div className="rounded-lg border border-amber-300/15 bg-amber-300/[0.04] px-3 py-3">
              <p className="font-semibold text-white">Cloud API key option</p>
              <p className="mt-1 text-white/55">
                Use this only if you specifically prefer Higgsfield Cloud API billing instead of the account sign-in.
              </p>
              {hostedApiKeySetupUrl && (
                <a
                  href={hostedApiKeySetupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#9be4e6] hover:underline"
                >
                  Where do I get my {hostedApiKeyCredentialLabel}?
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
                placeholder={`Paste ${hostedApiKeyCredentialLabel} here`}
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
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={onClose} className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-[#888] hover:text-white">
                  {outcome && outcome.kind !== "rejected" ? "Done" : "Cancel"}
                </button>
                <button
                  onClick={() => void submit()}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#E2B93B] px-3 py-2 text-xs font-medium text-black hover:bg-[#E2B93B]/90 disabled:opacity-50"
                >
                  {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {busy ? "Testing..." : "Test API key"}
                </button>
              </div>
            </div>
            {disconnectError && (
              <p role="alert" className="mt-2 text-[11px] text-red-400">{disconnectError}</p>
            )}
          </div>
        ) : isOAuth || needsFullConnectionPage ? (
          <div className="text-xs leading-5 text-white/60">
            <p>
              {needsFullConnectionPage
                ? `${app.name} needs a few fields, so it uses the full connection page instead of this quick key box.`
                : hasSavedConnection
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
                  ? hasSavedConnection
                    ? `Update ${app.name} connection`
                    : `Open ${app.name} connection page`
                  : hasSavedConnection
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
                  {busy ? "Testing..." : hasSavedConnection ? "Test and update" : "Test and connect"}
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
