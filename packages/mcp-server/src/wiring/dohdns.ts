// wiring/dohdns.ts
// Per-app MCP wiring for the dohdns connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dohdnsResolve } from "../dohdns-tool.js";

export const dohdnsTools = [
  // ── dohdns-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "dohdns_resolve",
    description: "Resolve DNS records for a domain via Google DNS-over-HTTPS.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Domain name to resolve." },
        type: { type: "string" as const, description: "Record type: A, AAAA, MX, TXT, CNAME, NS (default: A)." },
      }, required: ["name"],
    },
  },
] as const;

export const dohdnsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dohdns-tool.ts
  dohdns_resolve:            (args) => dohdnsResolve(args),
};
