export interface ChangeRecord<T> {
  timestamp: number;
  before: T;
  after: T;
  path?: string;
}

export class DiffTracker<T extends Record<string, unknown>> {
  private current: T;
  private undoStack: ChangeRecord<T>[] = [];
  private redoStack: ChangeRecord<T>[] = [];

  constructor(initial: T) {
    this.current = structuredClone(initial);
  }

  get state(): T {
    return structuredClone(this.current);
  }

  set(updates: Partial<T>): ChangeRecord<T> {
    const before = structuredClone(this.current);
    Object.assign(this.current, updates);
    const record: ChangeRecord<T> = { timestamp: Date.now(), before, after: structuredClone(this.current) };
    this.undoStack.push(record);
    this.redoStack = [];
    return record;
  }

  undo(): boolean {
    const record = this.undoStack.pop();
    if (!record) return false;
    this.redoStack.push(record);
    this.current = structuredClone(record.before);
    return true;
  }

  redo(): boolean {
    const record = this.redoStack.pop();
    if (!record) return false;
    this.undoStack.push(record);
    this.current = structuredClone(record.after);
    return true;
  }

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  history(): ChangeRecord<T>[] {
    return [...this.undoStack];
  }

  diff(a: T, b: T): Array<{ key: string; before: unknown; after: unknown }> {
    const changes: Array<{ key: string; before: unknown; after: unknown }> = [];
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of allKeys) {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
        changes.push({ key, before: a[key], after: b[key] });
      }
    }
    return changes;
  }

  changesSince(index: number): ChangeRecord<T>[] {
    return this.undoStack.slice(index);
  }

  get changeCount(): number {
    return this.undoStack.length;
  }

  reset(state: T): void {
    this.current = structuredClone(state);
    this.undoStack = [];
    this.redoStack = [];
  }
}
