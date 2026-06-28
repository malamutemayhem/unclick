import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Compute the KMP prefix (failure) function for a string.
 * Optionally count and locate occurrences of a pattern using the prefix function.
 */
export async function prefixFunction(args: Record<string, unknown>) {
  const text = args.text;
  if (typeof text !== "string") {
    throw new Error("text must be a string.");
  }
  if (text.length === 0) {
    throw new Error("text must not be empty.");
  }
  if (text.length > 1_000_000) {
    throw new Error("text must be at most 1,000,000 characters.");
  }

  const pattern =
    typeof args.pattern === "string" ? (args.pattern as string) : undefined;

  if (pattern !== undefined && pattern.length === 0) {
    throw new Error("pattern must not be empty when provided.");
  }

  function computePrefix(s: string): number[] {
    const n = s.length;
    const pi = new Array<number>(n).fill(0);
    for (let i = 1; i < n; i++) {
      let j = pi[i - 1];
      while (j > 0 && s[i] !== s[j]) {
        j = pi[j - 1];
      }
      if (s[i] === s[j]) {
        j++;
      }
      pi[i] = j;
    }
    return pi;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use the prefix function for string matching or period detection",
      "The smallest period of the string is n - prefix_values[n-1]",
    ],
  };

  if (pattern !== undefined) {
    // Build combined string: pattern + sentinel + text
    const sentinel = "\0";
    const combined = pattern + sentinel + text;
    if (combined.length > 3_000_000) {
      throw new Error(
        "Combined pattern + text length exceeds the allowed limit.",
      );
    }
    const pi = computePrefix(combined);
    const m = pattern.length;
    const positions: number[] = [];
    for (let i = m + 1; i < combined.length; i++) {
      if (pi[i] === m) {
        positions.push(i - 2 * m);
      }
    }

    return stampMeta(
      {
        text,
        pattern,
        occurrences: positions.length,
        positions,
      },
      meta,
    );
  }

  // No pattern: return the raw prefix function array
  const prefixValues = computePrefix(text);
  const maxPrefix = Math.max(...prefixValues);

  return stampMeta(
    {
      text,
      prefix_values: prefixValues,
      max_prefix: maxPrefix,
    },
    meta,
  );
}
