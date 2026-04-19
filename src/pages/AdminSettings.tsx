/**
 * AdminSettings -- the central control surface for an UnClick user.
 *
 * Sections (top to bottom):
 *   - Connection         platform picker + connection status
 *   - Your AI Config     generated config file preview / download
 *   - Memory Loading     auto-load toggle
 *   - Isolation          single-memory-tool guidance
 *   - Danger Zone        clear / export
 *   - Support            bug reporting
 *
 * Most controls hit /api/memory-admin with the user's API key.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminShell from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  generateConfig,
  platformFilename,
  platformLabel,
  type BusinessContextEntry,
  type Platform,
} from "@/lib/configGenerator";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  RefreshCw,
  AlertTriangle,
  Bug,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
} from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";
const PLATFORM_STORAGE = "unclick_platform";
const PLATFORMS: Platform[] = ["claude-code", "cursor", "windsurf", "copilot"];

const SERVER_URL = "https://unclick.world/api/mcp";

interface ConnectionStatus {
  connected: boolean;
  last_seen: string | null;
  cloud_sync: boolean;
}

interface GeneratedConfigResponse {
  content: string;
  filename: string;
  instructions: string;
  generated_at: string;
}

function getStoredPlatform(): Platform {
  try {
    const v = localStorage.getItem(PLATFORM_STORAGE);
    if (v && PLATFORMS.includes(v as Platform)) return v as Platform;
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

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [apiKey] = useState<string>(getApiKey);
  const [platform, setPlatform] = useState<Platform>(getStoredPlatform);

  const [connection, setConnection] = useState<ConnectionStatus | null>(null);
  const [loadingConnection, setLoadingConnection] = useState(true);

  const [autoload, setAutoload] = useState(false);
  const [autoloadSaving, setAutoloadSaving] = useState(false);

  const [businessContext, setBusinessContext] = useState<BusinessContextEntry[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [serverConfig, setServerConfig] = useState<GeneratedConfigResponse | null>(null);
  const [generating, setGenerating] = useState(false);

  const [howToCheckOpen, setHowToCheckOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(PLATFORM_STORAGE, platform);
    } catch {
      /* ignore */
    }
  }, [platform]);

  useEffect(() => {
    if (!apiKey) {
      setLoadingConnection(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [connRes, settingsRes, bcRes] = await Promise.all([
          fetch("/api/memory-admin?action=admin_check_connection", {
            headers: { Authorization: `Bearer ${apiKey}` },
          }),
          fetch("/api/memory-admin?action=tenant_settings_get", {
            headers: { Authorization: `Bearer ${apiKey}` },
          }),
          fetch("/api/memory-admin?action=business_context"),
        ]);
        if (!cancelled && connRes.ok) {
          setConnection((await connRes.json()) as ConnectionStatus);
        }
        if (!cancelled && settingsRes.ok) {
          const body = (await settingsRes.json()) as { data: Record<string, unknown> };
          setAutoload(Boolean(body.data?.autoload));
        }
        if (!cancelled && bcRes.ok) {
          const body = (await bcRes.json()) as { data: BusinessContextEntry[] };
          setBusinessContext(body.data ?? []);
        }
      } finally {
        if (!cancelled) setLoadingConnection(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  const handleAutoloadChange = async (next: boolean) => {
    if (!apiKey) {
      toast({
        title: "API key required",
        description: "Add your UnClick API key on the Connect page first.",
        variant: "destructive",
      });
      return;
    }
    setAutoloadSaving(true);
    const previous = autoload;
    setAutoload(next);
    try {
      const res = await fetch("/api/memory-admin?action=tenant_settings_set", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "autoload", value: next }),
      });
      if (!res.ok) throw new Error((await res.json())?.error ?? "Save failed");
      toast({
        title: next ? "Auto-load on" : "Auto-load off",
        description: next
          ? "Your AI tool will receive your memory at session start."
          : "Memory will only load when your AI explicitly asks for it.",
      });
    } catch (err) {
      setAutoload(previous);
      toast({
        title: "Could not save",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setAutoloadSaving(false);
    }
  };

  const previewLocal = generateConfig(platform, businessContext);

  const handlePreview = async () => {
    setPreviewOpen(true);
    if (!apiKey) return;
    await regenerateFromServer();
  };

  const regenerateFromServer = async () => {
    if (!apiKey) return;
    setGenerating(true);
    try {
      const res = await fetch(
        `/api/memory-admin?action=admin_generate_config&platform=${platform}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      if (!res.ok) throw new Error((await res.json())?.error ?? "Generation failed");
      setServerConfig((await res.json()) as GeneratedConfigResponse);
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

  const activeConfig = serverConfig
    ? { content: serverConfig.content, filename: serverConfig.filename }
    : { content: previewLocal.content, filename: previewLocal.filename };

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
    const a = document.createElement("a");
    a.href = url;
    a.download = activeConfig.filename.split("/").pop() ?? "config.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearMemory = () => {
    toast({
      title: "Heads up",
      description: "Clear-all is only available from the Memory Admin page right now.",
    });
  };

  const handleExport = () => {
    if (!apiKey) return;
    window.open(`/api/memory-admin?action=business_context`, "_blank");
  };

  return (
    <AdminShell title="Settings" subtitle="Manage how UnClick connects to your AI tool.">
      <div className="space-y-8">
        {/* CONNECTION ─────────────────────────────────────────── */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">Connection</h2>
          <p className="mt-1 text-xs text-body">
            Pick which AI tool you're using. The setup steps and config file format will follow.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                  platform === p
                    ? "border-primary bg-primary/10 text-heading"
                    : "border-border/40 bg-card/30 text-body hover:border-primary/40 hover:text-heading"
                }`}
              >
                {platformLabel(p)}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-border/40 bg-card/30 p-3 text-xs">
              <p className="text-muted-foreground">Status</p>
              <p className="mt-1 flex items-center gap-1.5 font-medium text-heading">
                {loadingConnection ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    Checking...
                  </>
                ) : connection?.connected ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    Connected
                  </>
                ) : (
                  <>
                    <XCircle className="h-3.5 w-3.5 text-amber-400" />
                    Not connected
                  </>
                )}
              </p>
              {connection?.last_seen && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Last seen {formatRelative(connection.last_seen)}
                </p>
              )}
            </div>
            <div className="rounded-md border border-border/40 bg-card/30 p-3 text-xs">
              <p className="text-muted-foreground">Server</p>
              <code className="mt-1 block truncate font-mono text-[11px] text-heading">
                {SERVER_URL}
              </code>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to="/admin/connect"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              View setup steps for {platformLabel(platform)}
            </Link>
          </div>
        </section>

        {/* YOUR AI CONFIG ─────────────────────────────────────── */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">Your AI Config</h2>
          <p className="mt-1 text-xs text-body">
            UnClick can generate a config file for your AI tool so it knows who you are from the
            first message.
          </p>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Config file type:</span>
              <code className="rounded bg-muted/20 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                {platformFilename(platform)}
              </code>
              <span className="text-muted-foreground">
                (auto-selected from your platform choice)
              </span>
            </div>
            {serverConfig && (
              <p className="text-muted-foreground">
                Last generated {formatRelative(serverConfig.generated_at)} for{" "}
                {platformLabel(platform)}.
              </p>
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
              disabled={generating}
            >
              <RefreshCw
                className={`mr-1.5 h-3.5 w-3.5 ${generating ? "animate-spin" : ""}`}
              />
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
            <div className="mt-4 rounded-md border border-border/40 bg-card/60">
              <div className="border-b border-border/40 px-3 py-2 text-[11px] font-mono text-muted-foreground">
                {activeConfig.filename}
              </div>
              <pre className="max-h-[420px] overflow-auto p-3 font-mono text-[11px] leading-relaxed text-heading">
                {activeConfig.content}
              </pre>
            </div>
          )}
        </section>

        {/* MEMORY LOADING ─────────────────────────────────────── */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">Memory Loading</h2>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-heading">
                Automatically loads your memory when an AI session starts
              </p>
              <p className="mt-1 max-w-md text-xs text-body">
                When on, your AI tool receives your identity, facts, and session history before you
                even type anything.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">{autoload ? "On" : "Off"}</span>
              <Switch
                checked={autoload}
                onCheckedChange={handleAutoloadChange}
                disabled={autoloadSaving || !apiKey}
                aria-label="Auto-load memory at session start"
              />
            </div>
          </div>

          {!apiKey && (
            <p className="mt-3 text-[11px] text-amber-300">
              Add your UnClick API key on the Connect page to change this.
            </p>
          )}
        </section>

        {/* ISOLATION ─────────────────────────────────────────── */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">Isolation</h2>
          <p className="mt-1 text-sm font-medium text-heading">
            UnClick works best as your only memory tool.
          </p>
          <p className="mt-2 text-xs text-body">
            Running multiple memory tools (like Mem0, Zep, or Hindsight alongside UnClick) causes
            duplicate facts and confused AI responses. Other tools like GitHub, Slack, or database
            connectors work fine.
          </p>

          <button
            type="button"
            onClick={() => setHowToCheckOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            How to check what's running
            {howToCheckOpen ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>

          {howToCheckOpen && (
            <ul className="mt-3 space-y-2 rounded-md border border-border/40 bg-card/30 p-3 text-xs text-body">
              <li>
                <span className="font-semibold text-heading">Claude Code:</span> Run{" "}
                <code className="rounded bg-muted/20 px-1 font-mono text-[11px] text-primary">
                  claude mcp list
                </code>{" "}
                in your terminal
              </li>
              <li>
                <span className="font-semibold text-heading">Cursor:</span> Settings &gt; Tools
                &amp; MCP -- look for memory-related servers
              </li>
              <li>
                <span className="font-semibold text-heading">Windsurf:</span> Settings &gt; Cascade
                &gt; MCP Servers
              </li>
              <li>
                <span className="font-semibold text-heading">Copilot:</span> VS Code Settings &gt;
                MCP Servers
              </li>
            </ul>
          )}
        </section>

        {/* DANGER ZONE ────────────────────────────────────────── */}
        <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-heading">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Danger Zone
          </h2>
          <p className="mt-1 text-xs text-body">
            Permanent actions. Double-check before clicking.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleClearMemory}>
              Clear all memory
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export everything
            </Button>
          </div>
        </section>

        {/* SUPPORT ────────────────────────────────────────────── */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-heading">
            <Bug className="h-4 w-4 text-muted-foreground" />
            Support
          </h2>
          <p className="mt-1 text-xs text-body">Found something off? Let us know.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://github.com/anthropics/claude-code/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-primary/40 hover:text-heading"
            >
              Report a bug
            </a>
            <a
              href="https://github.com/anthropics/claude-code/issues?q=is%3Aissue"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-primary/40 hover:text-heading"
            >
              View submitted bugs
            </a>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
