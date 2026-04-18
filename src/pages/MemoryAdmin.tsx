/**
 * Memory Admin - placeholder page
 *
 * This page will become the visual admin dashboard for UnClick Memory.
 * It connects to /api/memory-admin to read/write all 6 memory layers.
 *
 * API actions available (GET unless noted):
 *   ?action=status - layer counts + decay tier breakdown
 *   ?action=business_context - all business context entries
 *   ?action=sessions&limit=20 - recent session summaries
 *   ?action=facts&query=x&show_all=true - extracted facts (search + filter)
 *   ?action=library - knowledge library index
 *   ?action=library_doc&slug=x - full document by slug
 *   ?action=conversations - session list with message counts
 *   ?action=conversations&session_id=x - messages for a session
 *   ?action=code&session_id=x - code dumps (optional session filter)
 *   ?action=search&query=x - full-text search across conversation logs
 *   ?action=delete_fact - POST: archive a fact (fact_id in body)
 *   ?action=delete_session - POST: delete a session summary (session_id in body)
 *   ?action=update_business_context - POST: upsert business context (category, key, value in body)
 *
 * Tabs planned for the full UI:
 *   1. Overview - counts per layer, decay chart, quick stats
 *   2. Context - business context entries (Layer 1), add/edit
 *   3. Library - knowledge library docs (Layer 2), view/edit
 *   4. Sessions - session summaries (Layer 3), browse/search
 *   5. Facts - extracted facts (Layer 4), search/archive/supersede
 *   6. Logs - conversation log (Layer 5), browse by session
 *   7. Code - code dumps (Layer 6), browse/search
 *   8. Search - full-text search across everything
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DuplicateFactsBanner from "@/components/DuplicateFactsBanner";
import {
  Brain,
  Database,
  Monitor,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Plug,
} from "lucide-react";

interface MemoryConfigStatus {
  configured: boolean;
  supabase_url?: string;
  schema_installed?: boolean;
  last_used_at?: string | null;
}

interface Device {
  id: string;
  label: string | null;
  platform: string | null;
  storage_mode: "local" | "cloud";
  first_seen: string;
  last_seen: string;
}

interface ToolDetection {
  tool_name: string;
  tool_category: string;
  classification: "replaceable" | "conflicting" | "compatible";
  last_detected_at: string;
  first_detected_at: string;
  nudge_dismissed: boolean;
  last_nudged_at: string | null;
}

interface ToolScan {
  replaceable: ToolDetection[];
  conflicting: ToolDetection[];
  compatible: ToolDetection[];
  summary: { replaceable: number; conflicting: number; compatible: number };
}

const REPLACEMENT_HINTS: Record<string, { alt: string; copy: string }> = {
  Exa: {
    alt: "web_search",
    copy: "UnClick has built-in web search that also remembers what you find. You could simplify by using UnClick's search.",
  },
  Tavily: {
    alt: "web_search",
    copy: "UnClick search covers what Tavily does, and it remembers your searches across sessions.",
  },
  Firecrawl: {
    alt: "web_scrape",
    copy: "UnClick can scrape and extract web content. It also remembers extracted pages.",
  },
  context7: {
    alt: "search_docs",
    copy: "UnClick can look up library docs and remembers which ones you use most.",
  },
};

function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "never";
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function MemoryAdminPage() {
  const [config, setConfig] = useState<MemoryConfigStatus | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [toolScan, setToolScan] = useState<ToolScan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const apiKey = localStorage.getItem("unclick_api_key") ?? "";
    if (!apiKey) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const [cfgRes, devRes, scanRes] = await Promise.all([
          fetch(`/api/memory-admin?action=setup_status&api_key=${encodeURIComponent(apiKey)}`),
          fetch("/api/memory-admin?action=list_devices", {
            headers: { Authorization: `Bearer ${apiKey}` },
          }),
          fetch("/api/memory-admin?action=admin_tool_scan", {
            headers: { Authorization: `Bearer ${apiKey}` },
          }),
        ]);

        if (!cancelled && cfgRes.ok) {
          setConfig((await cfgRes.json()) as MemoryConfigStatus);
        }
        if (!cancelled && devRes.ok) {
          const body = (await devRes.json()) as { data: Device[] };
          setDevices(body.data ?? []);
        }
        if (!cancelled && scanRes.ok) {
          setToolScan((await scanRes.json()) as ToolScan);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function dismissNudge(toolName: string, dismissed = true): Promise<void> {
    const apiKey = localStorage.getItem("unclick_api_key") ?? "";
    if (!apiKey) return;
    await fetch("/api/memory-admin?action=dismiss_tool_nudge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ tool_name: toolName, dismissed }),
    });
    setToolScan((prev) => {
      if (!prev) return prev;
      const update = (list: ToolDetection[]): ToolDetection[] =>
        list.map((t) => (t.tool_name === toolName ? { ...t, nudge_dismissed: dismissed } : t));
      return {
        ...prev,
        replaceable: update(prev.replaceable),
        conflicting: update(prev.conflicting),
        compatible: update(prev.compatible),
      };
    });
  }

  const localCount = devices.filter((d) => d.storage_mode === "local").length;
  const cloudCount = devices.filter((d) => d.storage_mode === "cloud").length;
  const shouldNudge = !config?.configured && devices.length >= 2;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-32 pt-28">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Memory Admin</h1>
            <p className="text-sm text-body">View and manage your agent's persistent memory</p>
          </div>
        </div>

        {/* Duplicate fact detection - shown when two memory tools have been saving overlapping facts */}
        <DuplicateFactsBanner />

        {/* Top-level nudge: user has 2+ devices on local storage but no cloud config */}
        {shouldNudge && (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-heading">
                  You're using UnClick on {devices.length} machines.
                </p>
                <p className="mt-1 text-xs text-body">
                  Turn on cloud sync so memory follows you across all of them. Bring your own Supabase - 
                  we never see your data. One paste, you're done.
                </p>
              </div>
              <Link
                to="/memory/setup"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Turn on cloud sync
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Cloud sync status */}
          <div className="rounded-xl border border-border/40 bg-card/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-heading">
                <Database className="h-4 w-4 text-primary" />
                Cloud sync
              </h2>
              {config?.configured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                  <CheckCircle2 className="h-3 w-3" /> Connected
                </span>
              )}
            </div>

            {loading ? (
              <p className="mt-3 text-xs text-muted-foreground">Loading...</p>
            ) : !config?.configured ? (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-body">
                  Memory's running locally on this device. Turn on cloud sync to share context across
                  every machine you use.
                </p>
                <Link
                  to="/memory/setup"
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Set up cloud sync
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ) : (
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">Project</span>
                  <code className="truncate font-mono text-[11px] text-heading">
                    {config.supabase_url}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Schema</span>
                  <span className={config.schema_installed ? "text-primary" : "text-amber-400"}>
                    {config.schema_installed ? "installed" : "pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last sync</span>
                  <span className="text-body">{formatRelative(config.last_used_at)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Devices */}
          <div className="rounded-xl border border-border/40 bg-card/20 p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-heading">
              <Monitor className="h-4 w-4 text-primary" />
              Devices
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {cloudCount} cloud / {localCount} local
              </span>
            </h2>

            {loading ? (
              <p className="mt-3 text-xs text-muted-foreground">Loading...</p>
            ) : devices.length === 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">
                No devices seen yet. Fire up the MCP server on any machine and it'll appear here.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-border/20">
                {devices.map((d) => (
                  <li key={d.id} className="flex items-center justify-between py-2 text-xs">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-heading">{d.label ?? "Unknown device"}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {d.platform ?? "unknown"} · seen {formatRelative(d.last_seen)}
                      </p>
                    </div>
                    <span
                      className={`ml-3 inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                        d.storage_mode === "cloud"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border/50 bg-card/40 text-muted-foreground"
                      }`}
                    >
                      {d.storage_mode}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border/40 bg-card/20 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-heading">
              <Plug className="h-4 w-4 text-primary" />
              Your connected tools
            </h2>
            {toolScan && (
              <span className="font-mono text-[11px] text-muted-foreground">
                {toolScan.summary.replaceable} could simplify · {toolScan.summary.conflicting}{" "}
                conflicts · {toolScan.summary.compatible} compatible
              </span>
            )}
          </div>

          {loading ? (
            <p className="mt-3 text-xs text-muted-foreground">Loading...</p>
          ) : !toolScan || toolScan.summary.replaceable + toolScan.summary.conflicting + toolScan.summary.compatible === 0 ? (
            <p className="mt-3 text-xs text-muted-foreground">
              UnClick hasn't seen any other MCP tools in your sessions yet. Pass
              {" "}<code className="rounded bg-muted/20 px-1 font-mono text-[10px] text-primary">session_tools</code>{" "}
              to <code className="rounded bg-muted/20 px-1 font-mono text-[10px] text-primary">get_startup_context</code>{" "}
              to enable detection.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              {toolScan.conflicting.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-400">
                    <AlertTriangle className="h-3 w-3" /> Memory conflicts
                  </h3>
                  <ul className="space-y-2">
                    {toolScan.conflicting.map((t) => (
                      <li
                        key={t.tool_name}
                        className="flex items-start justify-between gap-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-heading">{t.tool_name}</p>
                          <p className="mt-0.5 text-xs text-body">
                            Running two memory tools causes duplicate facts. We recommend removing
                            {" "}{t.tool_name} so UnClick handles all your memory.
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            seen {formatRelative(t.last_detected_at)}
                          </span>
                          {!t.nudge_dismissed ? (
                            <button
                              onClick={() => dismissNudge(t.tool_name, true)}
                              className="rounded-md border border-border/50 bg-card/40 px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-heading"
                            >
                              I've removed it
                            </button>
                          ) : (
                            <span className="font-mono text-[10px] text-primary">dismissed</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {toolScan.replaceable.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Sparkles className="h-3 w-3" /> UnClick can handle these
                  </h3>
                  <ul className="space-y-2">
                    {toolScan.replaceable.map((t) => {
                      const hint = REPLACEMENT_HINTS[t.tool_name];
                      return (
                        <li
                          key={t.tool_name}
                          className="flex items-start justify-between gap-3 rounded-lg border border-primary/20 bg-primary/[0.04] p-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-heading">{t.tool_name}</p>
                            <p className="mt-0.5 text-xs text-body">
                              {hint?.copy ??
                                "UnClick has a built-in alternative that also remembers what you do."}
                            </p>
                            {hint?.alt && (
                              <p className="mt-1 font-mono text-[10px] text-primary">
                                Try: {hint.alt}
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1">
                            <span className="font-mono text-[10px] text-muted-foreground">
                              seen {formatRelative(t.last_detected_at)}
                            </span>
                            {!t.nudge_dismissed ? (
                              <button
                                onClick={() => dismissNudge(t.tool_name, true)}
                                className="rounded-md border border-border/50 bg-card/40 px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-heading"
                              >
                                Keep {t.tool_name}
                              </button>
                            ) : (
                              <button
                                onClick={() => dismissNudge(t.tool_name, false)}
                                className="rounded-md border border-border/50 bg-card/40 px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-heading"
                              >
                                Show nudge
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {toolScan.compatible.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <CheckCircle2 className="h-3 w-3" /> Works great with UnClick
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {toolScan.compatible.map((t) => (
                      <li
                        key={t.tool_name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1 text-xs text-heading"
                      >
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        {t.tool_name}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
