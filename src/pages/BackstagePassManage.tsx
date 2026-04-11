import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Database,
  Cloud,
  CreditCard,
  Shield,
  MessageSquare,
  Cpu,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  ChevronLeft,
  Key,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useMetaTags } from "@/hooks/useMetaTags";
import { SITE_STATS } from "@/config/site-stats";

// ---- Types ----

type PlatformStatus = "connected" | "disconnected";

interface MockCredential {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  status: PlatformStatus;
  lastUsed?: string;
  maskedKey?: string;
  fullKey?: string;
  setupUrl?: string;
}

// ---- Mock data ----
// Replace with real Supabase queries once auth is wired up.

const MOCK_CREDENTIALS: MockCredential[] = [
  {
    id: "github",
    name: "GitHub",
    category: "Developer Tools",
    icon: Github,
    status: "connected",
    lastUsed: "2h ago",
    maskedKey: "ghp_****************************3f4a",
    fullKey: "ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ3f4a",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Developer Tools",
    icon: Database,
    status: "connected",
    lastUsed: "5m ago",
    maskedKey: "sbp_****************************9c21",
    fullKey: "sbp_x1y2z3a4b5c6d7e8f9g0h1i2j3k9c21",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Developer Tools",
    icon: Cloud,
    status: "connected",
    lastUsed: "1d ago",
    maskedKey: "vrl_****************************7e88",
    fullKey: "vrl_0000000000000000000000000000007e88",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI/ML",
    icon: Cpu,
    status: "connected",
    lastUsed: "3h ago",
    maskedKey: "sk-proj-****************************a1b2",
    fullKey: "sk-proj-ABCDEFGHIJKLMNOPQRSTUVWXYZa1b2",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Business",
    icon: CreditCard,
    status: "disconnected",
    setupUrl: "https://dashboard.stripe.com/apikeys",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "Developer Tools",
    icon: Shield,
    status: "disconnected",
    setupUrl: "https://dash.cloudflare.com/profile/api-tokens",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    icon: MessageSquare,
    status: "disconnected",
    setupUrl: "https://api.slack.com/apps",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Developer Tools": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "AI/ML": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Business: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Communication: "text-green-400 bg-green-400/10 border-green-400/20",
};

const REVEAL_TIMEOUT_SECONDS = 30;

// ---- Subcomponents ----

function CopyButton({ text, size = "sm" }: { text: string; size?: "sm" | "xs" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 rounded border border-border/40 bg-card/40 font-mono transition-colors hover:bg-card/80 ${
        size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
      } ${copied ? "border-teal-500/40 text-teal-400" : "text-muted-foreground"}`}
    >
      {copied ? (
        <>
          <Check className="h-2.5 w-2.5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-2.5 w-2.5" />
          Copy
        </>
      )}
    </button>
  );
}

function RevealPanel({
  credential,
  onClose,
}: {
  credential: MockCredential;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REVEAL_TIMEOUT_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          setVisible(false);
          onClose();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onClose]);

  const displayKey = visible ? credential.fullKey! : credential.maskedKey!;
  const progressPct = (secondsLeft / REVEAL_TIMEOUT_SECONDS) * 100;

  return (
    <div className="mt-3 rounded-lg border border-teal-500/20 bg-teal-500/[0.04] p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-teal-400 mb-2">Credential</p>
          <div className="flex items-center gap-2 flex-wrap">
            <code className="font-mono text-xs text-body bg-card/60 rounded px-2 py-1 border border-border/40 break-all">
              {displayKey}
            </code>
            <button
              onClick={() => setVisible((v) => !v)}
              className="shrink-0 rounded border border-border/40 bg-card/40 p-1 text-muted-foreground transition-colors hover:bg-card/80 hover:text-heading"
              title={visible ? "Hide key" : "Reveal key"}
            >
              {visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </button>
            <CopyButton text={credential.fullKey!} size="xs" />
          </div>
        </div>
      </div>

      {/* Timeout bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-muted-foreground">
            Auto-hides in {secondsLeft}s
          </p>
        </div>
        <div className="h-0.5 w-full rounded-full bg-border/30">
          <div
            className="h-0.5 rounded-full bg-teal-500 transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground">
        Your key is shown for {REVEAL_TIMEOUT_SECONDS} seconds. It will auto-hide.
      </p>
    </div>
  );
}

function CredentialCard({ credential }: { credential: MockCredential }) {
  const [revealing, setRevealing] = useState(false);
  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false);
  const Icon = credential.icon;
  const catColor =
    CATEGORY_COLORS[credential.category] ?? "text-primary bg-primary/10 border-primary/20";
  const isConnected = credential.status === "connected";

  return (
    <div
      className={`flex flex-col rounded-xl border p-4 transition-colors ${
        isConnected
          ? "border-border/40 bg-card/20 hover:border-teal-500/20 hover:bg-card/30"
          : "border-border/20 bg-card/10 opacity-70"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
              isConnected ? "border-border/40 bg-card/40" : "border-border/20 bg-card/20"
            }`}
          >
            <Icon className={`h-4 w-4 ${isConnected ? "text-body" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className={`text-sm font-semibold ${isConnected ? "text-heading" : "text-body"}`}>
              {credential.name}
            </p>
            {isConnected && credential.lastUsed && (
              <p className="text-[10px] text-muted-foreground">Last used {credential.lastUsed}</p>
            )}
          </div>
        </div>

        {/* Status dot */}
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          <div
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]" : "bg-border/60"
            }`}
          />
          <span className={`text-[10px] ${isConnected ? "text-green-400" : "text-muted-foreground"}`}>
            {isConnected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>

      {/* Category badge */}
      <span className={`mt-3 self-start rounded border px-1.5 py-0.5 font-mono text-[10px] ${catColor}`}>
        {credential.category}
      </span>

      {/* Actions */}
      {isConnected ? (
        <div className="mt-3 space-y-2">
          {/* Action buttons row */}
          {!showConfirmDisconnect && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRevealing((r) => !r)}
                className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-medium transition-colors ${
                  revealing
                    ? "border-teal-500/40 bg-teal-500/10 text-teal-400"
                    : "border-border/40 bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-heading"
                }`}
                title="Reveal key"
              >
                <Eye className="h-3 w-3" />
                {revealing ? "Hide" : "Reveal Key"}
              </button>

              <button
                className="inline-flex items-center gap-1.5 rounded border border-border/40 bg-card/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-card/80 hover:text-heading"
                title="Rotate credential"
              >
                <RefreshCw className="h-3 w-3" />
                Rotate
              </button>

              <button
                onClick={() => setShowConfirmDisconnect(true)}
                className="inline-flex items-center gap-1.5 rounded border border-border/40 bg-card/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                title="Disconnect"
              >
                <Trash2 className="h-3 w-3" />
                Disconnect
              </button>
            </div>
          )}

          {/* Disconnect confirmation */}
          {showConfirmDisconnect && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/[0.04] p-3">
              <p className="text-xs text-body mb-2">
                Remove your {credential.name} credential? This cannot be undone.
              </p>
              <div className="flex items-center gap-2">
                <button className="rounded border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20">
                  Yes, disconnect
                </button>
                <button
                  onClick={() => setShowConfirmDisconnect(false)}
                  className="rounded border border-border/40 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-card/80"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Inline reveal panel */}
          {revealing && !showConfirmDisconnect && (
            <RevealPanel credential={credential} onClose={() => setRevealing(false)} />
          )}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {credential.setupUrl && (
            <a
              href={credential.setupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-body"
            >
              Get your key
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
          <div>
            <button className="inline-flex items-center gap-1.5 rounded border border-border/40 bg-card/30 px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-teal-500/40 hover:bg-teal-500/10 hover:text-teal-400">
              <Key className="h-3 w-3" />
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Main page ----

export default function BackstagePassManagePage() {
  useMetaTags({
    title: "Manage Connections - BackstagePass | UnClick",
    description: "View and manage your platform credentials stored in BackstagePass.",
    ogTitle: "Manage Connections - BackstagePass | UnClick",
    ogDescription: "View and manage your encrypted platform credentials.",
    ogUrl: "https://unclick.world/backstagepass/manage",
  });

  const connectedCount = MOCK_CREDENTIALS.filter((c) => c.status === "connected").length;
  const totalShown = MOCK_CREDENTIALS.length;
  const progressPct = (connectedCount / SITE_STATS.BACKSTAGEPASS_PLATFORMS) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 pb-32 pt-28">

        {/* Back link */}
        <FadeIn>
          <Link
            to="/backstagepass"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-body mb-8"
          >
            <ChevronLeft className="h-3 w-3" />
            BackstagePass
          </Link>
        </FadeIn>

        {/* ---- Header ---- */}
        <FadeIn delay={0.03}>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
                <Key className="h-2.5 w-2.5" />
                BackstagePass
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-heading sm:text-4xl mt-3">
              Your Connections
            </h1>
            <p className="mt-2 text-body">
              Manage your platform credentials. Everything is encrypted at rest.
            </p>

            {/* Progress bar */}
            <div className="mt-6 max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  {connectedCount} of {SITE_STATS.BACKSTAGEPASS_PLATFORMS} platforms connected
                </span>
                <span className="font-mono text-xs text-teal-400">
                  {connectedCount}/{SITE_STATS.BACKSTAGEPASS_PLATFORMS}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-card/60 border border-border/30">
                <div
                  className="h-1.5 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progressPct}%`,
                    background: "#61c1c4",
                    boxShadow: "0 0 8px rgba(97,193,196,0.4)",
                  }}
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ---- Platform grid ---- */}
        <FadeIn delay={0.07}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-heading">
              Showing {totalShown} platforms
            </h2>
            <span className="text-xs text-muted-foreground">
              {connectedCount} connected
            </span>
          </div>
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_CREDENTIALS.map((cred, i) => (
            <FadeIn key={cred.id} delay={0.05 + i * 0.04}>
              <CredentialCard credential={cred} />
            </FadeIn>
          ))}
        </div>

        {/* More platforms note */}
        <FadeIn delay={0.35}>
          <div className="mt-8 rounded-xl border border-border/20 bg-card/10 px-5 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {SITE_STATS.BACKSTAGEPASS_PLATFORMS - totalShown} more platforms available.{" "}
              <Link to="/backstagepass" className="text-primary underline underline-offset-2 transition-opacity hover:opacity-80">
                See all supported platforms
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
