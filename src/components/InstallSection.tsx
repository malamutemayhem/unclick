import { useState } from "react";
import FadeIn from "./FadeIn";
import ApiKeySignup from "./ApiKeySignup";
import { motion } from "framer-motion";

// ─── Platform-first install UX ────────────────────────────────────────────
//
// Every major MCP client in April 2026 accepts a remote MCP URL natively.
// We show the 5 shortest paths (Claude, ChatGPT, Cursor, VS Code, Other) and
// let the user pick. The default story is the public UnClick door: one stable
// URL, no personal key in the address. Compatibility mode remains available for
// clients that only accept a static URL and cannot finish MCP pairing yet.

type Platform = "Claude" | "ChatGPT" | "Cursor" | "VS Code" | "Other";
type ClaudeSurface = "Web" | "Desktop" | "Code";
type SetupMode = "Public" | "Compatibility";

const MCP_ORIGIN = "https://unclick.world/api/mcp";
const MCP_PACKAGE_URL = "https://github.com/malamutemayhem/unclick/releases/latest/download/unclick-mcp-server.tgz";
const PLACEHOLDER_KEY = "YOUR_API_KEY";

const platforms: Platform[] = ["Claude", "ChatGPT", "Cursor", "VS Code", "Other"];
const claudeSurfaces: ClaudeSurface[] = ["Web", "Desktop", "Code"];

function mcpUrl(key: string) {
  return `${MCP_ORIGIN}?key=${key}`;
}

function claudeCodeCommand(connectionUrl: string) {
  return `claude mcp add --transport http unclick ${connectionUrl}`;
}

function geminiCommand(connectionUrl: string) {
  return `gemini mcp add unclick --transport http ${connectionUrl}`;
}

function stdioJson(key: string) {
  return `{
  "mcpServers": {
    "unclick": {
      "command": "npx",
      "args": ["-y", "${MCP_PACKAGE_URL}"],
      "env": { "UNCLICK_API_KEY": "${key}" }
    }
  }
}`;
}

function cursorDeeplink(connectionUrl: string) {
  const config = btoa(JSON.stringify({ url: connectionUrl }));
  return `cursor://anysphere.cursor-deeplink/mcp/install?name=unclick&config=${config}`;
}

function vscodeDeeplink(connectionUrl: string) {
  const config = JSON.stringify({
    name: "unclick",
    type: "http",
    url: connectionUrl,
  });
  return `vscode:mcp/install?${encodeURIComponent(config)}`;
}

function connectionUrlFor(setupMode: SetupMode, apiKey: string) {
  if (setupMode === "Public") return MCP_ORIGIN;
  return mcpUrl(apiKey || PLACEHOLDER_KEY);
}

function canUseMode(setupMode: SetupMode, apiKey: string) {
  return setupMode === "Public" || Boolean(apiKey);
}

function maskPrivateValue(value: string) {
  return value.replace(/uc_[A-Za-z0-9_-]{8,}/g, (key) => `${key.slice(0, 6)}...${key.slice(-4)}`);
}

function hasPrivateValue(value: string) {
  return /uc_[A-Za-z0-9_-]{8,}/.test(value);
}

