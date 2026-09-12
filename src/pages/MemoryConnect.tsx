/**
 * Connect your AI - the public door
 *
 * Core UX principle: UnClick is a SUPER SIMPLE experience. Connecting is one
 * address plus a sign-in. The user pastes https://unclick.world/api/mcp into
 * any AI app; the server walks the AI through the handshake (sign-in link,
 * magic link email, paired). No keys to copy, no per-client ceremony. The
 * terminal one-liners and the static-key compatibility URL stay available
 * below as secondary paths, not the headline.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";
import {
  Plug,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
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
  paired?: boolean;
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

interface TerminalClient {
  name: string;
  command: (apiKey: string) => string;
}

// Terminal AIs cannot click a sign-in link mid-setup, so they connect with the
// key carried in a one-line command instead of the handshake.
const TERMINAL_CLIENTS: TerminalClient[] = [
  {
    name: "Claude Code",
    command: (k) =>
      `claude mcp add --transport http unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
  },
  {
    name: "Cursor",
    command: (k) =>
      `cursor mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
  },
  {
    name: "Windsurf",
    command: (k) =>
      `windsurf mcp add unclick ${MCP_URL} --header "Authorization: Bearer ${k}"`,
  },
];

const DOOR_STEPS: { title: string; detail: string }[] = [
  {
    title: "Paste the address into your AI's connector settings.",
    detail:
      "ChatGPT: Settings, then Apps & Connectors, then New App. Claude: Settings, then Connectors, then Add custom connector. Any auth option works, including No Auth.",
  },
  {
    title: "Sign in when it asks.",
    detail:
      'No sign-in prompt? Just tell your AI "connect UnClick" and it hands you a link. We email you a magic link; click it.',
  },
  {
    title: "That's the handshake. Done.",
    detail:
      "Your memory lives with us, so there is nothing to install or set up. Every session starts already knowing you.",
  },
];

export default function MemoryConnectPage() {
  useCanonical("/memory/connect");

  const { session, loading: sessionLoading } = useSession();

  const [apiKey, setApiKey] = useState<string>("");
  const [addressCopied, setAddressCopied] = useState(false);

  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalCopied, setTerminalCopied] = useState<string | null>(null);
  const [claudeMdCopied, setClaudeMdCopied] = useState(false);

  const [checking, setChecking] = useState(false);
  const [check, setCheck] = useState<CheckResult | null>(null);
  const [checkError, setCheckError] = useState<string>("");

  const [workerCopied, setWorkerCopied] = useState(false);

  useEffect(() => {
    try {
      setApiKey(localStorage.getItem(API_KEY_STORAGE) ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  // Compatibility link: the same door with the key carried in the URL. For
  // apps with no sign-in flow and for headless workers that must reconnect
  // without a human.
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

  const handleAddressCopy = () => {
    copy(MCP_URL, () => {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 3000);
    });
  };

  const handleTerminalCopy = (name: string, command: string) => {
    copy(command, () => {
      setTerminalCopied(name);
      setTimeout(
        () => setTerminalCopied((current) => (current === name ? null : current)),
        3000,
      );
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

  const checkConnection = useCallback(async () => {
    setCheckError("");
    if (!apiKey && !session) {
      setCheckError(
        "Sign in to see your connection status.",
      );
      return;
    }
    setChecking(true);
    try {
      const headers: Record<string, string> = {};
      if (session) headers.Authorization = `Bearer ${session.access_token}`;
      else if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
      const res = await fetch("/api/memory-admin?action=admin_check_connection", { headers });
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
  }, [apiKey, session]);

  // This is proof, not another onboarding step. A signed-in user sees the
  // state automatically and can refresh only when they want a new reading.
  useEffect(() => {
    if (sessionLoading || (!session && !apiKey)) return;
    void checkConnection();
  }, [apiKey, checkConnection, session, sessionLoading]);

  const checkLine = useMemo(() => {
    if (!check) return null;
    if (!check.connected) {
      return "Not connected yet. Paste the address into your AI, then start a session.";
    }
    if (check.paired && !check.last_session && check.fact_count === 0 && check.context_count === 0) {
      return "Paired and ready. Your first AI session will start using Memory.";
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
            One address. Any AI.
          </div>
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            <Plug className="h-8 w-8 text-primary" />
            Connect your AI
          </h1>
          <p className="mt-3 max-w-xl text-sm text-body">
            Paste one address, sign in once. From then on ChatGPT, Claude, or any AI that takes
            connectors starts every session already knowing you.
          </p>
        </FadeIn>

        {/* The public door */}
        <FadeIn delay={0.05}>
          <section className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
              <Plug className="h-3.5 w-3.5" />
              The only address you need
            </div>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-4">
              <code className="block whitespace-pre-wrap font-mono text-sm text-heading sm:text-base">
                {MCP_URL}
              </code>
            </div>

            <Button
              onClick={handleAddressCopy}
              className="mt-4 w-full bg-primary text-black font-semibold transition-opacity hover:opacity-90 sm:w-auto"
              size="lg"
            >
              {addressCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy address
                </>
              )}
            </Button>

            <p className="mt-3 text-[11px] text-muted-foreground">
              Nothing secret in this address. You prove it is you by signing in.
            </p>

            <ol className="mt-6 space-y-4">
              {DOOR_STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-heading">{step.title}</p>
                    <p className="mt-1 text-xs leading-5 text-body">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>

        {/* Terminal AIs: secondary, collapsed */}
        <FadeIn delay={0.1}>
          <section className="mt-6 rounded-2xl border border-border/40 bg-card/30">
            <button
              type="button"
              onClick={() => setShowTerminal((v) => !v)}
              aria-expanded={showTerminal}
              className="flex w-full items-center justify-between gap-3 p-6 text-left"
            >
              <div>
                <h2 className="flex items-center gap-2 text-base font-semibold text-heading">
                  <Terminal className="h-4 w-4 text-primary" />
                  Using a terminal AI?
                </h2>
                <p className="mt-1 text-xs text-body">
                  Claude Code, Cursor, and Windsurf connect with one pasted command instead.
                </p>
              </div>
              {showTerminal ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-body" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-body" />
              )}
            </button>

            {showTerminal && (
              <div className="space-y-5 border-t border-border/40 p-6">
                {!apiKey && (
                  <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      These commands carry your key.{" "}
                      <Link to="/" className="underline">
                        Grab one free here
                      </Link>
                      , then come back.
                    </span>
                  </div>
                )}

                {TERMINAL_CLIENTS.map((client) => (
                  <div key={client.name}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-heading">{client.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!apiKey}
                        onClick={() => handleTerminalCopy(client.name, client.command(apiKey))}
                      >
                        {terminalCopied === client.name ? (
                          <>
                            <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="mt-2 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-3">
                      <code className="block whitespace-pre font-mono text-xs text-heading">
                        {client.command(apiKey ? maskKey(apiKey) : "YOUR_API_KEY")}
                      </code>
                    </div>
                  </div>
                ))}

                <div className="rounded-md border border-border/30 bg-card/30 p-4">
                  <p className="text-xs font-semibold text-heading">
                    Claude Code tip: make memory automatic
                  </p>
                  <p className="mt-1 text-xs leading-5 text-body">
                    Add this line to your CLAUDE.md (global:{" "}
                    <code className="rounded bg-background/80 px-1 py-0.5 font-mono text-[11px]">~/.claude/CLAUDE.md</code>
                    , or per project) so memory loads before anything else happens.
                  </p>
                  <div className="mt-3 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-3">
                    <code className="block whitespace-pre-wrap font-mono text-xs text-heading">
                      {CLAUDE_MD_SNIPPET}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={handleClaudeMdCopy}
                  >
                    {claudeMdCopied ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy line
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </section>
        </FadeIn>

        {/* Check connection */}
        <FadeIn delay={0.15}>
          <section className="mt-6 rounded-2xl border border-border/40 bg-card/30 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-heading">Connection status</h2>
                <p className="mt-1 text-xs text-body">
                  Checked automatically when this page opens.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => void checkConnection()}
                disabled={checking}
                className="shrink-0"
              >
                {checking ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Checking
                  </>
                ) : (
                  "Refresh"
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

        {/* Compatibility link: same door, key carried in the URL */}
        <FadeIn delay={0.2}>
          <section className="mt-6 rounded-2xl border border-border/40 bg-card/30 p-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
              <Terminal className="h-3.5 w-3.5" />
              Compatibility link
            </div>
            <h2 className="mt-2 text-base font-semibold text-heading">
              For apps with no sign-in, and for headless workers
            </h2>
            <p className="mt-2 text-sm text-body">
              Same door, with the key carried in the address. Use it when an app cannot show a
              sign-in, or for cloud and CI agents that must reconnect with nobody at the keyboard.
            </p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-border/40 bg-background/80 p-4">
              <code className="block whitespace-pre-wrap font-mono text-xs text-heading sm:text-sm">
                {workerUrlDisplay}
              </code>
            </div>

            <Button
              onClick={handleWorkerCopy}
              disabled={!apiKey}
              variant="outline"
              className="mt-4 w-full sm:w-auto"
            >
              {workerCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy compatibility link
                </>
              )}
            </Button>

            <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <span className="font-semibold">Heads up:</span> this link contains your key, so treat
                it like a password. For unattended workers, mint a dedicated worker key at{" "}
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
