import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  generateConfig,
  platformFilename,
  platformHasConfigFile,
  platformLabel,
  type BusinessContextEntry,
  type Platform,
} from "@/lib/configGenerator";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  RefreshCw,
  Settings2,
  Sparkles,
  XCircle,
} from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";
const PLATFORM_STORAGE = "unclick_platform";
const SERVER_URL = "https://unclick.world/api/mcp";
const PLATFORMS: Platform[] = ["claude-code", "cursor", "windsurf", "copilot", "chatgpt"];

interface ConnectionStatus {
  connected: boolean;
  last_seen: string | null;
  cloud_sync: boolean;
  schema_installed?: boolean;
}

interface GeneratedConfigResponse {
  content: string;
  filename: string;
  instructions: string;
  generated_at: string;
}

interface PlatformGuide {
  planExamples: string;
  included: string;
  metered: string;
  whereToCheck: string;
  setup: string[];
}

const PLATFORM_GUIDES: Record<Platform, PlatformGuide> = {
  "claude-code": {
    planExamples: "Claude Pro, Max 5x, Max 20x, Team",
    included:
      "Human-in-session Claude app and Claude Code use draw from the subscription usage pool.",
    metered:
      "API calls, long-running automation, and background work should be treated as programmatic usage.",
    whereToCheck: "Claude account usage page and Claude Code plan status.",
    setup: [
      "Install Claude Code and sign in with the account that owns the subscription.",
      "Add the UnClick MCP server to Claude Code.",
      "Save CLAUDE.md at each project root when you want startup memory loaded from a file.",
      "Open a fresh Claude Code session and confirm UnClick memory loads before the first answer.",
    ],
  },
  cursor: {
    planExamples: "Cursor Pro, Pro+, Ultra, Team",
    included:
      "Tab completion and agent usage allowances live inside the Cursor subscription.",
    metered:
      "Heavy agent work, premium model choices, and background agents can consume included usage or require paid overage.",
    whereToCheck: "Cursor dashboard and editor usage notifications.",
    setup: [
      "Open Cursor settings and go to Tools and MCP.",
      "Add the UnClick MCP server using the generated Cursor rule file.",
      "Save .cursor/rules/unclick.mdc inside the project.",
      "Restart Cursor and start a new chat to confirm UnClick memory loads.",
    ],
  },
  windsurf: {
    planExamples: "Windsurf Free, Pro, Max, Teams, Enterprise",
    included:
      "Cascade prompt quota or credits are allocated by plan and reset on the provider billing cycle.",
    metered:
      "Premium models, extra quota, and team add-on credits are tracked separately by Windsurf.",
    whereToCheck: "Windsurf Settings, Plan Info, and the Windsurf billing page.",
    setup: [
      "Open Windsurf settings, then Cascade, then MCP Servers.",
      "Add the UnClick MCP server.",
      "Save .windsurfrules at the project root.",
      "Restart Windsurf and ask Cascade to load memory from UnClick.",
    ],
  },
  copilot: {
    planExamples: "Copilot Pro, Pro+, Business, Enterprise",
    included:
      "IDE completions and Copilot Chat features are covered by the selected Copilot plan and monthly AI credit rules.",
    metered:
      "Premium models, agent sessions, and cloud agent usage can consume monthly credits or trigger separate billing.",
    whereToCheck: "GitHub Copilot usage and billing settings.",
    setup: [
      "Open VS Code settings and find MCP Servers.",
      "Add the UnClick MCP server to the workspace.",
      "Save .github/copilot-instructions.md in the repo.",
      "Reload VS Code and start Copilot Chat with the workspace open.",
    ],
  },
  chatgpt: {
    planExamples: "ChatGPT Plus, Pro, Team, Enterprise",
    included:
      "Interactive ChatGPT sessions and connected MCP tools run inside the ChatGPT product experience.",
    metered:
      "OpenAI API usage is billed and managed separately from ChatGPT subscriptions.",
    whereToCheck: "ChatGPT plan settings and OpenAI Platform billing.",
    setup: [
      "Open ChatGPT connector settings for MCP tools.",
      "Add the UnClick MCP server.",
      "Start a fresh chat and ask ChatGPT to load memory from UnClick.",
      "Use the API tier for background jobs that should run without an active human chat.",
    ],
  },
};

function getStoredPlatform(): Platform {
  try {
    const value = localStorage.getItem(PLATFORM_STORAGE);
    if (value && PLATFORMS.includes(value as Platform)) return value as Platform;
  } catch {
    /* ignore */
  }
  return "claude-code";
}

