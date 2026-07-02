// wiring/wger.ts
// Per-app MCP wiring for the wger connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { wgerExercises, wgerCategories, wgerMuscles } from "../wger-tool.js";

export const wgerHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wger-tool.ts
  wger_exercises:          (args) => wgerExercises(args),
  wger_categories:         (args) => wgerCategories(args),
  wger_muscles:            (args) => wgerMuscles(args),
};
