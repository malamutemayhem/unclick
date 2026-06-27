export class ContextChain {
  private values: Map<string, unknown>;
  private parent?: ContextChain;

  constructor(initial?: Record<string, unknown>, parent?: ContextChain) {
    this.values = new Map(Object.entries(initial ?? {}));
    this.parent = parent;
  }

  get<T = unknown>(key: string): T | undefined {
    if (this.values.has(key)) return this.values.get(key) as T;
    return this.parent?.get<T>(key);
  }

  set(key: string, value: unknown): void {
    this.values.set(key, value);
  }

  has(key: string): boolean {
    return this.values.has(key) || (this.parent?.has(key) ?? false);
  }

  child(values?: Record<string, unknown>): ContextChain {
    return new ContextChain(values, this);
  }

  toObject(): Record<string, unknown> {
    const parentObj = this.parent?.toObject() ?? {};
    const ownObj = Object.fromEntries(this.values);
    return { ...parentObj, ...ownObj };
  }

  get depth(): number {
    return 1 + (this.parent?.depth ?? 0);
  }

  keys(): string[] {
    const parentKeys = this.parent?.keys() ?? [];
    const ownKeys = [...this.values.keys()];
    return [...new Set([...parentKeys, ...ownKeys])];
  }
}
