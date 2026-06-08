export type Operation =
  | { op: "add"; path: string; value: unknown }
  | { op: "remove"; path: string; oldValue: unknown }
  | { op: "replace"; path: string; value: unknown; oldValue: unknown };

export function diff(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  prefix = "",
): Operation[] {
  const ops: Operation[] = [];

  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of allKeys) {
    const path = prefix ? `${prefix}.${key}` : key;
    const inBefore = key in before;
    const inAfter = key in after;

    if (!inBefore && inAfter) {
      ops.push({ op: "add", path, value: after[key] });
    } else if (inBefore && !inAfter) {
      ops.push({ op: "remove", path, oldValue: before[key] });
    } else if (inBefore && inAfter) {
      const bVal = before[key];
      const aVal = after[key];
      if (isPlainObject(bVal) && isPlainObject(aVal)) {
        ops.push(...diff(bVal, aVal, path));
      } else if (!deepEqual(bVal, aVal)) {
        ops.push({ op: "replace", path, value: aVal, oldValue: bVal });
      }
    }
  }

  return ops;
}

export function applyPatch(
  target: Record<string, unknown>,
  ops: Operation[],
): Record<string, unknown> {
  const result = structuredClone(target);
  for (const op of ops) {
    const parts = op.path.split(".");
    const last = parts.pop()!;
    let obj = result as Record<string, unknown>;
    for (const part of parts) {
      if (!(part in obj) || typeof obj[part] !== "object") {
        obj[part] = {};
      }
      obj = obj[part] as Record<string, unknown>;
    }
    if (op.op === "remove") {
      delete obj[last];
    } else {
      obj[last] = op.value;
    }
  }
  return result;
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}
