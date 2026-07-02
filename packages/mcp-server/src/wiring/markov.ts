// wiring/markov.ts
// Per-app MCP wiring for the markov connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { markovGenerate } from "../markov-tool.js";

export const markovTools = [
  // ── markov-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "markov_generate",
    description: "Generate text using a Markov chain trained on input text (word or character level).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Training corpus." },
        order: { type: "number" as const, description: "Chain order/context size (default 2)." },
        length: { type: "number" as const, description: "Number of tokens to generate (default 50)." },
        mode: { type: "string" as const, description: "'word' (default) or 'character'." },
      }, required: ["text"],
    },
  },
] as const;

export const markovHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // markov-tool.ts
  markov_generate:           (args) => markovGenerate(args),
};
