type Factory<T = unknown> = (container: Container) => T;

interface Binding<T = unknown> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
  tags: string[];
}

export class Container {
  private bindings = new Map<string, Binding>();
  private resolving = new Set<string>();

  register<T>(name: string, factory: Factory<T>, options: { singleton?: boolean; tags?: string[] } = {}): this {
    this.bindings.set(name, {
      factory: factory as Factory,
      singleton: options.singleton ?? false,
      tags: options.tags ?? [],
    });
    return this;
  }

  singleton<T>(name: string, factory: Factory<T>, tags: string[] = []): this {
    return this.register(name, factory, { singleton: true, tags });
  }

  value<T>(name: string, val: T, tags: string[] = []): this {
    return this.register(name, () => val, { singleton: true, tags });
  }

  resolve<T = unknown>(name: string): T {
    const binding = this.bindings.get(name);
    if (!binding) throw new Error(`No binding for: ${name}`);

    if (binding.singleton && binding.instance !== undefined) {
      return binding.instance as T;
    }

    if (this.resolving.has(name)) {
      throw new Error(`Circular dependency detected: ${name}`);
    }

    this.resolving.add(name);
    try {
      const instance = binding.factory(this);
      if (binding.singleton) binding.instance = instance;
      return instance as T;
    } finally {
      this.resolving.delete(name);
    }
  }

  has(name: string): boolean {
    return this.bindings.has(name);
  }

  getByTag(tag: string): unknown[] {
    const results: unknown[] = [];
    for (const [name, binding] of this.bindings) {
      if (binding.tags.includes(tag)) {
        results.push(this.resolve(name));
      }
    }
    return results;
  }

  reset(name?: string): void {
    if (name) {
      const binding = this.bindings.get(name);
      if (binding) binding.instance = undefined;
    } else {
      for (const binding of this.bindings.values()) {
        binding.instance = undefined;
      }
    }
  }

  child(): Container {
    const c = new Container();
    for (const [name, binding] of this.bindings) {
      c.bindings.set(name, { ...binding, instance: undefined });
    }
    return c;
  }

  listBindings(): string[] {
    return [...this.bindings.keys()];
  }
}
