import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Wifi,
  WifiOff,
  X,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parent_model?: string;
    format?: string;
    family?: string;
    families?: string[] | null;
    parameter_size?: string;
    quantization_level?: string;
  };
}

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
}

type EndpointType = "ollama" | "openai-compat";

interface EndpointConfig {
  type: EndpointType;
  url: string;
  label: string;
}

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface PullProgress {
  model: string;
  status: string;
  percent: number | null;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_OLLAMA_URL = "http://localhost:11434";

const OLLAMA_SETUP_LINKS: Record<string, { label: string; url: string }> = {
  mac: { label: "macOS", url: "https://ollama.com/download/mac" },
  linux: { label: "Linux", url: "https://ollama.com/download/linux" },
  windows: { label: "Windows", url: "https://ollama.com/download/windows" },
};

const POPULAR_MODELS = [
  { name: "llama3.2:8b", desc: "Meta - general chat and code", size: "~4.7GB" },
  { name: "nomic-embed-text", desc: "Embeddings - great for RAG", size: "~274MB" },
  { name: "codestral:22b", desc: "Mistral - code generation", size: "~12GB" },
  { name: "gemma2:9b", desc: "Google - efficient chat", size: "~5.4GB" },
  { name: "phi3:mini", desc: "Microsoft - compact reasoning", size: "~2.2GB" },
  { name: "llava:7b", desc: "Vision + chat multimodal", size: "~4.7GB" },
  { name: "mxbai-embed-large", desc: "Embeddings - high accuracy", size: "~670MB" },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(0)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function inferCapabilities(model: OllamaModel): string[] {
  const caps: string[] = [];
  const n = model.name.toLowerCase();
  const families = model.details.families ?? [];

  if (n.includes("embed") || families.includes("bert")) {
    caps.push("Embeddings");
  } else {
    caps.push("Chat");
  }

  if (n.includes("code") || n.includes("codestral") || n.includes("deepseek-coder") || n.includes("starcoder")) {
    caps.push("Code");
  }

  if (n.includes("llava") || n.includes("bakllava") || n.includes("vision") || families.includes("clip")) {
    caps.push("Vision");
  }

  return caps;
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useOllamaConnection(url: string) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [runningModels, setRunningModels] = useState<OllamaRunningModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const retryCount = useRef(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchModels = useCallback(async (endpoint: string) => {
    try {
      setStatus("connecting");
      setError(null);

      const tagsRes = await fetch(`${endpoint}/api/tags`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!tagsRes.ok) throw new Error(`Ollama responded with ${tagsRes.status}`);
      const tagsBody = await tagsRes.json();
      setModels(tagsBody.models ?? []);

      let running: OllamaRunningModel[] = [];
      try {
        const psRes = await fetch(`${endpoint}/api/ps`, {
          signal: AbortSignal.timeout(3000),
        });
        if (psRes.ok) {
          const psBody = await psRes.json();
          running = psBody.models ?? [];
        }
      } catch {
        // /api/ps is optional; older Ollama versions may not have it
      }
      setRunningModels(running);

      setStatus("connected");
      retryCount.current = 0;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection failed";
      setError(msg);
      setStatus("error");

      if (retryCount.current < 3) {
        retryCount.current += 1;
        const delay = 2000 * retryCount.current;
        retryTimer.current = setTimeout(() => void fetchModels(endpoint), delay);
      }
    }
  }, []);

  const refresh = useCallback(() => {
    retryCount.current = 0;
    void fetchModels(url);
  }, [url, fetchModels]);

  useEffect(() => {
    void fetchModels(url);
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [url, fetchModels]);

  return { status, models, runningModels, error, refresh, setModels };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  const map: Record<ConnectionStatus, { icon: typeof Wifi; label: string; className: string }> = {
    disconnected: { icon: WifiOff, label: "Disconnected", className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400" },
    connecting: { icon: Loader2, label: "Connecting...", className: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
    connected: { icon: Wifi, label: "Connected", className: "border-green-500/20 bg-green-500/10 text-green-400" },
    error: { icon: WifiOff, label: "Error", className: "border-red-500/20 bg-red-500/10 text-red-400" },
  };
  const { icon: Icon, label, className } = map[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      <Icon className={`h-3 w-3 ${status === "connecting" ? "animate-spin" : ""}`} />
      {label}
    </span>
  );
}

function ModelCapBadge({ cap }: { cap: string }) {
  const colors: Record<string, string> = {
    Chat: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    Code: "border-purple-500/20 bg-purple-500/10 text-purple-400",
    Embeddings: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Vision: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${colors[cap] ?? "border-zinc-500/20 bg-zinc-500/10 text-zinc-400"}`}>
      {cap}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-border/40 bg-card/30 p-8">
      <div className="mx-auto max-w-md text-center">
        <Server className="mx-auto h-10 w-10 text-muted-foreground/40" />
        <h3 className="mt-4 text-sm font-medium text-foreground">No local runtime detected</h3>
        <p className="mt-2 text-xs text-muted-foreground">
          Install Ollama to run AI models entirely on your own hardware. Nothing leaves your machine.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {Object.values(OLLAMA_SETUP_LINKS).map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border/40 bg-card/50 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-card/80"
            >
              <Download className="h-3 w-3" />
              {label}
            </a>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-muted-foreground/60">
          Also supports LM Studio, vLLM, and any OpenAI-compatible endpoint via custom URL.
        </p>
      </div>
    </div>
  );
}

function PullModelDialog({
  ollamaUrl,
  onComplete,
  onClose,
}: {
  ollamaUrl: string;
  onComplete: () => void;
  onClose: () => void;
}) {
  const [modelName, setModelName] = useState("");
  const [progress, setProgress] = useState<PullProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pulling, setPulling] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handlePull(name: string) {
    const target = name.trim();
    if (!target) return;

    setPulling(true);
    setError(null);
    setProgress({ model: target, status: "starting...", percent: null });
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${ollamaUrl}/api/pull`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: target }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Pull failed with status ${res.status}`);
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
            const pct = msg.total && msg.completed
              ? Math.round((msg.completed / msg.total) * 100)
              : null;
            setProgress({ model: target, status: msg.status ?? "pulling...", percent: pct });
          } catch {
            // ignore malformed JSON lines
          }
        }
      }

      setProgress(null);
      onComplete();
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setProgress(null);
      } else {
        setError(err instanceof Error ? err.message : "Pull failed");
        setProgress(null);
      }
    } finally {
      setPulling(false);
    }
  }

  function handleCancel() {
    abortRef.current?.abort();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-lg border border-border/40 bg-background p-6 shadow-xl">
        <button
          onClick={handleCancel}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold">Pull Model</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Download a model from the Ollama library to run locally.
        </p>

        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !pulling && handlePull(modelName)}
              placeholder="e.g. llama3.2:8b"
              disabled={pulling}
              className="flex-1 rounded-md border border-border/40 bg-card/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
            />
            <button
              onClick={() => handlePull(modelName)}
              disabled={pulling || !modelName.trim()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
            >
              {pulling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Pull"
              )}
            </button>
          </div>
        </div>

        {progress && (
          <div className="mt-4 rounded-md border border-border/40 bg-card/30 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span className="font-medium text-foreground">{progress.model}</span>
              <span>{progress.status}</span>
            </div>
            {progress.percent !== null && (
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card/50">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
            <XCircle className="mt-0.5 h-3 w-3 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">Popular models</p>
          <div className="mt-2 grid gap-1">
            {POPULAR_MODELS.map((m) => (
              <button
                key={m.name}
                disabled={pulling}
                onClick={() => { setModelName(m.name); handlePull(m.name); }}
                className="flex items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors hover:bg-card/40 disabled:opacity-50"
              >
                <div>
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="ml-2 text-muted-foreground">{m.desc}</span>
                </div>
                <span className="text-muted-foreground/60">{m.size}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <h2 className="text-lg font-semibold">Delete Model</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-medium text-foreground">{modelName}</span>?
          This will remove it from your local storage.
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
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
          </button>
        </div>
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
      const testUrl = type === "ollama"
        ? `${url.replace(/\/+$/, "")}/api/tags`
        : `${url.replace(/\/+$/, "")}/v1/models`;

      const res = await fetch(testUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTestResult("success");
      onAdd({
        type,
        url: url.replace(/\/+$/, ""),
        label: label.trim() || url,
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
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Custom Endpoints</h3>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-1 rounded-md border border-border/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="h-3 w-3" />
            Add Endpoint
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

      {!adding && endpoints.length === 0 && (
        <p className="mt-2 text-xs text-muted-foreground/60">
          No custom endpoints configured. Add one to connect to LM Studio, vLLM, or a remote Ollama instance.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function AdminSeatsLocal() {
  const [ollamaUrl, setOllamaUrl] = useState(DEFAULT_OLLAMA_URL);
  const [customEndpoints, setCustomEndpoints] = useState<EndpointConfig[]>([]);
  const [showPullDialog, setShowPullDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [customModels, setCustomModels] = useState<CustomEndpointModel[]>([]);

  const { status, models, runningModels, error, refresh, setModels } = useOllamaConnection(ollamaUrl);

  const runningSet = new Set(runningModels.map((m) => m.name));

  const handlePullComplete = useCallback(() => {
    setShowPullDialog(false);
    refresh();
  }, [refresh]);

  const handleDeleteComplete = useCallback(() => {
    if (deleteTarget) {
      setModels((prev) => prev.filter((m) => m.name !== deleteTarget));
    }
    setDeleteTarget(null);
  }, [deleteTarget, setModels]);

  const handleAddEndpoint = useCallback((ep: EndpointConfig) => {
    setCustomEndpoints((prev) => {
      if (prev.some((e) => e.url === ep.url)) return prev;
      return [...prev, ep];
    });
  }, []);

  const handleRemoveEndpoint = useCallback((url: string) => {
    setCustomEndpoints((prev) => prev.filter((e) => e.url !== url));
    setCustomModels([]);
  }, []);

  useEffect(() => {
    async function fetchCustomModels() {
      const allModels: CustomEndpointModel[] = [];
      for (const ep of customEndpoints) {
        try {
          const url = ep.type === "ollama"
            ? `${ep.url}/api/tags`
            : `${ep.url}/v1/models`;
          const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!res.ok) continue;
          const body = await res.json();
          if (ep.type === "ollama") {
            for (const m of body.models ?? []) {
              allModels.push({ id: `${ep.label}: ${m.name}`, owned_by: ep.label });
            }
          } else {
            for (const m of body.data ?? []) {
              allModels.push({ id: m.id, owned_by: ep.label, object: m.object });
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Local</h1>
            <p className="text-sm text-muted-foreground">
              Run models on your own hardware - nothing leaves your machine.
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

      {/* Browser-direct notice */}
      <div className="flex items-start gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-400">
        <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          Local model detection connects directly from your browser to localhost.
          Ollama must be running on the same machine as your browser.
        </span>
      </div>

      {/* Connection error */}
      {status === "error" && error && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Could not connect to Ollama at {ollamaUrl}</p>
            <p className="mt-1 text-xs text-red-400/70">{error}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={refresh}
                className="inline-flex items-center gap-1 rounded-md border border-red-500/20 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-red-500/10"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
              <a
                href="https://ollama.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-red-400/70 transition-colors hover:text-red-400"
              >
                <ExternalLink className="h-3 w-3" />
                Install Ollama
              </a>
            </div>
          </div>
        </div>
      )}

      {/* No Ollama - empty state */}
      {status === "error" && <EmptyState />}

      {/* Connected - model list */}
      {status === "connected" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">
              Installed Models
              <span className="ml-2 text-muted-foreground">({models.length})</span>
            </h2>
            <button
              onClick={() => setShowPullDialog(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              <Plus className="h-3.5 w-3.5" />
              Pull Model
            </button>
          </div>

          {models.length === 0 ? (
            <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
              <Download className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                Ollama is running but no models are installed.
              </p>
              <button
                onClick={() => setShowPullDialog(true)}
                className="mt-3 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <Plus className="h-3.5 w-3.5" />
                Pull your first model
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-border/40 bg-card/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/40 text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Model</th>
                      <th className="px-4 py-3 font-medium">Size</th>
                      <th className="px-4 py-3 font-medium">Parameters</th>
                      <th className="px-4 py-3 font-medium">Capabilities</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Modified</th>
                      <th className="px-4 py-3 font-medium" />
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => {
                      const caps = inferCapabilities(model);
                      const isRunning = runningSet.has(model.name);

                      return (
                        <tr key={model.digest} className="border-b border-border/20 last:border-0">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-foreground">{model.name}</p>
                              {model.details.family && (
                                <p className="text-xs text-muted-foreground">
                                  {model.details.family}
                                  {model.details.quantization_level
                                    ? ` - ${model.details.quantization_level}`
                                    : ""}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatBytes(model.size)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {model.details.parameter_size ?? "-"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {caps.map((c) => (
                                <ModelCapBadge key={c} cap={c} />
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
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
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            {timeAgo(model.modified_at)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setDeleteTarget(model.name)}
                              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-red-400"
                              title={`Delete ${model.name}`}
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
            </div>
          )}
        </>
      )}

      {/* Custom endpoints */}
      <CustomEndpointSection
        endpoints={customEndpoints}
        onAdd={handleAddEndpoint}
        onRemove={handleRemoveEndpoint}
      />

      {/* Custom endpoint models */}
      {customModels.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Custom Endpoint Models
            <span className="ml-2 text-muted-foreground">({customModels.length})</span>
          </h3>
          <div className="mt-2 rounded-lg border border-border/40 bg-card/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/40 text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Model ID</th>
                    <th className="px-4 py-3 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {customModels.map((m) => (
                    <tr key={m.id} className="border-b border-border/20 last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{m.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.owned_by ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Connecting spinner */}
      {status === "connecting" && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Detecting local runtime...</p>
          </div>
        </div>
      )}

      {/* Pull dialog */}
      {showPullDialog && (
        <PullModelDialog
          ollamaUrl={ollamaUrl}
          onComplete={handlePullComplete}
          onClose={() => setShowPullDialog(false)}
        />
      )}

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
