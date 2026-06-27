export interface Diff {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: unknown;
  newValue?: unknown;
}

export function diff(a: unknown, b: unknown, prefix = ""): Diff[] {
  const diffs: Diff[] = [];
  if (a === b) return diffs;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    diffs.push({ path: prefix || "/", type: "changed", oldValue: a, newValue: b });
    return diffs;
  }
  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
  for (const key of allKeys) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!(key in aObj)) {
      diffs.push({ path, type: "added", newValue: bObj[key] });
    } else if (!(key in bObj)) {
      diffs.push({ path, type: "removed", oldValue: aObj[key] });
    } else {
      diffs.push(...diff(aObj[key], bObj[key], path));
    }
  }
  return diffs;
}

export function applyDiffs(obj: Record<string, unknown>, diffs: Diff[]): Record<string, unknown> {
  const result = structuredClone(obj);
  for (const d of diffs) {
    const parts = d.path.split(".");
    if (d.type === "removed") {
      deleteAt(result, parts);
    } else {
      setAt(result, parts, d.newValue);
    }
  }
  return result;
}

function setAt(obj: Record<string, unknown>, path: string[], value: unknown): void {
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in current) || typeof current[path[i]] !== "object") {
      current[path[i]] = {};
    }
    current = current[path[i]] as Record<string, unknown>;
  }
  current[path[path.length - 1]] = value;
}

function deleteAt(obj: Record<string, unknown>, path: string[]): void {
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!(path[i] in current)) return;
    current = current[path[i]] as Record<string, unknown>;
  }
  delete current[path[path.length - 1]];
}

export function hasDiffs(a: unknown, b: unknown): boolean {
  return diff(a, b).length > 0;
}
