export function safeParse<T = unknown>(json: string, fallback?: T): T | undefined {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function safeStringify(value: unknown, space?: number): string | undefined {
  try {
    return JSON.stringify(value, null, space);
  } catch {
    return undefined;
  }
}

export function stringifySafe(value: unknown, space?: number): string {
  const seen = new WeakSet();
  return JSON.stringify(value, (_key, val) => {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) return "[Circular]";
      seen.add(val);
    }
    if (typeof val === "bigint") return val.toString() + "n";
    if (val instanceof Error) return { name: val.name, message: val.message, stack: val.stack };
    if (val instanceof Date) return val.toISOString();
    if (val instanceof RegExp) return val.toString();
    if (val instanceof Map) return Object.fromEntries(val);
    if (val instanceof Set) return [...val];
    return val;
  }, space);
}

export function jsonLines(items: unknown[]): string {
  return items.map((item) => JSON.stringify(item)).join("\n");
}

export function parseJsonLines(text: string): unknown[] {
  return text.split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
