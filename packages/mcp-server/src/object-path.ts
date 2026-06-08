export function getPath(obj: unknown, path: string | string[]): unknown {
  const keys = typeof path === "string" ? parsePath(path) : path;
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      current = current[parseInt(key, 10)];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export function setPath(obj: unknown, path: string | string[], value: unknown): unknown {
  const keys = typeof path === "string" ? parsePath(path) : path;
  if (keys.length === 0) return value;
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = keys[i + 1];
    if (Array.isArray(current)) {
      const idx = parseInt(key, 10);
      if (current[idx] === undefined || current[idx] === null) {
        current[idx] = /^\d+$/.test(next) ? [] : {};
      }
      current = current[idx];
    } else if (typeof current === "object" && current !== null) {
      const rec = current as Record<string, unknown>;
      if (rec[key] === undefined || rec[key] === null) {
        rec[key] = /^\d+$/.test(next) ? [] : {};
      }
      current = rec[key];
    }
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    current[parseInt(lastKey, 10)] = value;
  } else if (typeof current === "object" && current !== null) {
    (current as Record<string, unknown>)[lastKey] = value;
  }

  return root;
}

export function hasPath(obj: unknown, path: string | string[]): boolean {
  const keys = typeof path === "string" ? parsePath(path) : path;
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return false;
    if (Array.isArray(current)) {
      const idx = parseInt(key, 10);
      if (idx < 0 || idx >= current.length) return false;
      current = current[idx];
    } else if (typeof current === "object") {
      if (!(key in (current as Record<string, unknown>))) return false;
      current = (current as Record<string, unknown>)[key];
    } else {
      return false;
    }
  }
  return true;
}

export function deletePath(obj: unknown, path: string | string[]): unknown {
  const keys = typeof path === "string" ? parsePath(path) : path;
  if (keys.length === 0) return undefined;
  const root = structuredClone(obj) as Record<string, unknown>;
  let current: unknown = root;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (Array.isArray(current)) {
      current = current[parseInt(key, 10)];
    } else if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return root;
    }
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    current.splice(parseInt(lastKey, 10), 1);
  } else if (typeof current === "object" && current !== null) {
    delete (current as Record<string, unknown>)[lastKey];
  }

  return root;
}

export function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

export function unflattenObject(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const keys = parsePath(key);
    let current: Record<string, unknown> = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current) || typeof current[k] !== "object" || current[k] === null) {
        current[k] = /^\d+$/.test(keys[i + 1]) ? [] : {};
      }
      current = current[k] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = value;
  }
  return result;
}

function parsePath(path: string): string[] {
  return path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
}
