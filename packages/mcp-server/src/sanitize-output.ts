// Output sanitization for tool responses.
// Cleans up tool output before returning it to the agent.
// Strips control characters, truncates oversized responses,
// and redacts accidentally leaked secrets.

import { maskApiKey } from "./mask-secrets.js";

export interface SanitizeOptions {
  maxLength?: number;
  stripControlChars?: boolean;
  redactSecrets?: boolean;
  secretPatterns?: RegExp[];
}

const DEFAULT_MAX_LENGTH = 100_000;

const DEFAULT_SECRET_PATTERNS = [
  /(?:sk|pk)[-_](?:live|test)[-_][a-zA-Z0-9]{10,}/g,
  /(?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36,}/g,
  /xox[bpsar]-[a-zA-Z0-9-]{10,}/g,
  /eyJ[a-zA-Z0-9_-]{20,}\.eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g,
  /AKIA[0-9A-Z]{16}/g,
];

export function sanitizeOutput(text: string, opts: SanitizeOptions = {}): string {
  let result = text;
  const maxLen = opts.maxLength ?? DEFAULT_MAX_LENGTH;

  if (opts.stripControlChars !== false) {
    result = stripControl(result);
  }

  if (opts.redactSecrets !== false) {
    const patterns = opts.secretPatterns ?? DEFAULT_SECRET_PATTERNS;
    for (const pattern of patterns) {
      const regex = new RegExp(pattern.source, pattern.flags);
      result = result.replace(regex, (match) => maskApiKey(match));
    }
  }

  if (result.length > maxLen) {
    const truncated = result.slice(0, maxLen);
    result = truncated + `\n... (truncated, ${text.length - maxLen} chars omitted)`;
  }

  return result;
}

function stripControl(text: string): string {
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

export function estimateOutputSize(text: string): {
  chars: number;
  estimatedTokens: number;
  oversized: boolean;
} {
  const chars = text.length;
  const estimatedTokens = Math.ceil(chars / 4);
  return {
    chars,
    estimatedTokens,
    oversized: chars > DEFAULT_MAX_LENGTH,
  };
}
