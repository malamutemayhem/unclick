/**
 * Connect your AI - one-page setup for every client
 *
 * UX goal: the user picks the AI app they use (ChatGPT, Claude, Claude Code,
 * Cursor, Windsurf), follows two or three plain-English steps, and UnClick is
 * permanently wired in. No-terminal clients lead; jargon stays out of the
 * headings. The headless / CI worker path keeps its own section at the bottom.
 */

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { Button } from "@/components/ui/button";
import {
  Plug,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Terminal,
  AlertCircle,
} from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";
const MCP_URL = "https://unclick.world/api/mcp";
const CLAUDE_MD_SNIPPET =
  "Always call load_memory from the unclick MCP server before doing anything else.";

interface CheckResult {
  connected: boolean;
  configured: boolean;
  has_context: boolean;
  context_count: number;
  fact_count: number;
  last_session: string | null;
  last_session_platform: string | null;
  last_used_at: string | null;
}

function maskKey(key: string): string {
  if (!key) return "";
  if (key.length <= 12) return key;
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "never";
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  return `${days} days ago`;
}

type ClientId = "chatgpt" | "claude" | "claude-code" | "cursor" | "windsurf";

interface ClientGuide {
  id: ClientId;
  name: string;
  badge: string;
  steps: string[];
  copyLabel: string;
  // What the copy button puts on the clipboard. Clients whose value embeds the
  // key set containsKey so the button can require one and warn about it.
  copyValue: (key: string) => string;
  displayValue: (maskedKey: string) => string;
  containsKey: boolean;
  afterNote?: string;
}

// No-terminal clients lead. The URL-only clients connect with the clean
// address plus a sign-in, so nothing secret ends up pasted anywhere.
const CLIENT_GUIDES: ClientGuide[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    badge: "No terminal",
    steps: [
      "Open ChatGPT Settings, then Apps & Connectors.",
      "Choose New App, and name it UnClick.",
      "Paste the address below into Server URL.",
      "Pick OAuth as the authentication and hit Create.",
      "Sign in with your UnClick login when asked. Done.",
    ],
    copyLabel: "Copy address",
    copyValue: () => MCP_URL,
    displayValue: () => MCP_URL,
    containsKey: false,
    afterNote:
      "If your version has no sign-in option, use the worker address at the bottom of this page instead.",
  },
  {
    id: "claude",
    name: "Claude",
    badge: "No terminal",
    steps: [
      "Open Settings, then Connectors (same place on claude.ai and Claude Desktop).",
      "Click Add custom connector, and name it UnClick.",
      "Paste the address below.",
      "Sign in with your UnClick login when asked. Done.",
    ],
    copyLabel: "Copy address",
    copyValue: () => MCP_URL,
    displayValue: () => MCP_URL,
    containsKey: false,
  },
  {
    id: "claude-code",
    name: "Claude Code",
    badge: "One command",
    steps: [
      "Copy the command below.",
      "Paste it into your terminal and press Enter. Done.",
    ],
    copyLabel: "Copy command",
    copyValue: (k) =>
      `claude mcp add --transport http unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
    displayValue: (masked) =>
      `claude mcp add --transport http unclick ${MCP_URL} --header "Authorization: Bearer ${masked}"`,
    containsKey: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    badge: "One command",
    steps: [
      "Copy the command below.",
      "Paste it into your terminal and press Enter. Done.",
    ],
    copyLabel: "Copy command",
    copyValue: (k) =>
      `cursor mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
    displayValue: (masked) =>
      `cursor mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${masked}"`,
    containsKey: true,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    badge: "One command",
    steps: [
      "Copy the command below.",
      "Paste it into your terminal and press Enter. Done.",
    ],
    copyLabel: "Copy command",
    copyValue: (k) =>
      `windsurf mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
    displayValue: (masked) =>
      `windsurf mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${masked}"`,
    containsKey: true,
  },
];

