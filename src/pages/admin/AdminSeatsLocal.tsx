// ============================================================
// Local AI - the guided local-model experience.
//
// Three steps, in plain English: get the engine (Ollama), check
// this computer, pick models. A small curated catalog with honest
// machine-fit labels replaces the raw pull box; downloads stream
// progress inline; installed models can be seated in any chat
// room. Power users keep full manual control in Advanced.
// ============================================================

import { relativeTime } from "@/lib/relativeTime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Loader2,
  MessageSquare,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react";
import {
  formatBytes,
  getEndpointModelsUrl,
  inferCapabilities,
  normalizeEndpointUrl,
  type EndpointType,
  type OllamaModel,
} from "./AdminSeatsLocalUtils";
import {
  CURATED_LOCAL_MODELS,
  FIT_LABELS,
  LOCAL_ENGINE_URL,
  RAM_CHOICES_GB,
  describeCapability,
  estimateDownloadTime,
  findCuratedModel,
  formatSizeGB,
  friendlyModelName,
  modelFit,
  normalizeModelTag,
  probeMachine,
  readSavedRamGB,
  recommendModels,
  saveRamGB,
  suggestRamGB,
  type CuratedLocalModel,
  type MachineProbe,
  type ModelFit,
} from "@/components/admin/localModels";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OllamaRunningModel {
  name: string;
  model: string;
  size: number;
  digest: string;
  expires_at: string;
}

interface CustomEndpointModel {
  id: string;
  object?: string;
  owned_by?: string;
  sourceUrl?: string;
}

