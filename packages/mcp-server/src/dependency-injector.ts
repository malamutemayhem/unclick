type Factory<T> = () => T;

export class Container {
  private singletons = new Map<string, unknown>();
  private factories = new Map<string, Factory<unknown>>();
  private transients = new Set<string>();

  register<T>(name: string, factory: Factory<T>, options?: { singleton?: boolean }): this {
    this.factories.set(name, factory);
    if (options?.singleton !== false) {
      // default is singleton
    } else {
      this.transients.add(name);
    }
    return this;
  }

  registerSingleton<T>(name: string, factory: Factory<T>): this {
    this.factories.set(name, factory);
    this.transients.delete(name);
    return this;
  }

  registerTransient<T>(name: string, factory: Factory<T>): this {
    this.factories.set(name, factory);
    this.transients.add(name);
    return this;
  }

  registerValue<T>(name: string, value: T): this {
    this.singletons.set(name, value);
    return this;
  }

  resolve<T>(name: string): T {
    if (this.singletons.has(name)) {
      return this.singletons.get(name) as T;
    }

    const factory = this.factories.get(name);
    if (!factory) throw new Error(`No registration found for "${name}"`);

    const instance = factory() as T;

    if (!this.transients.has(name)) {
      this.singletons.set(name, instance);
    }

    return instance;
  }

  has(name: string): boolean {
    return this.singletons.has(name) || this.factories.has(name);
  }

  remove(name: string): boolean {
    const had = this.singletons.delete(name) || this.factories.delete(name);
    this.transients.delete(name);
    return had;
  }

  clear(): void {
    this.singletons.clear();
    this.factories.clear();
    this.transients.clear();
  }

  get registeredNames(): string[] {
    const names = new Set<string>();
    for (const k of this.singletons.keys()) names.add(k);
    for (const k of this.factories.keys()) names.add(k);
    return [...names];
  }
}

export function createContainer(): Container {
  return new Container();
}