function getApiKey(): string {
  try {
    return localStorage.getItem(API_KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

function formatRelative(iso: string | null): string {
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

function planStatus(connection: ConnectionStatus | null): string {
  if (!connection?.connected) return "Unknown until connected";
  return "Plan not exposed by provider API";
}

export default function AdminSeatsSubscription() {
  const { toast } = useToast();
  const { session } = useSession();
  const [apiKey] = useState<string>(getApiKey);
  const [platform, setPlatform] = useState<Platform>(getStoredPlatform);
  const [connection, setConnection] = useState<ConnectionStatus | null>(null);
  const [loadingConnection, setLoadingConnection] = useState(true);
  const [businessContext, setBusinessContext] = useState<BusinessContextEntry[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [serverConfig, setServerConfig] = useState<GeneratedConfigResponse | null>(null);
  const [generating, setGenerating] = useState(false);

  const selectedGuide = PLATFORM_GUIDES[platform];
  const previewLocal = useMemo(
    () => generateConfig(platform, businessContext),
    [platform, businessContext]
  );
  const activeConfig = serverConfig
    ? { content: serverConfig.content, filename: serverConfig.filename }
    : { content: previewLocal.content, filename: previewLocal.filename };
  const connectedCount = connection?.connected ? 1 : 0;

  useEffect(() => {
    try {
      localStorage.setItem(PLATFORM_STORAGE, platform);
    } catch {
      /* ignore */
    }
  }, [platform]);

  useEffect(() => {
    const effectiveToken = apiKey || session?.access_token || "";
    let cancelled = false;

    (async () => {
      setLoadingConnection(Boolean(effectiveToken));
      try {
        const requests: Promise<Response>[] = [fetch("/api/memory-admin?action=business_context")];
        if (effectiveToken) {
          requests.unshift(
            fetch("/api/memory-admin?action=admin_check_connection", {
              headers: { Authorization: `Bearer ${effectiveToken}` },
            })
          );
        }

        const responses = await Promise.all(requests);
        const [connRes, bcRes] = effectiveToken ? responses : [null, responses[0]];

        if (!cancelled && connRes?.ok) {
          setConnection((await connRes.json()) as ConnectionStatus);
        }
        if (!cancelled && bcRes.ok) {
          const body = (await bcRes.json()) as { data: BusinessContextEntry[] };
          setBusinessContext(body.data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          toast({
            title: "Could not refresh subscription status",
            description: (err as Error).message,
            variant: "destructive",
          });
        }
      } finally {
        if (!cancelled) setLoadingConnection(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiKey, session?.access_token, toast]);

  const checkConnection = async () => {
    const effectiveToken = apiKey || session?.access_token || "";
    if (!effectiveToken) {
      toast({
        title: "API key required",
        description: "Add your UnClick API key on the You page first.",
        variant: "destructive",
      });
      return;
    }
    setLoadingConnection(true);
    try {
      const res = await fetch("/api/memory-admin?action=admin_check_connection", {
        headers: { Authorization: `Bearer ${effectiveToken}` },
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? `Connection check failed (${res.status})`);
      }
      setConnection((await res.json()) as ConnectionStatus);
      toast({ title: "Connection checked", description: "UnClick status is up to date." });
    } catch (err) {
      toast({
        title: "Connection check failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoadingConnection(false);
    }
  };

  const regenerateFromServer = async () => {
    if (!apiKey) {
      toast({
        title: "API key required",
        description: "Server-side generation needs your UnClick API key.",
        variant: "destructive",
      });
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch(
        `/api/memory-admin?action=admin_generate_config&platform=${platform}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Generation failed");
      }
      setServerConfig((await res.json()) as GeneratedConfigResponse);
      setPreviewOpen(true);
    } catch (err) {
      toast({
        title: "Could not generate config",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePreview = async () => {
    setPreviewOpen(true);
    if (apiKey) await regenerateFromServer();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeConfig.content);
      toast({ title: "Copied", description: `${activeConfig.filename} copied to clipboard.` });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([activeConfig.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = activeConfig.filename.split("/").pop() ?? "config.md";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          <CreditCard className="h-3.5 w-3.5" />
          Seats / Subscription
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-heading">Subscriptions</h1>
        <p className="mt-1 max-w-2xl text-sm text-body">
          Manage Claude Code, Cursor, Windsurf, Copilot, and ChatGPT subscription paths for
          interactive work while keeping background automation routed deliberately.
        </p>
      </header>

      <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Connected platforms</h2>
            <p className="mt-1 text-xs text-white/60">
              UnClick checks its MCP connection once. Provider subscription plans are shown when
              the platform exposes them, otherwise this page shows where to verify the plan.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={checkConnection} disabled={loadingConnection}>
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loadingConnection ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-5">
          {PLATFORMS.map((item) => {
            const isSelected = item === platform;
            const isConnected = item === platform && connection?.connected;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPlatform(item);
                  setPreviewOpen(false);
                  setServerConfig(null);
                }}
                className={`min-h-[148px] rounded-lg border p-4 text-left transition-colors ${
                  isSelected
                    ? "border-[#61C1C4] bg-[#61C1C4]/10"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-[#61C1C4]/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{platformLabel(item)}</p>
                  {isConnected ? (
                    <CheckCircle2 className="h-4 w-4 text-[#61C1C4]" />
                  ) : (
                    <XCircle className="h-4 w-4 text-white/30" />
                  )}
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-white/35">Status</p>
                <p className="mt-1 text-xs text-white/70">
                  {item === platform && loadingConnection ? "Checking..." : isConnected ? "Connected" : "Not set up"}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-white/35">Plan</p>
                <p className="mt-1 text-xs text-white/70">
                  {item === platform ? planStatus(connection) : "Select to inspect"}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[11px] uppercase tracking-wider text-white/40">Selected platform</p>
            <p className="mt-1 text-sm font-medium text-white">{platformLabel(platform)}</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[11px] uppercase tracking-wider text-white/40">Connection</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
              {loadingConnection ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-white/40" />
                  Checking...
                </>
              ) : connection?.connected ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#61C1C4]" />
                  Connected
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5 text-[#E2B93B]" />
                  Not connected
                </>
              )}
            </p>
            {connection?.last_seen && (
              <p className="mt-1 text-[11px] text-white/40">
                Last seen {formatRelative(connection.last_seen)}
              </p>
            )}
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[11px] uppercase tracking-wider text-white/40">Server</p>
            <code className="mt-1 block truncate font-mono text-[11px] text-white">
              {SERVER_URL}
            </code>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#61C1C4]/10">
              <Settings2 className="h-4 w-4 text-[#61C1C4]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                Setup wizard for {platformLabel(platform)}
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Follow these steps after confirming the subscription account in the provider app.
              </p>
            </div>
          </div>

          <ol className="mt-5 space-y-3">
            {selectedGuide.setup.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#61C1C4]/30 bg-[#61C1C4]/10 text-xs font-semibold text-[#61C1C4]">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-sm text-white/75">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/memory/connect"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-[#61C1C4]/40 hover:text-white"
            >
              Open setup guide
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <Button variant="outline" size="sm" onClick={checkConnection} disabled={loadingConnection}>
              Check connection
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-[#E2B93B]/25 bg-[#E2B93B]/[0.05] p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-[#E2B93B]" />
            <div>
              <h2 className="text-sm font-semibold text-white">Subscription economics</h2>
              <p className="mt-1 text-xs font-semibold text-[#E2B93B]">
                Background automation is metered separately from your subscription.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/70">
            <p>
              Use subscriptions for interactive work: a human is present, the provider app is open,
              and UnClick is supplying context through MCP.
            </p>
            <p>
              Use the API tier for unattended jobs, batch processing, scheduled agents, retries,
              and anything expected to run after you leave the chat.
            </p>
            <p>
              Use the Local tier for private embeddings, OCR, cheap drafts, and workloads that
              should stay on your own machine.
            </p>
          </div>
          <div className="mt-5 rounded-lg border border-white/[0.06] bg-black/20 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">Current selection</p>
            <p className="mt-1">{selectedGuide.included}</p>
            <p className="mt-2">{selectedGuide.metered}</p>
            <p className="mt-2 text-white/45">Verify plan details in {selectedGuide.whereToCheck}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#61C1C4]/10">
              <Sparkles className="h-4 w-4 text-[#61C1C4]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Plan guide</h2>
              <p className="mt-1 text-xs text-white/60">
                Plan detection depends on provider APIs. When no plan API is available, UnClick
                keeps the plan field explicit instead of guessing.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-xs">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40">
                Common {platformLabel(platform)} tiers
              </p>
              <p className="mt-1 text-white/75">{selectedGuide.planExamples}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40">
                Best route by work type
              </p>
              <div className="mt-2 grid gap-2">
                {[
                  ["Interactive answer", "Subscription"],
                  ["Background batch", "API"],
                  ["Embeddings and OCR", "Local"],
                  ["Provider billing reports", "Provider dashboard"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="text-white/60">{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-white/70">
                {connectedCount} subscription platform connected through UnClick. More platforms can
                use the same MCP server once the provider app is configured.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-semibold text-white">Config files</h2>
          <p className="mt-1 text-xs text-white/60">
            {platformHasConfigFile(platform)
              ? "Preview, copy, or download the platform-specific file that tells the app to load UnClick first."
              : `${platformLabel(platform)} loads context through the MCP connector. No local config file is needed.`}
          </p>

          {platformHasConfigFile(platform) ? (
            <>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <FileText className="h-4 w-4 text-white/40" />
                <span className="text-white/50">File:</span>
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-[#61C1C4]">
                  {platformFilename(platform)}
                </code>
                {serverConfig && (
                  <span className="text-white/40">
                    Generated {formatRelative(serverConfig.generated_at)}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handlePreview}>
                  {previewOpen ? "Refresh preview" : "Preview"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerateFromServer}
                  disabled={generating || !apiKey}
                >
                  <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${generating ? "animate-spin" : ""}`} />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download
                </Button>
              </div>

              {previewOpen && (
                <div className="mt-4 overflow-hidden rounded-md border border-white/[0.06] bg-black/40">
                  <div className="border-b border-white/[0.06] px-3 py-2 font-mono text-[11px] text-white/40">
                    {activeConfig.filename}
                  </div>
                  <pre className="max-h-[420px] overflow-auto p-3 font-mono text-[11px] leading-relaxed text-white/90">
                    {activeConfig.content}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 rounded-md border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-white/70">
              Once the UnClick MCP server is added in {platformLabel(platform)} settings, identity,
              facts, and session history load at the start of every conversation.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
