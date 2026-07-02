import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import FadeIn from "./FadeIn";
import { signInWithMagicLink } from "@/lib/auth";

const MCP_ORIGIN = "https://unclick.world/api/mcp";
const STORAGE_KEY = "unclick_api_key";
const EMAIL_KEY = "unclick_user_email";

type SignupResponse = {
  api_key?: string;
  prefix?: string;
  error?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mcpUrl(key: string) {
  return `${MCP_ORIGIN}?key=${key}`;
}

function maskPrivateValue(value: string) {
  return value.replace(/uc_[A-Za-z0-9_-]{8,}/g, (key) => `${key.slice(0, 6)}...${key.slice(-4)}`);
}

async function requestCompatibilityKey(email: string): Promise<string> {
  const response = await fetch("/api/install-ticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "signup", email }),
  });
  const data = (await response.json().catch(() => ({}))) as SignupResponse;
  if (!response.ok || !data.api_key) {
    throw new Error(data.error ?? `Signup failed with HTTP ${response.status}`);
  }
  return data.api_key;
}

function CopyField({
  label,
  value,
  privateValue = false,
}: {
  label: string;
  value: string;
  privateValue?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const displayValue = privateValue ? maskPrivateValue(value) : value;

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-heading">{label}</div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-lg border border-[#86dadd]/20 bg-background/85 px-4 py-3 font-mono text-[13px] text-heading sm:text-sm">
          {displayValue}
        </code>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.96 }}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#86dadd]/20 bg-white/[0.06] px-4 text-sm font-semibold text-body transition-colors hover:border-primary/45 hover:text-heading"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>
      {privateValue ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Private value hidden on screen. Copy still uses the full Compatibility URL.
        </p>
      ) : null}
    </div>
  );
}

function Disclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#86dadd]/10 pt-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full min-h-9 items-center justify-between gap-3 text-left text-sm font-medium text-body transition-colors hover:text-heading"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

const InstallSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"magic" | "fallback" | null>(null);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem(EMAIL_KEY);
      const storedKey = localStorage.getItem(STORAGE_KEY);
      if (storedEmail) setEmail(storedEmail);
      if (storedKey) setApiKey(storedKey);
    } catch {
      /* localStorage can be unavailable in private windows. */
    }
  }, []);

  const compatibilityUrl = useMemo(
    () => (apiKey ? mcpUrl(apiKey) : `${MCP_ORIGIN}?key=YOUR_PRIVATE_KEY`),
    [apiKey],
  );

  function normalizedEmail() {
    return email.trim().toLowerCase();
  }

  function validateEmail() {
    const trimmed = normalizedEmail();
    if (!isValidEmail(trimmed)) {
      setError("Enter a valid email address.");
      return "";
    }
    return trimmed;
  }

  async function connectAndSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    const trimmed = validateEmail();
    if (!trimmed) return;

    setBusy("magic");
    try {
      localStorage.setItem(EMAIL_KEY, trimmed);
      await signInWithMagicLink(trimmed, "/admin/you");
      setMessage(`Check your email. We sent a sign-in link to ${trimmed}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the sign-in link. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function getStaticAddress() {
    setError("");
    setMessage("");
    const trimmed = validateEmail();
    if (!trimmed) return;

    setBusy("fallback");
    try {
      const newKey = await requestCompatibilityKey(trimmed);
      localStorage.setItem(EMAIL_KEY, trimmed);
      localStorage.setItem(STORAGE_KEY, newKey);
      setApiKey(newKey);
      setMessage("Static address ready. Keep it private and use it only when browser sign-in fails.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the static address. Try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section id="install" className="relative isolate mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Quick Install
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl md:text-5xl">
            Add UnClick to your AI assistant
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Sign in once in the browser. It stays connected at one address, no key to carry.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <form
            onSubmit={connectAndSignIn}
            className="mt-10 overflow-hidden rounded-2xl border border-[#86dadd]/25 bg-card/70 p-5 shadow-[0_22px_72px_-44px_rgba(97,193,196,0.75)] sm:p-6"
          >
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center rounded-full border border-primary/35 bg-primary/[0.1] px-3 py-1 text-xs font-semibold text-primary">
                Public door
              </div>

              <div>
                <label htmlFor="install-email" className="text-sm font-semibold text-heading">
                  Your email
                </label>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  We send your sign-in link here and use it to keep you connected.
                </p>
                <input
                  id="install-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="mt-3 h-12 w-full rounded-lg border border-[#86dadd]/20 bg-background/85 px-4 text-base text-heading outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/40"
                />
              </div>

              <CopyField label="Connection address" value={MCP_ORIGIN} />

              <motion.button
                type="submit"
                disabled={busy !== null}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-16px_hsl(182_46%_57%/0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-18px_hsl(182_46%_57%/0.9)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {busy === "magic" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Connect and sign in
              </motion.button>

              <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/[0.08] px-4 py-3 text-sm leading-6 text-body">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>No personal key in the URL. Your AI assistant opens web sign-in and keeps this same address.</span>
              </div>

              {message ? (
                <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/[0.08] px-4 py-3 text-sm leading-6 text-body">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{message}</span>
                </div>
              ) : null}

              {error ? (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-200" role="alert">
                  {error}
                </p>
              ) : null}

              <Disclosure title="How do I connect?">
                <div className="space-y-4">
                  <ol className="space-y-3 text-sm leading-6 text-body">
                    <li>
                      <span className="mr-2 font-mono text-primary">1.</span>
                      Open your AI assistant's <strong className="font-semibold text-heading">settings</strong>.
                    </li>
                    <li>
                      <span className="mr-2 font-mono text-primary">2.</span>
                      Find <strong className="font-semibold text-heading">Connectors</strong>,{" "}
                      <strong className="font-semibold text-heading">Integrations</strong>, or{" "}
                      <strong className="font-semibold text-heading">MCP servers</strong>.
                    </li>
                    <li>
                      <span className="mr-2 font-mono text-primary">3.</span>
                      Choose <strong className="font-semibold text-heading">Add</strong>, then paste the address above.
                    </li>
                    <li>
                      <span className="mr-2 font-mono text-primary">4.</span>
                      Sign in when it asks.
                    </li>
                  </ol>
                  <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/[0.08] px-4 py-3 text-sm leading-6 text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong className="font-semibold text-heading">Check it worked:</strong> open a new chat and ask your AI what it can do with UnClick.
                    </span>
                  </div>
                </div>
              </Disclosure>

              <Disclosure title="Can't sign in? Use a static address">
                <div className="space-y-4">
                  <p className="text-sm leading-6 text-body">
                    Only use this if your assistant cannot open browser sign-in. This Compatibility URL carries a personal key, so treat it like a password.
                  </p>
                  {apiKey ? (
                    <CopyField label="Compatibility URL" value={compatibilityUrl} privateValue />
                  ) : (
                    <>
                      <p className="text-xs leading-5 text-muted-foreground">
                        We use the email above to create the private fallback.
                      </p>
                      <motion.button
                        type="button"
                        onClick={getStaticAddress}
                        disabled={busy !== null}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#86dadd]/25 bg-white/[0.06] px-4 text-sm font-semibold text-heading transition-colors hover:border-primary/45 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busy === "fallback" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        Get my static address
                      </motion.button>
                      <span className="sr-only">{compatibilityUrl}</span>
                    </>
                  )}
                </div>
              </Disclosure>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

export default InstallSection;
