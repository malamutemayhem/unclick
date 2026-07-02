// wiring/text.ts
// Per-app MCP wiring for the text connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { analyseText, transformText, extractEmails, extractUrls, extractPhoneNumbers, countOccurrences, truncateText } from "../text-tool.js";

export const textTools = [
  // ── text-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "text_analyse",
    description: "Analyse text (word count, sentences, readability).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_transform",
    description: "Transform text (uppercase, lowercase, title case, slug, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        transform: { type: "string", description: "uppercase, lowercase, titlecase, slug, reverse, etc." },
      },
      required: ["text", "transform"],
    },
  },
  {
    name: "text_extract_emails",
    description: "Extract all email addresses from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_extract_urls",
    description: "Extract all URLs from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_extract_phone_numbers",
    description: "Extract all phone numbers from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_count_occurrences",
    description: "Count occurrences of a substring in text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        search: { type: "string" },
        case_sensitive: { type: "boolean" },
      },
      required: ["text", "search"],
    },
  },
  {
    name: "text_truncate",
    description: "Truncate text to a maximum length.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        max_length: { type: "number" },
        suffix: { type: "string" },
      },
      required: ["text", "max_length"],
    },
  },
] as const;

export const textHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // text-tool.ts
  text_analyse:            (args) => Promise.resolve(analyseText(args)),
  text_transform:          (args) => Promise.resolve(transformText(args)),
  text_extract_emails:     (args) => Promise.resolve(extractEmails(args)),
  text_extract_urls:       (args) => Promise.resolve(extractUrls(args)),
  text_extract_phone_numbers:(args) => Promise.resolve(extractPhoneNumbers(args)),
  text_count_occurrences:  (args) => Promise.resolve(countOccurrences(args)),
  text_truncate:           (args) => Promise.resolve(truncateText(args)),
};
