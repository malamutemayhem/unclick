// wiring/opentriviadb.ts
// Per-app MCP wiring for the opentriviadb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { triviaDbQuestions, triviaDbCategories } from "../opentriviadb-tool.js";

export const opentriviadbTools = [
  // ── opentriviadb-tool.ts ─────────────────────────────────────────────────────
  {
    name: "triviadb_questions",
    description: "Get trivia questions from Open Trivia Database by category, difficulty, or type.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        amount: { type: "number" as const, description: "Number of questions (default 5, max 50)." },
        category: { type: "number" as const, description: "Category ID (use triviadb_categories to list them)." },
        difficulty: { type: "string" as const, description: "Difficulty: easy, medium, or hard." },
        type: { type: "string" as const, description: "Question type: multiple (4 choices) or boolean (true/false)." },
      },
    },
  },
  {
    name: "triviadb_categories",
    description: "List all available Open Trivia Database question categories.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const opentriviadbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // opentriviadb-tool.ts
  triviadb_questions:        (args) => triviaDbQuestions(args),
  triviadb_categories:       (args) => triviaDbCategories(args),};
