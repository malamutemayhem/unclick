// ─── Subscription seat runtimes ───────────────────────────────────────────────
// Canonical registry of the official, subscription-signed-in CLIs a seat
// bridge can drive. One entry per vendor CLI; the id is what the website,
// the bridge endpoint, and the worker all agree on.
//
// Tiers:
//   full  - turn gets the UnClick MCP tool child (mode-gated) and image
//           attachments wired into the CLI invocation.
//   basic - plain text turn: prompt in, answer out. Still real subscription
//           compute; tools and images land as the invocation syntax for
//           that CLI is verified.
//
// The hard rule for every entry: it must be the vendor's OFFICIAL tool
// authenticating with the user's own login. No web scraping, no private
// endpoint reverse engineering, ever (see docs/prd/chat-subscription-seats.md).

export interface BridgeRuntimeSpec {
  id: string;
  /** Seat label offered in the chat UI. */
  label: string;
  /** The binary the worker spawns. */
  cli: string;
  /** Human name of the CLI for error and setup copy. */
  cliName: string;
  /** Which plan powers it, for the seat picker. */
  planHint: string;
  defaultHandle: string;
  tier: "full" | "basic";
}

export const BRIDGE_RUNTIME_SPECS: BridgeRuntimeSpec[] = [
  {
    id: "claude-code",
    label: "Claude subscription",
    cli: "claude",
    cliName: "Claude Code CLI",
    planHint: "Claude Pro / Max plan, signed in on your machine",
    defaultHandle: "claude-sub",
    tier: "full",
  },
  {
    id: "codex-cli",
    label: "ChatGPT subscription",
    cli: "codex",
    cliName: "Codex CLI",
    planHint: "ChatGPT Plus / Pro plan, signed in on your machine",
    defaultHandle: "gpt-sub",
    tier: "full",
  },
  {
    id: "gemini-cli",
    label: "Gemini subscription",
    cli: "gemini",
    cliName: "Gemini CLI",
    planHint: "Google account (free tier) or Google AI Pro / Ultra",
    defaultHandle: "gemini-sub",
    tier: "basic",
  },
  {
    id: "copilot-cli",
    label: "GitHub Copilot subscription",
    cli: "copilot",
    cliName: "GitHub Copilot CLI",
    planHint: "Copilot Pro / Pro+ / Business, signed in with GitHub",
    defaultHandle: "copilot-sub",
    tier: "basic",
  },
  {
    id: "cursor-cli",
    label: "Cursor subscription",
    cli: "cursor-agent",
    cliName: "Cursor CLI",
    planHint: "Cursor Pro / Ultra plan, signed in on your machine",
    defaultHandle: "cursor-sub",
    tier: "basic",
  },
];

export const BRIDGE_RUNTIME_IDS = BRIDGE_RUNTIME_SPECS.map((spec) => spec.id);

export function findBridgeRuntime(id: string): BridgeRuntimeSpec | undefined {
  return BRIDGE_RUNTIME_SPECS.find((spec) => spec.id === id);
}

export function isBridgeRuntimeId(value: unknown): value is string {
  return typeof value === "string" && BRIDGE_RUNTIME_IDS.includes(value);
}
