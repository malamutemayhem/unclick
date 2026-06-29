// wiring/trivia.ts
// Per-app MCP wiring for the trivia connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { triviaQuestions, triviaCategories } from "../trivia-tool.js";

export const triviaTools = [
  // ── trivia-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "trivia_questions",
    description: "Get trivia questions from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number" },
        category: { type: "number" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"], description: "easy, medium, hard" },
        type: { type: "string", enum: ["multiple", "boolean"], description: "multiple, boolean" },
      },
    },
  },
  {
    name: "trivia_categories",
    description: "Get available trivia categories from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const triviaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // trivia-tool.ts
  trivia_questions:        (args) => triviaQuestions(args),
  trivia_categories:       (args) => triviaCategories(args),
};
