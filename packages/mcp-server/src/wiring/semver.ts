// wiring/semver.ts
// Per-app MCP wiring for the semver connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { semverParse, semverCompare } from "../semver-tool.js";

export const semverTools = [
  // ── semver-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "semver_parse",
    description: "Parse a semantic version string into major, minor, patch, and prerelease.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        version: { type: "string" as const, description: "Version string (e.g. 2.3.1-beta.1)." },
      }, required: ["version"],
    },
  },
  {
    name: "semver_compare",
    description: "Compare two semantic versions (returns greater, less, or equal).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        version_a: { type: "string" as const, description: "First version." },
        version_b: { type: "string" as const, description: "Second version." },
      }, required: ["version_a", "version_b"],
    },
  },
] as const;

export const semverHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // semver-tool.ts
  semver_parse:              (args) => semverParse(args),
  semver_compare:            (args) => semverCompare(args),
};
