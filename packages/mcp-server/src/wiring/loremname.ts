// wiring/loremname.ts
// Per-app MCP wiring for the loremname connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { loremNameGenerate } from "../loremname-tool.js";

export const loremnameTools = [
  // ── loremname-tool.ts ──────────────────────────────────────────────────────
  {
    name: "lorem_name_generate",
    description: "Generate random placeholder names with optional email addresses.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        count: { type: "number" as const, description: "Number of names (1-50, default 1)." },
        email: { type: "boolean" as const, description: "Include email addresses (default true)." },
        domain: { type: "string" as const, description: "Email domain (default example.com)." },
      },
    },
  },
] as const;

export const loremnameHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // loremname-tool.ts
  lorem_name_generate:       (args) => loremNameGenerate(args),
};
