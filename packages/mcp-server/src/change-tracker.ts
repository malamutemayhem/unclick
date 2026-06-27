export interface Change {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  timestamp: number;
}

export class ChangeTracker {
  private original: Record<string, unknown>;
  private current: Record<string, unknown>;
  private history: Change[] = [];
  private clock = 0;
  private dirty = new Set<string>();

  constructor(initial: Record<string, unknown> = {}) {
    this.original = JSON.parse(JSON.stringify(initial));
    this.current = JSON.parse(JSON.stringify(initial));
  }

  set(field: string, value: unknown): void {
    const oldValue = this.current[field];
    if (oldValue === value) return;
    this.history.push({ field, oldValue, newValue: value, timestamp: this.clock++ });
    this.current[field] = value;
    if (this.original[field] !== value) {
      this.dirty.add(field);
    } else {
      this.dirty.delete(field);
    }
  }

  get(field: string): unknown {
    return this.current[field];
  }

  isDirty(field?: string): boolean {
    if (field) return this.dirty.has(field);
    return this.dirty.size > 0;
  }

  dirtyFields(): string[] {
    return [...this.dirty];
  }

  changes(): Record<string, { oldValue: unknown; newValue: unknown }> {
    const result: Record<string, { oldValue: unknown; newValue: unknown }> = {};
    for (const field of this.dirty) {
      result[field] = { oldValue: this.original[field], newValue: this.current[field] };
    }
    return result;
  }

  revert(field: string): void {
    if (!(field in this.original)) {
      delete this.current[field];
    } else {
      this.current[field] = JSON.parse(JSON.stringify(this.original[field]));
    }
    this.dirty.delete(field);
    this.history.push({ field, oldValue: this.current[field], newValue: this.original[field], timestamp: this.clock++ });
  }

  revertAll(): void {
    this.current = JSON.parse(JSON.stringify(this.original));
    this.dirty.clear();
  }

  commit(): void {
    this.original = JSON.parse(JSON.stringify(this.current));
    this.dirty.clear();
  }

  snapshot(): Record<string, unknown> {
    return JSON.parse(JSON.stringify(this.current));
  }

  getHistory(): Change[] {
    return [...this.history];
  }

  historyFor(field: string): Change[] {
    return this.history.filter((c) => c.field === field);
  }

  fieldCount(): number {
    return Object.keys(this.current).length;
  }
}
