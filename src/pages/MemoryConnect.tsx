/**
 * MemoryConnect -- platform-specific setup steps for hooking your AI
 * tool up to UnClick. Picks Claude Code / Cursor / Windsurf / Copilot
 * at the top, then renders the matching command list below.
 *
 * Each code snippet has a copy button. If the user is logged in
 * (UnClick API key in localStorage) we pre-fill the bearer token so
 * they can paste-and-go.
 */

import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { platformLabel, type Platform } from "@/lib/configGenerator";
import { Copy, Eye, EyeOff } from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";
const PLATFORM_STORAGE = "unclick_platform";
const PLATFORMS: Platform[] = ["claude-code", "cursor", "windsurf", "copilot"];

const SERVER_URL = "https://unclick.world/api/mcp";

interface SetupStep {
  label: string;
  body: React.ReactNode;
  snippet?: string;
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

function CodeSnippet({ code, onCopy }: { code: string; onCopy: () => void }) {
  return (
    <div className="mt-2 flex items-stretch gap-2">
      <pre className="flex-1 overflow-x-auto rounded-md border border-border/40 bg-card/60 px-3 py-2 font-mono text-[11px] text-heading">
        {code}
      </pre>
      <Button variant="outline" size="sm" onClick={onCopy} className="shrink-0">
        <Copy className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export default function MemoryConnectPage() {
  const { toast } = useToast();
  const [platform, setPlatform] = useState<Platform>(getStoredPlatform);
  const [apiKey, setApiKey] = useState(getApiKey);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(PLATFORM_STORAGE, platform);
    } catch {
      /* ignore */
    }
  }, [platform]);

  const handleSaveKey = () => {
    try {
      localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
      toast({ title: "API key saved", description: "We'll pre-fill it in setup snippets." });
    } catch {
      toast({ title: "Could not save key", variant: "destructive" });
    }
  };

