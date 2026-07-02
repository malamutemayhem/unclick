// wiring/sigmoid.ts
// Per-app MCP wiring for the sigmoid connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { sigmoidCalculate } from "../sigmoid-tool.js";

export const sigmoidTools = [
  // ── sigmoid-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "sigmoid_calculate",
    description: "Compute activation functions (sigmoid, tanh, relu, leaky_relu, elu, swish) and their derivatives.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        x: { type: "number" as const, description: "Input value." },
        function: { type: "string" as const, description: "Activation function: sigmoid, tanh, relu, leaky_relu, elu, or swish. Default: sigmoid." },
      }, required: ["x"],
    },
  },
] as const;

export const sigmoidHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sigmoid-tool.ts
  sigmoid_calculate:         (args) => sigmoidCalculate(args),
};
