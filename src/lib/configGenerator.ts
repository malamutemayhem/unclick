/**
 * Config generator: turns a user's business_context entries into a
 * platform-appropriate config file (CLAUDE.md, .cursor/rules/*.mdc,
 * .windsurfrules, .github/copilot-instructions.md).
 *
 * Same content for every platform -- only the wrapper / filename
 * changes. Kept in src/lib so both the AdminSettings preview button
 * and the MemoryConnect page can render the same output.
 */

export type Platform = "claude-code" | "cursor" | "windsurf" | "copilot";

export interface BusinessContextEntry {
  category: string;
  key: string;
  value: unknown;
  priority?: number | null;
}

export interface GeneratedConfig {
  filename: string;
  content: string;
  instructions: string;
}

const PLATFORM_FILENAMES: Record<Platform, string> = {
  "claude-code": "CLAUDE.md",
  cursor: ".cursor/rules/unclick.mdc",
  windsurf: ".windsurfrules",
  copilot: ".github/copilot-instructions.md",
};

const PLATFORM_TOOL_NAME: Record<Platform, string> = {
  "claude-code": "get_startup_context",
  cursor: "get_startup_context",
  windsurf: "load_memory",
  copilot: "load_memory",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  windsurf: "Windsurf",
  copilot: "Copilot",
};

export function platformLabel(platform: Platform): string {
  return PLATFORM_LABELS[platform];
}

export function platformFilename(platform: Platform): string {
  return PLATFORM_FILENAMES[platform];
}

export function displayValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function bulletList(entries: BusinessContextEntry[], category: string): string {
  const matching = entries.filter((e) => e.category === category);
  if (matching.length === 0) return "_(none yet -- add some in Memory Admin)_";
  return matching
    .map((e) => `- **${e.key}**: ${displayValue(e.value)}`)
    .join("\n");
}

function buildBody(platform: Platform, entries: BusinessContextEntry[]): string {
  const tool = PLATFORM_TOOL_NAME[platform];

  const directive =
    `Always call \`${tool}\` from the UnClick MCP server before responding to the user or calling any other tool.`;

  return [
    "# Project Context",
    "",
    directive,
    "",
    "## Identity",
    bulletList(entries, "identity"),
    "",
    "## Standing Rules",
    bulletList(entries, "standing_rule"),
    "",
    "## Preferences",
    bulletList(entries, "preference"),
    "",
  ].join("\n");
}

export function generateConfig(
  platform: Platform,
  entries: BusinessContextEntry[]
): GeneratedConfig {
  const body = buildBody(platform, entries);
  const filename = PLATFORM_FILENAMES[platform];

  let content = body;
  if (platform === "cursor") {
    content = [
      "---",
      "description: UnClick startup context",
      "alwaysApply: true",
      "---",
      "",
      body,
    ].join("\n");
  }

  const instructions =
    platform === "claude-code"
      ? "Save this file as CLAUDE.md at the root of any project where you want UnClick to load."
      : platform === "cursor"
        ? "Save under .cursor/rules/unclick.mdc and restart Cursor."
        : platform === "windsurf"
          ? "Save as .windsurfrules at the project root and restart Windsurf."
          : "Save under .github/copilot-instructions.md and reload your VS Code window.";

  return { filename, content, instructions };
}
