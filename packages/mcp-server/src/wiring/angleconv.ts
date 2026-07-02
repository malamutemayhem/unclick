// wiring/angleconv.ts
// Per-app MCP wiring for the angleconv connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { angleConvert } from "../angleconv-tool.js";

export const angleconvTools = [
  // ── angleconv-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "angle_convert",
    description: "Convert angles between degrees, radians, gradians, and turns. Includes trig values.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Angle value to convert." },
        from: { type: "string" as const, description: "Unit of input: degrees, radians, gradians, or turns." },
      }, required: ["value", "from"],
    },
  },
] as const;

export const angleconvHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // angleconv-tool.ts
  angle_convert:             (args) => angleConvert(args),
};
