export interface ConflictItem<T = unknown> {
  source: string;
  value: T;
  timestamp: number;
  priority?: number;
}

export type ResolutionStrategy = "latest" | "highest-priority" | "merge" | "first";

export function resolveConflict<T>(items: ConflictItem<T>[], strategy: ResolutionStrategy = "latest"): T | undefined {
  if (items.length === 0) return undefined;
  if (items.length === 1) return items[0].value;

  switch (strategy) {
    case "latest":
      return [...items].sort((a, b) => b.timestamp - a.timestamp)[0].value;
    case "highest-priority":
      return [...items].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0].value;
    case "first":
      return items[0].value;
    case "merge":
      return mergeValues(items.map((i) => i.value));
  }
}

function mergeValues<T>(values: T[]): T {
  if (values.length === 0) return undefined as T;
  const first = values[0];
  if (typeof first !== "object" || first === null || Array.isArray(first)) return values[values.length - 1];

  const result = { ...(first as Record<string, unknown>) };
  for (let i = 1; i < values.length; i++) {
    Object.assign(result, values[i] as Record<string, unknown>);
  }
  return result as T;
}

export interface MergeConflict {
  key: string;
  values: Array<{ source: string; value: unknown }>;
  resolved?: unknown;
}

export function detectConflicts(
  records: Array<{ source: string; data: Record<string, unknown> }>,
): MergeConflict[] {
  const keyValues = new Map<string, Array<{ source: string; value: unknown }>>();

  for (const record of records) {
    for (const [key, value] of Object.entries(record.data)) {
      if (!keyValues.has(key)) keyValues.set(key, []);
      keyValues.get(key)!.push({ source: record.source, value });
    }
  }

  const conflicts: MergeConflict[] = [];
  for (const [key, values] of keyValues.entries()) {
    const unique = new Set(values.map((v) => JSON.stringify(v.value)));
    if (unique.size > 1) {
      conflicts.push({ key, values });
    }
  }

  return conflicts;
}

export function autoResolve(conflicts: MergeConflict[], strategy: ResolutionStrategy = "latest"): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const conflict of conflicts) {
    const items: ConflictItem[] = conflict.values.map((v, i) => ({
      source: v.source, value: v.value, timestamp: i, priority: i,
    }));
    result[conflict.key] = resolveConflict(items, strategy);
  }
  return result;
}