interface EndpointConfig {
  type: EndpointType;
  url: string;
  label: string;
}

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface PullState {
  status: "downloading" | "error";
  detail: string;
  percent: number | null;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const OLLAMA_SETUP_LINKS = [
  { label: "Download for macOS", os: "mac", url: "https://ollama.com/download/mac" },
  { label: "Download for Windows", os: "windows", url: "https://ollama.com/download/windows" },
  { label: "Download for Linux", os: "linux", url: "https://ollama.com/download/linux" },
] as const;

const LOCAL_CONNECTED_KEY = "unclick_seats_local_connected";
const CUSTOM_ENDPOINTS_KEY = "unclick_seats_local_custom_endpoints_v1";

const timeAgo = (iso: string | null | undefined) => relativeTime(iso, { justNow: true });

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useOllamaConnection(url: string) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [runningModels, setRunningModels] = useState<OllamaRunningModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [connectNonce, setConnectNonce] = useState(() => {
    try {
      return window.localStorage.getItem(LOCAL_CONNECTED_KEY) === "1" ? 1 : 0;
    } catch { return 0; }
  });

  useEffect(() => {
    if (connectNonce === 0) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    async function fetchModels(attempt = 0) {
      try {
        setStatus("connecting");
        setError(null);

        const tagsRes = await fetch(`${url}/api/tags`, {
          signal: AbortSignal.timeout(5000),
        });
        if (!tagsRes.ok) throw new Error(`The engine responded with ${tagsRes.status}`);
        const tagsBody = await tagsRes.json();
        if (cancelled) return;
        setModels(tagsBody.models ?? []);

        let running: OllamaRunningModel[] = [];
        try {
          const psRes = await fetch(`${url}/api/ps`, {
            signal: AbortSignal.timeout(3000),
          });
          if (psRes.ok) {
            const psBody = await psRes.json();
            running = psBody.models ?? [];
          }
        } catch {
          // /api/ps is optional; older engine versions may not have it
        }
        if (cancelled) return;
        setRunningModels(running);

        setStatus("connected");
        try { window.localStorage.setItem(LOCAL_CONNECTED_KEY, "1"); } catch { /* ignore */ }
      } catch (err) {
        if (cancelled) return;

        const msg = err instanceof Error ? err.message : "Connection failed";
        setError(msg);
        setStatus("error");

        if (attempt < 3) {
          const delay = 2000 * (attempt + 1);
          retryTimer = setTimeout(() => void fetchModels(attempt + 1), delay);
        }
      }
    }

    void fetchModels();
    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [url, connectNonce]);

  const connect = useCallback(() => {
    setConnectNonce((value) => value + 1);
  }, []);

  const refresh = connect;

  return { status, models, runningModels, error, refresh, connect, setModels };
}

// Streams one or more model downloads with per-model progress. Downloads
// keep going while the user scrolls or reads; finished pulls refresh the
// installed list.
function usePullManager(ollamaUrl: string, onDone: () => void) {
  const [pulls, setPulls] = useState<Record<string, PullState>>({});
  const abortsRef = useRef<Record<string, AbortController>>({});

  const pull = useCallback(
    async (tag: string) => {
      const controller = new AbortController();
      abortsRef.current[tag] = controller;
      setPulls((prev) => ({
        ...prev,
        [tag]: { status: "downloading", detail: "starting...", percent: null },
      }));

      try {
        const res = await fetch(`${ollamaUrl}/api/pull`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tag }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const body = await res.text();
          throw new Error(body || `Download failed with status ${res.status}`);
        }
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const msg = JSON.parse(line);
              if (typeof msg.error === "string" && msg.error) {
                throw new Error(msg.error);
              }
              const pct = msg.total && msg.completed
                ? Math.round((msg.completed / msg.total) * 100)
                : null;
              setPulls((prev) => ({
                ...prev,
                [tag]: {
                  status: "downloading",
                  detail: msg.status ?? "downloading...",
                  percent: pct,
                },
              }));
            } catch (err) {
              if (err instanceof SyntaxError) continue; // malformed line
              throw err;
            }
          }
        }
        setPulls((prev) => {
          const next = { ...prev };
          delete next[tag];
          return next;
        });
        onDone();
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setPulls((prev) => {
            const next = { ...prev };
            delete next[tag];
            return next;
          });
        } else {
          setPulls((prev) => ({
            ...prev,
            [tag]: {
              status: "error",
              detail: err instanceof Error ? err.message : "Download failed",
              percent: null,
            },
          }));
        }
      } finally {
        delete abortsRef.current[tag];
      }
    },
    [ollamaUrl, onDone],
  );

  const cancel = useCallback((tag: string) => {
    abortsRef.current[tag]?.abort();
  }, []);

  const dismissError = useCallback((tag: string) => {
    setPulls((prev) => {
      const next = { ...prev };
      delete next[tag];
      return next;
    });
  }, []);

  return { pulls, pull, cancel, dismissError };
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  const map: Record<ConnectionStatus, { icon: typeof Wifi; label: string; className: string }> = {
    disconnected: { icon: WifiOff, label: "Not connected", className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400" },
    connecting: { icon: Loader2, label: "Connecting...", className: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
    connected: { icon: Wifi, label: "Connected", className: "border-green-500/20 bg-green-500/10 text-green-400" },
    error: { icon: WifiOff, label: "Not reachable", className: "border-red-500/20 bg-red-500/10 text-red-400" },
  };
  const { icon: Icon, label, className } = map[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      <Icon className={`h-3 w-3 ${status === "connecting" ? "animate-spin" : ""}`} />
      {label}
    </span>
  );
}

// The numbered shell each setup step lives in. Done steps show a green
// check; the number keeps everyone oriented without reading a manual.
function StepCard({
  step,
  title,
  done,
  children,
}: {
  step: number;
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border/40 bg-card/30 p-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            done
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-primary/15 text-primary"
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : step}
        </span>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-3 pl-10">{children}</div>
    </section>
  );
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* command stays selectable */
    }
  }

  return (
    <div className="flex items-start gap-1.5 rounded-md border border-border/40 bg-card/50 px-2.5 py-2">
      <code className="min-w-0 flex-1 break-all font-mono text-[11px] leading-relaxed text-foreground">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy command"
        title="Copy"
        className="shrink-0 rounded border border-border/40 p-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

// Shown when the engine is installed but this site cannot reach it. The
// usual cause is the engine only trusting local apps; one command fixes it.
function ConnectionHelp({ probe }: { probe: MachineProbe | null }) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://unclick.world";
  const platform = probe?.platform ?? "other";

  return (
    <details className="mt-3 rounded-md border border-border/40 bg-card/30 p-3">
      <summary className="cursor-pointer text-xs font-medium text-foreground">
        Installed it, but it will not connect?
      </summary>
      <div className="mt-2 space-y-2 text-xs text-muted-foreground">
        <p>1. Make sure the Ollama app is open (look for its icon in your menu bar or system tray).</p>
        <p>
          2. If it is open, it may be set to only trust apps on your computer.
          Tell it to trust this site, then restart the app:
        </p>
        {(platform === "mac" || platform === "other") && (
          <div>
            <p className="mb-1 font-medium text-foreground/80">On a Mac (paste in Terminal):</p>
            <CopyCommand command={`launchctl setenv OLLAMA_ORIGINS "${origin}"`} />
          </div>
        )}
        {(platform === "windows" || platform === "other") && (
          <div>
            <p className="mb-1 font-medium text-foreground/80">On Windows (paste in Command Prompt):</p>
            <CopyCommand command={`setx OLLAMA_ORIGINS "${origin}"`} />
          </div>
        )}
        {(platform === "linux" || platform === "other") && (
          <div>
            <p className="mb-1 font-medium text-foreground/80">On Linux (then restart the service):</p>
            <CopyCommand command={`sudo systemctl edit ollama --stack; # add Environment="OLLAMA_ORIGINS=${origin}"`} />
          </div>
        )}
        <p>
          3. Some browsers block pages from talking to local apps entirely
          (Safari does). Chrome, Edge, Brave, and Firefox all work.
        </p>
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------
// Step 2: machine check
// ---------------------------------------------------------------------------

function MachineStep({
  probe,
  ramGB,
  onPickRam,
}: {
  probe: MachineProbe | null;
  ramGB: number | null;
  onPickRam: (gb: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Bigger models need more memory (RAM). Pick your computer's memory and
        we will point you at models that run well on it.
      </p>
      {probe && (probe.cores || probe.gpuLabel) && (
        <p className="text-xs text-muted-foreground/70">
          Detected so far:{" "}
          {[
            probe.cores ? `${probe.cores} processor cores` : null,
            probe.appleSilicon
              ? "Apple graphics (great for local AI)"
              : probe.gpuLabel
                ? `${probe.gpuLabel} graphics`
                : null,
          ]
            .filter(Boolean)
            .join(", ")}
          . Browsers cannot read exact memory, so please confirm it below.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {RAM_CHOICES_GB.map((gb) => (
          <button
            key={gb}
            type="button"
            onClick={() => onPickRam(gb)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              ramGB === gb
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border/40 bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {gb === 64 ? "64 GB or more" : `${gb} GB`}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground/60">
        Not sure? Pick 8 GB - recommendations stay safe, and everything still
        works. (Mac: Apple menu, About This Mac. Windows: Settings, System,
        About.)
      </p>
      {ramGB !== null && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {describeCapability(ramGB)}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3: the model shop
// ---------------------------------------------------------------------------

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
      {label}
      <span className="inline-flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i <= value ? "bg-primary/80" : "bg-border/60"
            }`}
          />
        ))}
      </span>
    </span>
  );
}

function FitBadge({ fit }: { fit: ModelFit }) {
  const styles: Record<ModelFit, string> = {
    great: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    ok: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    "too-big": "border-red-500/25 bg-red-500/10 text-red-300",
  };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${styles[fit]}`}>
      {FIT_LABELS[fit]}
    </span>
  );
}

function ModelCard({
  model,
  recommended,
  installed,
  fit,
  pullState,
  onDownload,
  onCancel,
  onDismissError,
}: {
  model: CuratedLocalModel;
  recommended: boolean;
  installed: boolean;
  fit: ModelFit | null;
  pullState: PullState | undefined;
  onDownload: () => void;
  onCancel: () => void;
  onDismissError: () => void;
}) {
  const downloading = pullState?.status === "downloading";

  return (
    <div
      className={`relative flex flex-col rounded-lg border p-4 ${
        recommended
          ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_0_1px_rgba(45,212,191,0.1)]"
          : "border-border/40 bg-card/30"
      }`}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-4 rounded-full border border-primary/40 bg-background px-2 py-0.5 text-[10px] font-semibold text-primary">
          Our pick for your machine
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{model.nick}</h3>
          <p className="text-[11px] text-muted-foreground">
            {model.maker} · {model.tag}
          </p>
        </div>
        {fit && !installed && <FitBadge fit={fit} />}
        {installed && (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <Check className="h-3 w-3" />
            Installed
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
        {model.blurb}
        {model.analogy && (
          <span className="mt-1 block text-muted-foreground/60">{model.analogy}</span>
        )}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {model.goodFor.map((g) => (
          <span
            key={g}
            className="rounded-full border border-border/40 bg-card/50 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {g}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Meter label="Speed" value={model.speed} />
          <Meter label="Brains" value={model.brains} />
        </div>
        <span className="text-[10px] text-muted-foreground/70">
          {formatSizeGB(model.sizeGB)} · {estimateDownloadTime(model.sizeGB)}
        </span>
      </div>

      <div className="mt-3">
        {installed ? (
          <Link
            to="/admin/chat"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border/40 bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {model.chatSeat ? "Use in chat" : "Ready - powers search and memory"}
          </Link>
        ) : downloading ? (
          <div className="rounded-md border border-border/40 bg-card/40 px-3 py-2">
            <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                {pullState?.percent !== null && pullState?.percent !== undefined
                  ? `${pullState.percent}% downloaded`
                  : pullState?.detail ?? "downloading..."}
              </span>
              <button
                type="button"
                onClick={onCancel}
                className="text-muted-foreground transition-colors hover:text-red-400"
              >
                Cancel
              </button>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-card/60">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${pullState?.percent ?? 4}%` }}
              />
            </div>
          </div>
        ) : pullState?.status === "error" ? (
          <div className="flex items-start justify-between gap-2 rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2 text-[11px] text-red-400">
            <span className="min-w-0 break-words">{pullState.detail}</span>
            <button
              type="button"
              onClick={onDismissError}
              className="shrink-0 underline transition-colors hover:text-red-300"
            >
              Dismiss
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onDownload}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              fit === "too-big"
                ? "border border-border/40 text-muted-foreground hover:text-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/80"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            {fit === "too-big" ? "Download anyway" : "Download"}
          </button>
        )}
      </div>
      {fit === "too-big" && !installed && !downloading && (
        <p className="mt-1.5 text-[10px] text-red-300/70">
          Heads up: this one likely will not run well on your machine.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete confirmation
// ---------------------------------------------------------------------------

function DeleteConfirm({
  modelName,
  ollamaUrl,
  onComplete,
  onClose,
}: {
  modelName: string;
  ollamaUrl: string;
  onComplete: () => void;
  onClose: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`${ollamaUrl}/api/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: modelName }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Delete failed with status ${res.status}`);
      }
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-lg border border-border/40 bg-background p-6 shadow-xl">
        <h2 className="text-lg font-semibold">Remove model</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Remove <span className="font-medium text-foreground">{friendlyModelName(modelName)}</span>{" "}
          from this computer? This frees up the disk space it uses. You can
          always download it again later.
        </p>
        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
            <XCircle className="mt-0.5 h-3 w-3 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={deleting}
            className="rounded-md border border-border/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Keep it
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Advanced: manual pull + custom endpoints
// ---------------------------------------------------------------------------

function ManualPullRow({
  pulls,
  onPull,
}: {
  pulls: Record<string, PullState>;
  onPull: (tag: string) => void;
}) {
  const [name, setName] = useState("");
  const busy = Object.values(pulls).some((p) => p.status === "downloading");

  return (
    <div>
      <p className="text-xs font-medium text-foreground">Download any model by name</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        Anything from the{" "}
        <a
          href="https://ollama.com/library"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Ollama library
        </a>{" "}
        works, e.g. <code className="font-mono">mistral:7b</code>.
      </p>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) {
              onPull(name.trim());
              setName("");
            }
          }}
          placeholder="model:tag"
          className="flex-1 rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (name.trim()) {
              onPull(name.trim());
              setName("");
            }
          }}
          disabled={!name.trim()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Download"}
        </button>
      </div>
    </div>
  );
}

function CustomEndpointSection({
  endpoints,
  onAdd,
  onRemove,
}: {
  endpoints: EndpointConfig[];
  onAdd: (e: EndpointConfig) => void;
  onRemove: (url: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [type, setType] = useState<EndpointType>("openai-compat");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  async function testAndAdd() {
    if (!url.trim()) return;
    setTesting(true);
    setTestResult(null);

    try {
      const normalizedUrl = normalizeEndpointUrl(url);
      const testUrl = getEndpointModelsUrl(type, normalizedUrl);

      const res = await fetch(testUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTestResult("success");
      onAdd({
        type,
        url: normalizedUrl,
        label: label.trim() || normalizedUrl,
      });
      setAdding(false);
      setUrl("");
      setLabel("");
    } catch {
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-foreground">Custom endpoints</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Connect LM Studio, vLLM, or a model server on another machine.
          </p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-1 rounded-md border border-border/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="h-3 w-3" />
            Add endpoint
          </button>
        )}
      </div>

      {adding && (
        <div className="mt-3 rounded-md border border-border/40 bg-card/30 p-4">
          <div className="grid gap-3">
            <div className="flex gap-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EndpointType)}
                className="rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              >
                <option value="openai-compat">OpenAI-compatible</option>
                <option value="ollama">Ollama</option>
              </select>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={type === "ollama" ? "http://192.168.1.10:11434" : "http://localhost:1234/v1"}
                className="flex-1 rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
              />
            </div>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label (optional, e.g. 'LM Studio')"
              className="rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={testAndAdd}
                disabled={testing || !url.trim()}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
              >
                {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test & Add"}
              </button>
              <button
                onClick={() => { setAdding(false); setTestResult(null); }}
                className="rounded-md border border-border/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
              {testResult === "success" && <CheckCircle2 className="h-4 w-4 text-green-400" />}
              {testResult === "error" && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <XCircle className="h-3 w-3" />
                  Connection failed
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground/60">
            Supports LM Studio, vLLM, text-generation-webui, or any server exposing /v1/models.
          </p>
        </div>
      )}

      {endpoints.length > 0 && (
        <div className="mt-3 space-y-2">
          {endpoints.map((ep) => (
            <div
              key={ep.url}
              className="flex items-center justify-between rounded-md border border-border/40 bg-card/30 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{ep.label}</p>
                <p className="truncate text-xs text-muted-foreground">{ep.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-border/40 bg-card/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                  {ep.type === "ollama" ? "Ollama" : "OpenAI"}
                </span>
                <button
                  onClick={() => onRemove(ep.url)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:text-red-400"
                  title="Remove endpoint"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom endpoint persistence
// ---------------------------------------------------------------------------

function loadCustomEndpoints(): EndpointConfig[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CUSTOM_ENDPOINTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as EndpointConfig[]) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) => e && typeof e.url === "string" && typeof e.label === "string",
    );
  } catch {
    return [];
  }
}

function saveCustomEndpoints(endpoints: EndpointConfig[]) {
  try {
    window.localStorage.setItem(CUSTOM_ENDPOINTS_KEY, JSON.stringify(endpoints));
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminSeatsLocal() {
  const ollamaUrl = LOCAL_ENGINE_URL;
  const [customEndpoints, setCustomEndpoints] = useState<EndpointConfig[]>(loadCustomEndpoints);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [customModels, setCustomModels] = useState<CustomEndpointModel[]>([]);
  const [probe, setProbe] = useState<MachineProbe | null>(null);
  const [ramGB, setRamGB] = useState<number | null>(readSavedRamGB);

  const { status, models, runningModels, error, refresh, connect, setModels } =
    useOllamaConnection(ollamaUrl);
  const { pulls, pull, cancel, dismissError } = usePullManager(ollamaUrl, refresh);

  const runningSet = new Set(runningModels.map((m) => m.name));
  const installedTags = new Set(models.map((m) => normalizeModelTag(m.name)));
  const connected = status === "connected";

  // Auto-run the machine probe once; it is instant and read-only. If the
  // user has not confirmed memory yet, preselect the safe suggestion.
  useEffect(() => {
    let cancelled = false;
    void probeMachine().then((result) => {
      if (cancelled) return;
      setProbe(result);
      setRamGB((current) => current ?? suggestRamGB(result));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const pickRam = useCallback((gb: number) => {
    setRamGB(gb);
    saveRamGB(gb);
  }, []);

  const handleDeleteComplete = useCallback(() => {
    if (deleteTarget) {
      setModels((prev) => prev.filter((m) => m.name !== deleteTarget));
    }
    setDeleteTarget(null);
  }, [deleteTarget, setModels]);

  const handleAddEndpoint = useCallback((ep: EndpointConfig) => {
    setCustomEndpoints((prev) => {
      if (prev.some((e) => e.url === ep.url)) return prev;
      const next = [...prev, ep];
      saveCustomEndpoints(next);
      return next;
    });
  }, []);

  const handleRemoveEndpoint = useCallback((url: string) => {
    setCustomEndpoints((prev) => {
      const next = prev.filter((e) => e.url !== url);
      saveCustomEndpoints(next);
      return next;
    });
    setCustomModels((prev) => prev.filter((m) => m.sourceUrl !== url));
  }, []);

  useEffect(() => {
    async function fetchCustomModels() {
      const allModels: CustomEndpointModel[] = [];
      for (const ep of customEndpoints) {
        try {
          const url = getEndpointModelsUrl(ep.type, ep.url);
          const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!res.ok) continue;
          const body = await res.json();
          if (ep.type === "ollama") {
            for (const m of body.models ?? []) {
              allModels.push({ id: `${ep.label}: ${m.name}`, owned_by: ep.label, sourceUrl: ep.url });
            }
          } else {
            for (const m of body.data ?? []) {
              allModels.push({ id: m.id, owned_by: ep.label, object: m.object, sourceUrl: ep.url });
            }
          }
        } catch {
          // skip unreachable endpoints
        }
      }
      setCustomModels(allModels);
    }

    if (customEndpoints.length > 0) {
      void fetchCustomModels();
    }
  }, [customEndpoints]);

  const recommendation = ramGB !== null ? recommendModels(ramGB) : null;
  const totalBytes = models.reduce((sum, m) => sum + m.size, 0);
  const hasChatModel = models.some(
    (m) => findCuratedModel(m.name)?.chatSeat !== false,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Local AI</h1>
            <p className="text-sm text-muted-foreground">
              Run AI on your own computer. Free to use, works offline, and
              nothing you type leaves your machine.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ConnectionBadge status={status} />
          <button
            onClick={refresh}
            disabled={status === "connecting"}
            title="Refresh"
            className="rounded-md border border-border/40 p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${status === "connecting" ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Chat CTA once a usable model exists */}
      {connected && hasChatModel && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3">
          <p className="text-sm text-emerald-200">
            You are all set. Your local models can now join any chat room as
            an AI seat - free, and private to this computer.
          </p>
          <Link
            to="/admin/chat"
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/90 px-3 py-1.5 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-400"
          >
            <MessageSquare className="h-4 w-4" />
            Open chat
          </Link>
        </div>
      )}

      {/* Step 1: the engine */}
      <StepCard step={1} title="Get the engine" done={connected}>
        {connected ? (
          <p className="text-sm text-muted-foreground">
            The engine (Ollama) is running on this computer and connected.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              UnClick uses a free, trusted open-source engine called{" "}
              <span className="font-medium text-foreground">Ollama</span> to
              run models on your computer. Install it once - after that,
              everything happens right here on this page.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {OLLAMA_SETUP_LINKS.map(({ label, os, url }) => (
                <a
                  key={os}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    probe?.platform === os
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/40 bg-card/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Download className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
            <button
              onClick={connect}
              disabled={status === "connecting"}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
            >
              {status === "connecting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wifi className="h-4 w-4" />
              )}
              I installed it - connect
            </button>
            <p className="text-[11px] text-muted-foreground/60">
              Your browser may ask permission to talk to apps on this
              computer. That is normal - it is how this page reaches the
              engine, and the conversation stays on your machine.
            </p>
            {status === "error" && (
              <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium">Could not find the engine on this computer.</p>
                  {error && <p className="mt-1 text-xs text-red-400/70">{error}</p>}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={refresh}
                      className="inline-flex items-center gap-1 rounded-md border border-red-500/20 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-red-500/10"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Try again
                    </button>
                    <a
                      href="https://ollama.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-red-400/70 transition-colors hover:text-red-400"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Get Ollama
                    </a>
                  </div>
                </div>
              </div>
            )}
            {status === "error" && <ConnectionHelp probe={probe} />}
          </div>
        )}
      </StepCard>

      {/* Step 2: machine check */}
      <StepCard step={2} title="Check this computer" done={ramGB !== null}>
        <MachineStep probe={probe} ramGB={ramGB} onPickRam={pickRam} />
      </StepCard>

      {/* Step 3: the model shop */}
      <StepCard
        step={3}
        title="Pick your models"
        done={connected && models.length > 0}
      >
        {!connected && (
          <p className="mb-3 text-sm text-muted-foreground">
            Finish step 1 first - downloads need the engine running.
          </p>
        )}
        {recommendation && (
          <p className="mb-3 text-sm text-muted-foreground">
            For your machine we suggest starting with{" "}
            <span className="font-medium text-foreground">
              {recommendation.best.nick}
            </span>
            {recommendation.extras.length > 0 && (
              <>
                {" "}
                and adding{" "}
                <span className="font-medium text-foreground">
                  {recommendation.extras.map((m) => m.nick).join(", ")}
                </span>{" "}
                if you want the specialties
              </>
            )}
            . One model is plenty to start - you can always come back.
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {CURATED_LOCAL_MODELS.map((model) => (
            <ModelCard
              key={model.tag}
              model={model}
              recommended={recommendation?.best.tag === model.tag}
              installed={installedTags.has(normalizeModelTag(model.tag))}
              fit={ramGB !== null ? modelFit(model, ramGB) : null}
              pullState={pulls[model.tag]}
              onDownload={() => {
                if (!connected) {
                  connect();
                  return;
                }
                void pull(model.tag);
              }}
              onCancel={() => cancel(model.tag)}
              onDismissError={() => dismissError(model.tag)}
            />
          ))}
        </div>
      </StepCard>

      {/* Installed models */}
      {connected && models.length > 0 && (
        <section className="rounded-lg border border-border/40 bg-card/30 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              On this computer
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {models.length} {models.length === 1 ? "model" : "models"} ·{" "}
                {formatBytes(totalBytes)} of disk space
              </span>
            </h2>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 text-xs text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Model</th>
                  <th className="px-3 py-2 font-medium">Size</th>
                  <th className="px-3 py-2 font-medium">Good at</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Added</th>
                  <th className="px-3 py-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {models.map((model) => {
                  const curated = findCuratedModel(model.name);
                  const caps = curated
                    ? curated.goodFor
                    : inferCapabilities(model);
                  const isRunning = runningSet.has(model.name);

                  return (
                    <tr key={model.digest} className="border-b border-border/20 last:border-0">
                      <td className="px-3 py-2.5">
                        <p className="font-medium text-foreground">
                          {friendlyModelName(model.name)}
                        </p>
                        <p className="text-xs text-muted-foreground">{model.name}</p>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">
                        {formatBytes(model.size)}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {caps.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-border/40 bg-card/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        {isRunning ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Running
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                            Ready
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-muted-foreground">
                        {timeAgo(model.modified_at)}
                      </td>
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => setDeleteTarget(model.name)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-red-400"
                          title={`Remove ${model.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Custom endpoint models */}
      {customModels.length > 0 && (
        <section className="rounded-lg border border-border/40 bg-card/30 p-5">
          <h2 className="text-base font-semibold text-foreground">
            Custom endpoint models
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({customModels.length})
            </span>
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 text-xs text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Model ID</th>
                  <th className="px-3 py-2 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {customModels.map((m) => (
                  <tr key={m.id} className="border-b border-border/20 last:border-0">
                    <td className="px-3 py-2.5 font-medium text-foreground">{m.id}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{m.owned_by ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Advanced */}
      <details className="group rounded-lg border border-border/40 bg-card/30 p-5">
        <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
          <span className="inline-flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            Advanced
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 space-y-5">
          <div className="flex items-start gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-400">
            <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
            <span>
              This page talks to the engine directly from your browser. The
              engine must run on the same machine as your browser, or a custom
              endpoint must be reachable from this browser and allow this site
              with CORS.
            </span>
          </div>
          <ManualPullRow pulls={pulls} onPull={(tag) => void pull(tag)} />
          {Object.entries(pulls)
            .filter(([tag]) => !CURATED_LOCAL_MODELS.some((m) => m.tag === tag))
            .map(([tag, state]) => (
              <div
                key={tag}
                className="rounded-md border border-border/40 bg-card/40 px-3 py-2 text-[11px] text-muted-foreground"
              >
                {state.status === "downloading" ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        <span className="font-medium text-foreground">{tag}</span>
                        {state.percent !== null ? `${state.percent}%` : state.detail}
                      </span>
                      <button
                        type="button"
                        onClick={() => cancel(tag)}
                        className="transition-colors hover:text-red-400"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-card/60">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${state.percent ?? 4}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-start justify-between gap-2 text-red-400">
                    <span className="min-w-0 break-words">
                      {tag}: {state.detail}
                    </span>
                    <button
                      type="button"
                      onClick={() => dismissError(tag)}
                      className="shrink-0 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          <CustomEndpointSection
            endpoints={customEndpoints}
            onAdd={handleAddEndpoint}
            onRemove={handleRemoveEndpoint}
          />
        </div>
      </details>

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteConfirm
          modelName={deleteTarget}
          ollamaUrl={ollamaUrl}
          onComplete={handleDeleteComplete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
