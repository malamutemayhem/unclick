export function getPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function getPathOr<T>(obj: unknown, path: string, fallback: T): T {
  const value = getPath(obj, path);
  return (value === undefined || value === null) ? fallback : value as T;
}

export function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

export function hasPath(obj: unknown, path: string): boolean {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== "object") return false;
    if (!(part in (current as Record<string, unknown>))) return false;
    current = (current as Record<string, unknown>)[part];
  }
  return true;
}

export function deletePath(obj: Record<string, unknown>, path: string): boolean {
  const parts = path.split(".");
  if (parts.length === 1) {
    if (parts[0] in obj) {
      delete obj[parts[0]];
      return true;
    }
    return false;
  }
  const parent = getPath(obj, parts.slice(0, -1).join("."));
  if (parent && typeof parent === "object") {
    const key = parts[parts.length - 1];
    if (key in (parent as Record<string, unknown>)) {
      delete (parent as Record<string, unknown>)[key];
      return true;
    }
  }
  return false;
}
