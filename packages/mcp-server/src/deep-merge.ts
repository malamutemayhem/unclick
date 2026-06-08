type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends PlainObject>(...sources: Partial<T>[]): T {
  const result: PlainObject = {};
  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    for (const key of Object.keys(source)) {
      const existing = result[key];
      const incoming = (source as PlainObject)[key];
      if (isPlainObject(existing) && isPlainObject(incoming)) {
        result[key] = deepMerge(existing, incoming);
      } else {
        result[key] = incoming;
      }
    }
  }
  return result as T;
}

export function deepMergeWith(
  merger: (a: unknown, b: unknown, key: string) => unknown,
  ...sources: PlainObject[]
): PlainObject {
  const result: PlainObject = {};
  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    for (const key of Object.keys(source)) {
      const existing = result[key];
      const incoming = source[key];
      if (existing !== undefined) {
        result[key] = merger(existing, incoming, key);
      } else {
        result[key] = incoming;
      }
    }
  }
  return result;
}

export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as T;
  const result: PlainObject = {};
  for (const key of Object.keys(value as PlainObject)) {
    result[key] = deepClone((value as PlainObject)[key]);
  }
  return result as T;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  const keysA = Object.keys(a as PlainObject);
  const keysB = Object.keys(b as PlainObject);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) =>
    deepEqual((a as PlainObject)[key], (b as PlainObject)[key])
  );
}
