export interface DeduplicateOptions<T> {
  key?: (item: T) => string;
  similarity?: (a: T, b: T) => number;
  threshold?: number;
}

export function deduplicateExact<T>(items: T[], key: (item: T) => string = String): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (!seen.has(k)) {
      seen.add(k);
      result.push(item);
    }
  }
  return result;
}

export function deduplicateFuzzy<T>(
  items: T[],
  similarity: (a: T, b: T) => number,
  threshold = 0.9,
): T[] {
  const result: T[] = [];
  for (const item of items) {
    const isDuplicate = result.some((existing) => similarity(existing, item) >= threshold);
    if (!isDuplicate) result.push(item);
  }
  return result;
}

export function findDuplicateGroups<T>(
  items: T[],
  key: (item: T) => string = String,
): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(item);
  }
  const duplicates = new Map<string, T[]>();
  for (const [k, group] of groups) {
    if (group.length > 1) duplicates.set(k, group);
  }
  return duplicates;
}

export function uniqueCount<T>(items: T[], key: (item: T) => string = String): number {
  return new Set(items.map(key)).size;
}

export function duplicateRate<T>(items: T[], key: (item: T) => string = String): number {
  if (items.length === 0) return 0;
  const unique = uniqueCount(items, key);
  return 1 - unique / items.length;
}
