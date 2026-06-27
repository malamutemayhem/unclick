export type ConfigSource = {
  name: string;
  priority: number;
  values: Record<string, unknown>;
};

export class ConfigResolver {
  private sources: ConfigSource[] = [];

  addSource(name: string, values: Record<string, unknown>, priority = 0): this {
    this.sources.push({ name, priority, values });
    this.sources.sort((a, b) => b.priority - a.priority);
    return this;
  }

  removeSource(name: string): boolean {
    const idx = this.sources.findIndex((s) => s.name === name);
    if (idx === -1) return false;
    this.sources.splice(idx, 1);
    return true;
  }

  get<T = unknown>(key: string): T | undefined {
    for (const source of this.sources) {
      if (key in source.values) return source.values[key] as T;
    }
    return undefined;
  }

  getOrDefault<T = unknown>(key: string, defaultValue: T): T {
    const val = this.get<T>(key);
    return val !== undefined ? val : defaultValue;
  }

  getRequired<T = unknown>(key: string): T {
    const val = this.get<T>(key);
    if (val === undefined) throw new Error(`Required config key missing: ${key}`);
    return val;
  }

  has(key: string): boolean {
    return this.sources.some((s) => key in s.values);
  }

  sourceOf(key: string): string | undefined {
    for (const source of this.sources) {
      if (key in source.values) return source.name;
    }
    return undefined;
  }

  allKeys(): string[] {
    const keys = new Set<string>();
    for (const source of this.sources) {
      for (const key of Object.keys(source.values)) keys.add(key);
    }
    return [...keys].sort();
  }

  resolved(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const key of this.allKeys()) {
      result[key] = this.get(key);
    }
    return result;
  }

  sourceNames(): string[] {
    return this.sources.map((s) => s.name);
  }

  clear(): void {
    this.sources = [];
  }
}

export function createConfig(layers: Array<{ name: string; values: Record<string, unknown>; priority?: number }>): ConfigResolver {
  const resolver = new ConfigResolver();
  for (const layer of layers) {
    resolver.addSource(layer.name, layer.values, layer.priority ?? 0);
  }
  return resolver;
}
