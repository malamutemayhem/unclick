export interface Change {
  path: string;
  type: "add" | "remove" | "update";
  oldValue?: unknown;
  newValue?: unknown;
}

export function detectChanges(prev: unknown, next: unknown, path = ""): Change[] {
  if (prev === next) return [];

  if (prev === null || next === null || typeof prev !== "object" || typeof next !== "object") {
    if (prev === undefined && next !== undefined) {
      return [{ path: path || "$", type: "add", newValue: next }];
    }
    if (prev !== undefined && next === undefined) {
      return [{ path: path || "$", type: "remove", oldValue: prev }];
    }
    return [{ path: path || "$", type: "update", oldValue: prev, newValue: next }];
  }

  if (Array.isArray(prev) && Array.isArray(next)) {
    return detectArrayChanges(prev, next, path);
  }

  const prevObj = prev as Record<string, unknown>;
  const nextObj = next as Record<string, unknown>;
  const changes: Change[] = [];
  const allKeys = new Set([...Object.keys(prevObj), ...Object.keys(nextObj)]);

  for (const key of allKeys) {
    const childPath = path ? `${path}.${key}` : key;
    if (!(key in prevObj)) {
      changes.push({ path: childPath, type: "add", newValue: nextObj[key] });
    } else if (!(key in nextObj)) {
      changes.push({ path: childPath, type: "remove", oldValue: prevObj[key] });
    } else {
      changes.push(...detectChanges(prevObj[key], nextObj[key], childPath));
    }
  }

  return changes;
}

function detectArrayChanges(prev: unknown[], next: unknown[], path: string): Change[] {
  const changes: Change[] = [];
  const maxLen = Math.max(prev.length, next.length);

  for (let i = 0; i < maxLen; i++) {
    const childPath = `${path}[${i}]`;
    if (i >= prev.length) {
      changes.push({ path: childPath, type: "add", newValue: next[i] });
    } else if (i >= next.length) {
      changes.push({ path: childPath, type: "remove", oldValue: prev[i] });
    } else {
      changes.push(...detectChanges(prev[i], next[i], childPath));
    }
  }

  return changes;
}

export function hasChanged(prev: unknown, next: unknown): boolean {
  return detectChanges(prev, next).length > 0;
}

export function changedPaths(prev: unknown, next: unknown): string[] {
  return detectChanges(prev, next).map((c) => c.path);
}

export class ChangeTracker<T extends Record<string, unknown>> {
  private snapshot: string;

  constructor(private current: T) {
    this.snapshot = JSON.stringify(current);
  }

  update(next: T): Change[] {
    const prev = JSON.parse(this.snapshot) as T;
    const changes = detectChanges(prev, next);
    this.current = next;
    this.snapshot = JSON.stringify(next);
    return changes;
  }

  isDirty(): boolean {
    return JSON.stringify(this.current) !== this.snapshot;
  }

  reset(): void {
    this.snapshot = JSON.stringify(this.current);
  }

  getSnapshot(): T {
    return JSON.parse(this.snapshot) as T;
  }
}
