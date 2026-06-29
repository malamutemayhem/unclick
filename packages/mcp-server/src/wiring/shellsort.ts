// wiring/shellsort.ts
// Per-app MCP wiring for the shellsort connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

export const shellsortTools = [
  // ── shellsort-tool.ts ────────────────────────────────────────────────────────
  {
    name: "shell_sort",
    description: "Sort an array using Shell sort with gap sequence tracking, comparison and swap counts.",
    inputSchema: {
      type: "object" as const,
      properties: {
        array: { type: "array", items: { type: "number" }, description: "Array of numbers to sort (max 100,000 elements)" },
      }, required: ["array"],
    },
  },
] as const;
