// Safe JSON utilities for diagnostics and error reporting.
// Inspired by OpenClaw's safe-json.ts. Our connectors sometimes try to
// log or report objects that contain circular refs, BigInts, Errors,
// or binary data - all of which break JSON.stringify. This module
// handles those edge cases so error reporting never crashes.

export function safeJsonStringify(value: unknown, indent?: number): string | null {
  try {
    return JSON.stringify(value, (_key, val) => {
      if (typeof val === "bigint") return val.toString();
      if (typeof val === "function") return "[Function]";
      if (val instanceof Error) {
        return { name: val.name, message: val.message, stack: val.stack };
      }
      if (val instanceof Uint8Array) {
        return `[Uint8Array ${val.length} bytes]`;
      }
      if (val instanceof Set) return [...val];
      if (val instanceof Map) return Object.fromEntries(val);
      return val;
    }, indent);
  } catch {
    return null;
  }
}

// Parse JSON that might have problems - returns undefined instead of throwing.
export function safeJsonParse(text: string): unknown | undefined {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
