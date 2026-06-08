export function compactStringify(value: unknown): string {
  return JSON.stringify(value);
}

export function prettyStringify(value: unknown, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

export function sortedStringify(value: unknown, indent?: number): string {
  return JSON.stringify(value, sortReplacer, indent);
}

export function stableHash(value: unknown): string {
  const json = sortedStringify(value);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = ((hash << 5) - hash + json.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

export function jsonSize(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf-8");
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export function stripNulls<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(stripNulls) as T;
  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      if (val !== null && val !== undefined) {
        result[key] = stripNulls(val);
      }
    }
    return result as T;
  }
  return obj;
}

function sortReplacer(_key: string, value: unknown): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)),
    );
  }
  return value;
}