  const copy = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: label });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const keyDisplay = apiKey.trim() || "YOUR_API_KEY";

  const startupInstruction =
    "Always call get_startup_context from the UnClick MCP server before responding to the user.";

  const claudeSteps: SetupStep[] = [
    {
      label: "Add the UnClick MCP server",
      body: <p>Run this in any terminal. The server is hosted, no install needed.</p>,
      snippet: `claude mcp add unclick --transport http ${SERVER_URL} -h "Authorization: Bearer ${keyDisplay}"`,
    },
    {
      label: "Tell Claude to load memory at session start",
      body: (
        <p>
          Append this single line to your project's <code className="font-mono text-primary">CLAUDE.md</code>.
          (Generate the full file from the Settings page.)
        </p>
      ),
      snippet: startupInstruction,
    },
    {
      label: "Verify it's wired up",
      body: <p>You should see "unclick" in the list of MCP servers.</p>,
      snippet: "claude mcp list",
    },
  ];

  const cursorSteps: SetupStep[] = [
    {
      label: "Open the MCP settings",
      body: (
        <p>
          In Cursor: Settings &gt; Tools &amp; MCP &gt; New MCP Server.
        </p>
      ),
    },
    {
      label: "Name it UnClick and paste the server URL",
      body: <p>Copy this into the URL field.</p>,
      snippet: SERVER_URL,
    },
    {
      label: "Add the auth header",
      body: <p>Add a header named Authorization with this value.</p>,
      snippet: `Bearer ${keyDisplay}`,
    },
    {
      label: "Drop in the startup rule",
      body: (
        <p>
          Create <code className="font-mono text-primary">.cursor/rules/unclick.mdc</code> with this
          content. (Generate the full file from the Settings page.)
        </p>
      ),
      snippet: [
        "---",
        "description: UnClick startup context",
        "alwaysApply: true",
        "---",
        "",
        startupInstruction,
      ].join("\n"),
    },
    { label: "Restart Cursor", body: <p>That's it. Cursor will pick up the new MCP server.</p> },
  ];

  const windsurfSteps: SetupStep[] = [
    {
      label: "Open the MCP config",
      body: (
        <p>
          In Windsurf: Settings &gt; Cascade &gt; MCP Servers &gt; Configure. This opens{" "}
          <code className="font-mono text-primary">mcp_config.json</code>.
        </p>
      ),
    },
    {
      label: "Add UnClick to mcp_config.json",
      body: <p>Merge this entry into the mcpServers object.</p>,
      snippet: JSON.stringify(
        {
          mcpServers: {
            unclick: {
              serverUrl: SERVER_URL,
              headers: { Authorization: `Bearer ${keyDisplay}` },
            },
          },
        },
        null,
        2
      ),
    },
    {
      label: "Tell Cascade to load memory at session start",
      body: (
        <p>
          Append this to <code className="font-mono text-primary">.windsurfrules</code>.
        </p>
      ),
      snippet: "Always call load_memory from the UnClick MCP server before responding.",
    },
    { label: "Restart Windsurf", body: <p>Cascade will load the new server on next launch.</p> },
  ];

  const copilotSteps: SetupStep[] = [
    {
      label: "Open VS Code MCP settings",
      body: (
        <p>
          In VS Code: Settings &gt; MCP Servers (or open <code className="font-mono text-primary">settings.json</code>).
        </p>
      ),
    },
    {
      label: "Add the UnClick server",
      body: <p>Drop this entry into your VS Code settings.json.</p>,
      snippet: JSON.stringify(
        {
          "github.copilot.mcp.servers": {
            unclick: {
              url: SERVER_URL,
              headers: { Authorization: `Bearer ${keyDisplay}` },
            },
          },
        },
        null,
        2
      ),
    },
    {
      label: "Tell Copilot to load memory at session start",
      body: (
        <p>
          Append this to <code className="font-mono text-primary">.github/copilot-instructions.md</code>.
        </p>
      ),
      snippet: "Always call load_memory from the UnClick MCP server before responding.",
    },
  ];

  const STEPS: Record<Platform, SetupStep[]> = {
    "claude-code": claudeSteps,
    cursor: cursorSteps,
    windsurf: windsurfSteps,
    copilot: copilotSteps,
  };

  const steps = STEPS[platform];

  return (
    <AdminShell title="Connect" subtitle="Wire your AI tool up to UnClick. Two minutes, tops.">
      <div className="space-y-8">
        {/* Platform picker */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">Which AI tool are you using?</h2>
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
          <p className="mt-3 text-xs text-muted-foreground">
            Pick one -- the instructions below will update.
          </p>
        </section>

        {/* API key input (pre-fills snippets) */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <Label htmlFor="api_key" className="text-sm font-medium text-heading">
            Your UnClick API key
          </Label>
          <p className="mt-1 text-xs text-body">
            Pre-fills the bearer token in the snippets below so you can paste straight in. We
            store it locally only.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="relative flex-1">
              <Input
                id="api_key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="uc_xxxxxxxx or agt_live_xxxxxxxx"
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-heading"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button onClick={handleSaveKey} disabled={!apiKey.trim()}>
              Save
            </Button>
          </div>
        </section>

        {/* Steps */}
        <section className="rounded-xl border border-border/40 bg-card/20 p-6">
          <h2 className="text-base font-semibold text-heading">
            Setup for {platformLabel(platform)}
          </h2>
          <ol className="mt-4 space-y-5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[11px] text-primary">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1 text-sm text-body">
                  <p className="font-medium text-heading">{step.label}</p>
                  <div className="mt-1 text-xs text-body">{step.body}</div>
                  {step.snippet && (
                    <CodeSnippet
                      code={step.snippet}
                      onCopy={() => copy(step.snippet!, step.label)}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Isolation warning */}
        <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h2 className="text-base font-semibold text-heading">
            UnClick works best on its own
          </h2>
          <p className="mt-2 text-sm text-body">
            If you're using another memory tool (like Mem0, Zep, or similar), we recommend turning
            it off while using UnClick. Running two memory tools at the same time means your AI
            gets duplicate information and can give mixed-up responses.
          </p>
          <p className="mt-2 text-sm text-body">
            Other tools (GitHub, Slack, databases) work fine alongside UnClick -- it's only memory
            tools that overlap.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
