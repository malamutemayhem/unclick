export function get(obj: unknown, path: string, defaultValue?: unknown): unknown {
  const keys = parsePath(path);
  let current = obj as Record<string, unknown>;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return defaultValue;
    current = current[key] as Record<string, unknown>;
  }
  return current === undefined ? defaultValue : current;
}

export function set(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = parsePath(path);
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

export function has(obj: unknown, path: string): boolean {
  const keys = parsePath(path);
  let current = obj as Record<string, unknown>;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return false;
    if (!Object.prototype.hasOwnProperty.call(current, key)) return false;
    current = current[key] as Record<string, unknown>;
  }
  return true;
}

export function del(obj: Record<string, unknown>, path: string): boolean {
  const keys = parsePath(path);
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) return false;
    current = current[keys[i]] as Record<string, unknown>;
  }
  const last = keys[keys.length - 1];
  if (!Object.prototype.hasOwnProperty.call(current, last)) return false;
  delete current[last];
  return true;
}

export function flatten(obj: Record<string, unknown>, prefix: string = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

export function unflatten(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [path, value] of Object.entries(obj)) {
    set(result, path, value);
  }
  return result;
}

function parsePath(path: string): string[] {
  return path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
}
