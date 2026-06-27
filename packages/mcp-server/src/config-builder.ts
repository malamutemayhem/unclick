export class ConfigBuilder<T extends Record<string, unknown> = Record<string, unknown>> {
  private config: Partial<T> = {};
  private defaults: Partial<T> = {};
  private validators = new Map<keyof T, (value: unknown) => boolean>();

  default<K extends keyof T>(key: K, value: T[K]): this {
    this.defaults[key] = value;
    return this;
  }

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.config[key] = value;
    return this;
  }

  setIf<K extends keyof T>(condition: boolean, key: K, value: T[K]): this {
    if (condition) this.config[key] = value;
    return this;
  }

  validate<K extends keyof T>(key: K, fn: (value: unknown) => boolean): this {
    this.validators.set(key, fn);
    return this;
  }

  merge(overrides: Partial<T>): this {
    Object.assign(this.config, overrides);
    return this;
  }

  build(): T {
    const result = { ...this.defaults, ...this.config } as T;
    for (const [key, validator] of this.validators) {
      if (!validator(result[key])) {
        throw new Error(`Invalid config value for "${String(key)}"`);
      }
    }
    return result;
  }

  get<K extends keyof T>(key: K): T[K] | undefined {
    return (this.config[key] ?? this.defaults[key]) as T[K] | undefined;
  }

  has(key: keyof T): boolean {
    return key in this.config || key in this.defaults;
  }

  toJSON(): Partial<T> {
    return { ...this.defaults, ...this.config };
  }
}
