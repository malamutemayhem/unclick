export function safeParse<T = unknown>(input: string, fallback?: T): T | undefined {
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

export function safeStringify(value: unknown, space?: number): string | undefined {
  try {
    return JSON.stringify(value, replacer, space);
  } catch {
    return undefined;
  }
}

export function parseWithDates(input: string): unknown {
  const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  return JSON.parse(input, (_key: string, value: unknown) => {
    if (typeof value === "string" && ISO_DATE.test(value)) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return value;
  });
}

export function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  Object.freeze(obj);
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    deepFreeze((obj as Record<string, unknown>)[key]);
  }
  return obj;
}

export function stripUndefined<T>(obj: T): T {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) return obj;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value !== undefined) result[key] = stripUndefined(value);
  }
  return result as T;
}

function replacer(_key: string, value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  return value;
}
