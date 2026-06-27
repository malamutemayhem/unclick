export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp && b instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) {
      if (!b.has(k) || !deepEqual(v, b.get(k))) return false;
    }
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
      if (!deepEqual(aObj[key], bObj[key])) return false;
    }
    return true;
  }

  return false;
}

export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof RegExp) return new RegExp(value.source, value.flags) as T;
  if (value instanceof Set) return new Set([...value].map(deepClone)) as T;
  if (value instanceof Map) return new Map([...value].map(([k, v]) => [deepClone(k), deepClone(v)])) as T;
  if (Array.isArray(value)) return value.map(deepClone) as T;
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    result[k] = deepClone(v);
  }
  return result as T;
}

export function diff(a: unknown, b: unknown, path = ""): string[] {
  const diffs: string[] = [];
  if (a === b) return diffs;

  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    diffs.push(`${path || "root"}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
    return diffs;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      diffs.push(...diff(a[i], b[i], `${path}[${i}]`));
    }
    return diffs;
  }

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
  for (const key of allKeys) {
    const p = path ? `${path}.${key}` : key;
    if (!(key in aObj)) {
      diffs.push(`${p}: <missing> -> ${JSON.stringify(bObj[key])}`);
    } else if (!(key in bObj)) {
      diffs.push(`${p}: ${JSON.stringify(aObj[key])} -> <missing>`);
    } else {
      diffs.push(...diff(aObj[key], bObj[key], p));
    }
  }
  return diffs;
}
