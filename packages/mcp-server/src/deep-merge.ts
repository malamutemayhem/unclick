export function deepMerge(...sources: Record<string, any>[]): Record<string, any> {
  const result: any = {};
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      const val = (source as any)[key];
      if (isPlainObject(val) && isPlainObject(result[key])) {
        result[key] = deepMerge(result[key], val);
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}

export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as any;
  if (value instanceof Date) return new Date(value.getTime()) as any;
  if (value instanceof RegExp) return new RegExp(value.source, value.flags) as any;
  const result: any = {};
  for (const key of Object.keys(value)) {
    result[key] = deepClone((value as any)[key]);
  }
  return result;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  const keysA = Object.keys(a as any);
  const keysB = Object.keys(b as any);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual((a as any)[key], (b as any)[key]));
}

function isPlainObject(v: unknown): v is Record<string, any> {
  return v !== null && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date) && !(v instanceof RegExp);
}