export default function MemoryConnectPage() {
  useCanonical("/memory/connect");

  const [apiKey, setApiKey] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<ClientId>("chatgpt");
  const [clientCopied, setClientCopied] = useState(false);

  const [checking, setChecking] = useState(false);
  const [check, setCheck] = useState<CheckResult | null>(null);
  const [checkError, setCheckError] = useState<string>("");

  const [claudeMdCopied, setClaudeMdCopied] = useState(false);
  const [workerCopied, setWorkerCopied] = useState(false);

  useEffect(() => {
    try {
      setApiKey(localStorage.getItem(API_KEY_STORAGE) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const guide = useMemo(
    () => CLIENT_GUIDES.find((c) => c.id === selectedClient) ?? CLIENT_GUIDES[0],
    [selectedClient],
  );

  const guideCopyValue = useMemo(
    () => guide.copyValue(apiKey || "YOUR_API_KEY"),
    [guide, apiKey],
  );
  const guideDisplayValue = useMemo(
    () => guide.displayValue(apiKey ? maskKey(apiKey) : "YOUR_API_KEY"),
    [guide, apiKey],
  );

  // Headless / CI / cloud-worker path: a static key carried in the connection
  // itself (in the URL). Unlike the interactive login, it needs no human to
  // re-authorize, so the session reconnects on its own after an idle drop. This
  // is the path that keeps unattended workers from going dark.
  const workerUrl = useMemo(
    () => `${MCP_URL}?key=${apiKey || "YOUR_API_KEY"}`,
    [apiKey],
  );
  const workerUrlDisplay = useMemo(
    () => `${MCP_URL}?key=${apiKey ? maskKey(apiKey) : "YOUR_API_KEY"}`,
    [apiKey],
  );

  const copy = async (text: string, onCopied: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopied();
    } catch {
      /* ignore */
    }
  };

  const handleGuideCopy = () => {
    copy(guideCopyValue, () => {
      setClientCopied(true);
      setTimeout(() => setClientCopied(false), 3000);
    });
  };

  const handleClaudeMdCopy = () => {
    copy(CLAUDE_MD_SNIPPET, () => {
      setClaudeMdCopied(true);
      setTimeout(() => setClaudeMdCopied(false), 3000);
    });
  };

  const handleWorkerCopy = () => {
    copy(workerUrl, () => {
      setWorkerCopied(true);
      setTimeout(() => setWorkerCopied(false), 3000);
    });
  };

  const handleCheck = async () => {
    setCheckError("");
    if (!apiKey) {
      setCheckError("No API key found. Grab one from the homepage first.");
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(
        `/api/memory-admin?action=admin_check_connection&api_key=${encodeURIComponent(apiKey)}`,
      );
      const data = (await res.json()) as CheckResult & { error?: string };
      if (!res.ok) {
        setCheckError(data.error ?? "Check failed.");
      } else {
        setCheck(data);
      }
    } catch (err) {
      setCheckError((err as Error).message);
    } finally {
      setChecking(false);
    }
  };

  const checkLine = useMemo(() => {
    if (!check) return null;
    if (!check.connected) {
      return "Not connected yet. Follow the steps above, then start a session in your AI app.";
    }
    const parts: string[] = [];
    parts.push(`${check.fact_count} ${check.fact_count === 1 ? "fact" : "facts"} stored`);
    if (check.context_count > 0) {
      parts.push(`${check.context_count} identity ${check.context_count === 1 ? "entry" : "entries"}`);
    }
    if (check.last_session) parts.push(`last session ${formatRelative(check.last_session)}`);
    else if (check.last_used_at) parts.push(`last seen ${formatRelative(check.last_used_at)}`);
    return `Connected. ${parts.join(", ")}.`;
  }, [check]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-28">
        {/* Hero */}
        <FadeIn>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <Sparkles className="h-3 w-3" />
            Pick your app. Two minutes. Done.
          </div>
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            <Plug className="h-8 w-8 text-primary" />
            Connect your AI
          </h1>
          <p className="mt-3 max-w-xl text-sm text-body">
            Works with ChatGPT, Claude, Claude Code, Cursor, and Windsurf. Once connected, your AI
            loads your memory, context, and standing rules at the start of every session.
          </p>
        </FadeIn>

        {/* Client picker */}
        <FadeIn delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose your AI app">
            {CLIENT_GUIDES.map((client) => {
              const selected = client.id === selectedClient;
              return (
                <button
                  key={client.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setSelectedClient(client.id);
                    setClientCopied(false);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary/15 text-heading"
                      : "border-border/40 bg-card/20 text-body hover:border-primary/40 hover:text-heading"
                  }`}
                >
                  {client.name}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Per-client steps */}
        <FadeIn delay={0.1}>
          <section className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
                <Terminal className="h-3.5 w-3.5" />
                Connect {guide.name}
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {guide.badge}
              </span>
            </div>

            {guide.containsKey && !apiKey && (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  No API key found.{" "}
                  <Link to="/" className="underline">
                    Grab one free here
                  </Link>
                  , then come back.
                </span>
              </div>
            )}

            <ol className="mt-4 space-y-2">
              {guide.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-body">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-4">
              <code className="block whitespace-pre-wrap font-mono text-xs text-heading sm:text-sm">
                {guideDisplayValue}
              </code>
            </div>

            <Button
              onClick={handleGuideCopy}
              disabled={guide.containsKey && !apiKey}
              className="mt-4 w-full bg-primary text-black font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              size="lg"
            >
              {clientCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> {guide.copyLabel}
                </>
              )}
            </Button>

            {guide.containsKey ? (
              <p className="mt-3 text-[11px] text-muted-foreground">
                The copied command contains your full key. The display above hides the middle for
                shoulder-surfing protection.
              </p>
            ) : (
              <p className="mt-3 text-[11px] text-muted-foreground">
                Nothing secret in this address. You prove it is you by signing in, so there is no
                key to look after.
              </p>
            )}

            {guide.afterNote && (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-border/40 bg-card/30 p-3 text-xs text-body">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{guide.afterNote}</span>
              </div>
            )}
          </section>
        </FadeIn>

        {/* Automatic memory line, only where a CLAUDE.md exists */}
        {selectedClient === "claude-code" && (
          <FadeIn delay={0.12}>
            <section className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Make it automatic
              </div>
              <h2 className="mt-2 text-base font-semibold text-heading">
                Load your memory at the start of every session
              </h2>
              <p className="mt-2 text-sm text-body">
                Add this line to your CLAUDE.md file so UnClick loads your memory before anything
                else happens.
              </p>

              <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-4">
                <code className="block whitespace-pre-wrap font-mono text-xs text-heading sm:text-sm">
                  {CLAUDE_MD_SNIPPET}
                </code>
              </div>

              <Button
                onClick={handleClaudeMdCopy}
                className="mt-4 w-full bg-primary text-black font-semibold transition-opacity hover:opacity-90 sm:w-auto"
                size="lg"
              >
                {claudeMdCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy line
                  </>
                )}
              </Button>

              <div className="mt-5 space-y-2 rounded-md border border-border/30 bg-card/30 p-4 text-xs">
                <p className="font-semibold text-heading">Where to paste it</p>
                <ul className="space-y-1 text-body">
                  <li>
                    <span className="text-heading">Global (all projects):</span>{" "}
                    <code className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[11px]">~/.claude/CLAUDE.md</code>
                  </li>
                  <li>
                    <span className="text-heading">This project only:</span>{" "}
                    <code className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[11px]">CLAUDE.md</code>{" "}
                    in your project root
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  <span className="font-semibold">Heads up:</span> pick one memory tool and stick with it.
                  Running UnClick alongside other memory systems (Mem0, Zep, mem-based agents) tends to
                  duplicate facts, scramble context, and slow your AI down. UnClick works best as your
                  only memory.
                </span>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Check connection */}
        <FadeIn delay={0.15}>
          <section className="mt-6 rounded-2xl border border-border/40 bg-card/30 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-heading">Already connected?</h2>
                <p className="mt-1 text-xs text-body">
                  Verify your AI is reaching your memory.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleCheck}
                disabled={checking || !apiKey}
                className="shrink-0"
              >
                {checking ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Checking
                  </>
                ) : (
                  "Check connection"
                )}
              </Button>
            </div>

            {checkError && (
              <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-300">
                <AlertCircle className="mr-1 inline h-3.5 w-3.5" />
                {checkError}
              </div>
            )}

            {check && !checkError && (
              <div
                className={`mt-4 flex items-start gap-2 rounded-md border p-3 text-xs ${
                  check.connected
                    ? "border-primary/30 bg-primary/5 text-heading"
                    : "border-border/40 bg-muted/10 text-body"
                }`}
              >
                <span
                  className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${
                    check.connected ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
                <span>{checkLine}</span>
              </div>
            )}
          </section>
        </FadeIn>

        {/* Headless / CI / cloud workers: static-key path that survives idle */}
        <FadeIn delay={0.22}>
          <section className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
              <Terminal className="h-3.5 w-3.5" />
              Cloud, CI, or headless agent?
            </div>
            <h2 className="mt-2 text-base font-semibold text-heading">
              Use the static-key URL so the session reconnects itself
            </h2>
            <p className="mt-2 text-sm text-body">
              An interactive login can't be re-shown in a headless worker (no human, no popup), so those
              sessions go dark when the connection idles out. This URL carries the key with it, so it
              re-authorizes on its own. No login, no babysitting.
            </p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-4">
              <code className="block whitespace-pre-wrap font-mono text-xs text-heading sm:text-sm">
                {workerUrlDisplay}
              </code>
            </div>

            <Button
              onClick={handleWorkerCopy}
              disabled={!apiKey}
              className="mt-4 w-full bg-primary text-black font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              size="lg"
            >
              {workerCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy worker URL
                </>
              )}
            </Button>

            <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <span className="font-semibold">Heads up:</span> this URL contains your key, so treat it
                like a password. For unattended workers, mint a dedicated worker key at{" "}
                <Link to="/admin/you" className="underline">
                  Admin, then You, then Worker Keys
                </Link>{" "}
                so you can revoke it on its own and your main key never rides along.
              </span>
            </div>
          </section>
        </FadeIn>

        {/* Footer link back to admin */}
        <FadeIn delay={0.25}>
          <div className="mt-8 flex items-center justify-between rounded-lg border border-border/40 bg-card/30 p-4 text-xs text-body">
            <span>Want to see what UnClick remembers about you?</span>
            <Link to="/admin/memory" className="text-primary hover:underline">
              Open memory &rarr;
            </Link>
          </div>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
