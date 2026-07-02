// wiring/palindrome.ts
// Per-app MCP wiring for the palindrome connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { palindromeCheck } from "../palindrome-tool.js";

export const palindromeTools = [
  // ── palindrome-tool.ts ─────────────────────────────────────────────────────
  {
    name: "palindrome_check",
    description: "Check if text is a palindrome and find the longest palindromic substring.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to check." },
      }, required: ["text"],
    },
  },
] as const;

export const palindromeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // palindrome-tool.ts
  palindrome_check:          (args) => palindromeCheck(args),
};
