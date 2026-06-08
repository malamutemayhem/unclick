export type DiffKind = "added" | "removed" | "changed";

export interface SchemaDiff {
  path: string;
  kind: DiffKind;
  before?: unknown;
  after?: unknown;
}

export function schemaDiff(before: unknown, after: unknown, path = ""): SchemaDiff[] {
  const diffs: SchemaDiff[] = [];

  if (before === after) return diffs;

  const typeA = typeof before;
  const typeB = typeof after;

  if (typeA !== typeB || Array.isArray(before) !== Array.isArray(after)) {
    diffs.push({ path: path || "(root)", kind: "changed", before: describeType(before), after: describeType(after) });
    return diffs;
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    const maxLen = Math.max(before.length, after.length);
    for (let i = 0; i < maxLen; i++) {
      const itemPath = path ? `${path}[${i}]` : `[${i}]`;
      if (i >= before.length) {
        diffs.push({ path: itemPath, kind: "added", after: describeType(after[i]) });
      } else if (i >= after.length) {
        diffs.push({ path: itemPath, kind: "removed", before: describeType(before[i]) });
      } else {
        diffs.push(...schemaDiff(before[i], after[i], itemPath));
      }
    }
    return diffs;
  }

  if (typeA === "object" && before !== null && after !== null) {
    const keysA = new Set(Object.keys(before as Record<string, unknown>));
    const keysB = new Set(Object.keys(after as Record<string, unknown>));

    for (const key of keysB) {
      const childPath = path ? `${path}.${key}` : key;
      if (!keysA.has(key)) {
        diffs.push({ path: childPath, kind: "added", after: describeType((after as Record<string, unknown>)[key]) });
      }
    }

    for (const key of keysA) {
      const childPath = path ? `${path}.${key}` : key;
      if (!keysB.has(key)) {
        diffs.push({ path: childPath, kind: "removed", before: describeType((before as Record<string, unknown>)[key]) });
      } else {
        diffs.push(
          ...schemaDiff(
            (before as Record<string, unknown>)[key],
            (after as Record<string, unknown>)[key],
            childPath
          )
        );
      }
    }

    return diffs;
  }

  if (before !== after) {
    diffs.push({ path: path || "(root)", kind: "changed", before, after });
  }

  return diffs;
}

function describeType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `array(${value.length})`;
  return typeof value;
}

export function hasDiffs(before: unknown, after: unknown): boolean {
  return schemaDiff(before, after).length > 0;
}

export function summarize(diffs: SchemaDiff[]): { added: number; removed: number; changed: number } {
  return {
    added: diffs.filter((d) => d.kind === "added").length,
    removed: diffs.filter((d) => d.kind === "removed").length,
    changed: diffs.filter((d) => d.kind === "changed").length,
  };
}