// Tiny copyable row: a read-only input + Copy button. Same shape everywhere
// so the UI pattern is predictable and the user never has to "figure out"
// where to click.
function CopyField({
  label,
  value,
  hasKey,
  mono = true,
}: {
  label: string;
  value: string;
  hasKey: boolean;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!hasKey) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const privateValue = hasPrivateValue(value);
  const displayValue = privateValue ? maskPrivateValue(value) : value;
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex items-stretch gap-2">
        <code
          className={`flex-1 min-w-0 truncate rounded-md border bg-card/60 px-3 py-2 text-xs ${
            mono ? "font-mono" : ""
          } ${hasKey ? "border-border/50 text-heading" : "border-border/30 text-body/40 select-none blur-[2px]"}`}
        >
          {displayValue}
        </code>
        <motion.button
          onClick={copy}
          disabled={!hasKey}
          whileTap={hasKey ? { scale: 0.95 } : {}}
          className={`shrink-0 rounded-md border border-border/60 bg-card/80 px-3 py-2 font-mono text-[11px] transition-all ${
            hasKey
              ? "text-muted-foreground hover:border-primary/30 hover:text-heading cursor-pointer"
              : "text-muted-foreground/30 cursor-not-allowed"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
      {privateValue && hasKey && (
        <p className="mt-1 text-[11px] text-muted-foreground">
          Private value hidden on screen. Copy still uses the full value.
        </p>
      )}
    </div>
  );
}

// Block with copyable multi-line content (used for the stdio JSON fallback).
function CodeBlock({ code, hasKey }: { code: string; hasKey: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!hasKey) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const privateValue = hasPrivateValue(code);
  const displayCode = privateValue ? maskPrivateValue(code) : code;
  return (
    <div className="relative rounded-md border border-border/40 bg-card/40 p-4">
      <pre
        className={`overflow-x-auto font-mono text-xs leading-relaxed ${
          hasKey ? "text-body" : "text-body/40 select-none blur-[2px]"
        }`}
      >
        <code>{displayCode}</code>
      </pre>
      <motion.button
        onClick={copy}
        disabled={!hasKey}
        whileTap={hasKey ? { scale: 0.95 } : {}}
        className={`absolute right-3 top-3 rounded-md border border-border/60 bg-card/80 px-3 py-1.5 font-mono text-[11px] backdrop-blur-sm transition-all ${
          hasKey
            ? "text-muted-foreground hover:border-primary/30 hover:text-heading cursor-pointer"
            : "text-muted-foreground/30 cursor-not-allowed"
        }`}
      >
        {copied ? "Copied!" : "Copy"}
      </motion.button>
      {privateValue && hasKey && (
        <p className="mt-3 text-[11px] text-muted-foreground">
          Private value hidden on screen. Copy still uses the full value.
        </p>
      )}
    </div>
  );
}

// Deeplink install button. Renders as <a> so the browser hands the URL to
// the platform's registered protocol handler.
function DeeplinkButton({
  href,
  label,
  hasKey,
}: {
  href: string;
  label: string;
  hasKey: boolean;
}) {
  const content = (
    <>
      <span>{label}</span>
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 5l7 7-7 7M5 12h15"
        />
      </svg>
    </>
  );
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all";
  if (!hasKey) {
    return (
      <button
        disabled
        className={`${cls} border border-border/40 bg-card/40 text-muted-foreground/40 cursor-not-allowed`}
      >
        {content}
      </button>
    );
  }
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      className={`${cls} bg-primary text-black hover:opacity-90`}
    >
      {content}
    </motion.a>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-1.5 text-sm text-body">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="shrink-0 pt-0.5 font-mono text-xs text-primary">
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function ConnectionUrlNotice({ setupMode }: { setupMode: SetupMode }) {
  if (setupMode === "Public") {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary/90">
        Public door: no personal key in the URL. Your AI app should open web sign-in and keep this same address.
      </div>
    );
  }
  return (
    <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/90">
      Compatibility URL: contains a persistent UnClick connection key. Keep it private and rotate it if it leaks.
    </div>
  );
}

function SetupModeSwitch({
  setupMode,
  onChange,
}: {
  setupMode: SetupMode;
  onChange: (mode: SetupMode) => void;
}) {
  const options: Array<{
    mode: SetupMode;
    title: string;
    body: string;
  }> = [
    {
      mode: "Public",
      title: "Public door",
      body: "One stable address. No personal key in the URL.",
    },
    {
      mode: "Compatibility",
      title: "Compatibility URL",
      body: "Fallback for clients that cannot complete web sign-in.",
    },
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = setupMode === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => onChange(option.mode)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              active
                ? "border-primary/45 bg-primary/10"
                : "border-border/50 bg-card/35 hover:border-border/80"
            }`}
          >
            <span className={active ? "text-sm font-semibold text-heading" : "text-sm font-semibold text-body"}>
              {option.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              {option.body}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PublicDoorSummary() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(MCP_ORIGIN);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
      <p className="text-sm font-medium text-heading">Start with the public UnClick door</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        Add this same address first. If your AI app supports web sign-in, it should connect without any custom URL.
      </p>
      <div className="mt-3 flex items-stretch gap-2">
        <code className="min-w-0 flex-1 truncate rounded-md border border-border/50 bg-card/60 px-3 py-2 font-mono text-xs text-heading">
          {MCP_ORIGIN}
        </code>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 rounded-md border border-primary/30 bg-primary px-3 py-2 font-mono text-[11px] font-semibold text-black transition-opacity hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Per-platform panels ──────────────────────────────────────────────────

function ClaudePanel({
  apiKey,
  surface,
  setupMode,
}: {
  apiKey: string;
  surface: ClaudeSurface;
  setupMode: SetupMode;
}) {
  const hasConnection = canUseMode(setupMode, apiKey);
  const connectionUrl = connectionUrlFor(setupMode, apiKey);

  if (surface === "Code") {
    return (
      <div className="space-y-4">
        <Steps
          items={[
            "Open your terminal.",
            "Paste the command below and press Enter.",
            'Start a new session and ask: "What tools do you have from unclick?"',
          ]}
        />
        <ConnectionUrlNotice setupMode={setupMode} />
        <CopyField label="Terminal command" value={claudeCodeCommand(connectionUrl)} hasKey={hasConnection} />
      </div>
    );
  }

  const where =
    surface === "Web"
      ? "Open claude.ai → Settings → Connectors → Add custom connector."
      : 'Open Claude Desktop → "+" in a chat → Connectors → Manage Connectors → Add custom.';

  return (
    <div className="space-y-4">
      <Steps
        items={[
          where,
          'Paste the Name and URL below into the dialog, then click "Add".',
          'In a new chat, ask: "What tools do you have from unclick?"',
        ]}
      />
      <div className="space-y-3">
        <CopyField label="Name" value="UnClick" hasKey={hasConnection} mono={false} />
        <ConnectionUrlNotice setupMode={setupMode} />
        <CopyField
          label={setupMode === "Public" ? "Public MCP door" : "Compatibility MCP URL"}
          value={connectionUrl}
          hasKey={hasConnection}
        />
      </div>
    </div>
  );
}

function ChatGPTPanel({ apiKey, setupMode }: { apiKey: string; setupMode: SetupMode }) {
  const hasConnection = canUseMode(setupMode, apiKey);
  const connectionUrl = connectionUrlFor(setupMode, apiKey);
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-300/90">
        Requires a paid ChatGPT plan (Plus / Pro / Business / Enterprise /
        Edu) with Developer Mode enabled.
      </div>
      <Steps
        items={[
          "In ChatGPT: Settings → Connectors → Advanced → toggle Developer Mode on.",
          'Click "Create" and paste the Name and URL below.',
          'Open a new chat and ask: "What tools do you have from unclick?"',
        ]}
      />
      <div className="space-y-3">
        <CopyField label="Name" value="UnClick" hasKey={hasConnection} mono={false} />
        <ConnectionUrlNotice setupMode={setupMode} />
        <CopyField
          label={setupMode === "Public" ? "Public MCP door" : "Compatibility MCP URL"}
          value={connectionUrl}
          hasKey={hasConnection}
        />
      </div>
    </div>
  );
}

function CursorPanel({ apiKey, setupMode }: { apiKey: string; setupMode: SetupMode }) {
  const hasConnection = canUseMode(setupMode, apiKey);
  const connectionUrl = connectionUrlFor(setupMode, apiKey);
  return (
    <div className="space-y-4">
      <p className="text-sm text-body">
        One click. Cursor opens with the install pre-filled.
      </p>
      <ConnectionUrlNotice setupMode={setupMode} />
      <DeeplinkButton href={cursorDeeplink(connectionUrl)} label="Add to Cursor" hasKey={hasConnection} />
      <details className="group">
        <summary className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-body">
          Prefer a manual install?
        </summary>
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            Edit <code className="font-mono">~/.cursor/mcp.json</code> and paste:
          </p>
          <ConnectionUrlNotice setupMode={setupMode} />
          <CodeBlock
            code={`{
  "mcpServers": {
    "unclick": {
      "url": "${connectionUrl}"
    }
  }
}`}
            hasKey={hasConnection}
          />
        </div>
      </details>
    </div>
  );
}

function VSCodePanel({ apiKey, setupMode }: { apiKey: string; setupMode: SetupMode }) {
  const hasConnection = canUseMode(setupMode, apiKey);
  const connectionUrl = connectionUrlFor(setupMode, apiKey);
  return (
    <div className="space-y-4">
      <p className="text-sm text-body">
        One click. VS Code (with GitHub Copilot) opens with the install pre-filled.
      </p>
      <ConnectionUrlNotice setupMode={setupMode} />
      <DeeplinkButton href={vscodeDeeplink(connectionUrl)} label="Add to VS Code" hasKey={hasConnection} />
      <details className="group">
        <summary className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-body">
          Prefer a manual install?
        </summary>
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            Command Palette → "MCP: Add Server" → HTTP, then paste:
          </p>
          <ConnectionUrlNotice setupMode={setupMode} />
          <CopyField
            label={setupMode === "Public" ? "Public MCP door" : "Compatibility MCP URL"}
            value={connectionUrl}
            hasKey={hasConnection}
          />
        </div>
      </details>
    </div>
  );
}

function OtherPanel({ apiKey, setupMode }: { apiKey: string; setupMode: SetupMode }) {
  const hasConnection = canUseMode(setupMode, apiKey);
  const connectionUrl = connectionUrlFor(setupMode, apiKey);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-heading">Gemini CLI</p>
        <ConnectionUrlNotice setupMode={setupMode} />
        <CopyField label="Terminal command" value={geminiCommand(connectionUrl)} hasKey={hasConnection} />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-heading">
          Windsurf, Continue, Zed, Cline, Roo
        </p>
        <p className="text-xs text-muted-foreground">
          In your client's MCP settings, add a new server with this URL:
        </p>
        <ConnectionUrlNotice setupMode={setupMode} />
        <CopyField
          label={setupMode === "Public" ? "Public MCP door" : "Compatibility MCP URL"}
          value={connectionUrl}
          hasKey={hasConnection}
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-heading">Local / self-hosted (stdio)</p>
        {setupMode === "Compatibility" ? (
          <>
            <p className="text-xs text-muted-foreground">
              Runs UnClick as a local process via npx. The key is stored in your local MCP config instead of inside a URL.
            </p>
            <CodeBlock code={stdioJson(apiKey || PLACEHOLDER_KEY)} hasKey={hasConnection} />
          </>
        ) : (
          <div className="rounded-md border border-border/50 bg-card/35 px-3 py-2 text-xs leading-5 text-muted-foreground">
            Local stdio installs still need a private key in an environment variable. Switch to Compatibility URL to generate that config.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────

const InstallSection = () => {
  const [platform, setPlatform] = useState<Platform>("Claude");
  const [claudeSurface, setClaudeSurface] = useState<ClaudeSurface>("Web");
  const [setupMode, setSetupMode] = useState<SetupMode>("Public");
  const [apiKey, setApiKey] = useState<string>("");

  const hasKey = Boolean(apiKey);
  const hasConnection = canUseMode(setupMode, apiKey);

  return (
    <section id="install" className="relative mx-auto max-w-4xl scroll-mt-20 px-6 py-24">
      <FadeIn>
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
          Quick Install
        </span>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Add UnClick without carrying a master key.
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-3 max-w-xl text-body">
          Start with one public MCP address. Use a compatibility URL only when your AI app still needs one.
        </p>
      </FadeIn>

      {/* Setup mode */}
      <FadeIn delay={0.15}>
        <div className="mt-8 space-y-4">
          <SetupModeSwitch setupMode={setupMode} onChange={setSetupMode} />
          {setupMode === "Public" ? (
            <PublicDoorSummary />
          ) : (
            <ApiKeySignup onKeyReady={setApiKey} />
          )}
        </div>
      </FadeIn>

      {/* Platform picker + panel */}
      <FadeIn delay={0.2}>
        <div
          className={`mt-6 overflow-hidden rounded-xl border transition-all duration-300 ${
            hasConnection ? "border-border/60 bg-card/40" : "border-border/30 bg-card/20"
          }`}
        >
          {/* Platform tabs */}
          <div className="flex items-center overflow-x-auto border-b border-border/60 bg-card/60 px-1">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`whitespace-nowrap px-4 py-3 text-xs font-medium transition-colors ${
                  platform === p
                    ? "-mb-px border-b-2 border-primary text-heading"
                    : "text-muted-foreground hover:text-body"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Claude sub-pills */}
          {platform === "Claude" && (
            <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/40 px-4 py-2.5">
              {claudeSurfaces.map((s) => (
                <button
                  key={s}
                  onClick={() => setClaudeSurface(s)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                    claudeSurface === s
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-body"
                  }`}
                >
                  {s === "Web" ? "Claude.ai (web)" : s === "Desktop" ? "Claude Desktop" : "Claude Code"}
                </button>
              ))}
            </div>
          )}

          {/* Panel */}
          <div className="p-5">
            {platform === "Claude" && (
              <ClaudePanel apiKey={apiKey} surface={claudeSurface} setupMode={setupMode} />
            )}
            {platform === "ChatGPT" && <ChatGPTPanel apiKey={apiKey} setupMode={setupMode} />}
            {platform === "Cursor" && <CursorPanel apiKey={apiKey} setupMode={setupMode} />}
            {platform === "VS Code" && <VSCodePanel apiKey={apiKey} setupMode={setupMode} />}
            {platform === "Other" && <OtherPanel apiKey={apiKey} setupMode={setupMode} />}
          </div>

          {!hasConnection && (
            <div className="border-t border-border/30 bg-card/40 px-5 py-3">
              <p className="text-center text-xs text-muted-foreground">
                Enter your email above to unlock the compatibility URL.
              </p>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
};

export default InstallSection;
