// Shallow object diff utility.
// Detects what changed between two objects. Useful for config change
// detection, audit logging, and cache invalidation.

export type ChangeType = "added" | "removed" | "changed";

export interface Change {
  key: string;
  type: ChangeType;
  oldValue?: unknown;
  newValue?: unknown;
}

export function diffObjects(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): Change[] {
  const changes: Change[] = [];
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

  for (const key of allKeys) {
    const inBefore = key in before;
    const inAfter = key in after;

    if (inBefore && !inAfter) {
      changes.push({ key, type: "removed", oldValue: before[key] });
    } else if (!inBefore && inAfter) {
      changes.push({ key, type: "added", newValue: after[key] });
    } else if (inBefore && inAfter && !isEqual(before[key], after[key])) {
      changes.push({ key, type: "changed", oldValue: before[key], newValue: after[key] });
    }
  }

  return changes;
}

function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => isEqual(val, b[i]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => key in bObj && isEqual(aObj[key], bObj[key]));
  }

  return false;
}

export function hasChanges(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): boolean {
  return diffObjects(before, after).length > 0;
}

export function summarizeChanges(changes: Change[]): string {
  if (changes.length === 0) return "no changes";
  const parts = changes.map((c) => {
    switch (c.type) {
      case "added": return `+${c.key}`;
      case "removed": return `-${c.key}`;
      case "changed": return `~${c.key}`;
    }
  });
  return parts.join(", ");
}
