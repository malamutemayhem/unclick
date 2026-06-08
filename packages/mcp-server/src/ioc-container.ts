type Factory<T> = () => T;

interface Binding<T> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
}

export class IoCContainer {
  private bindings = new Map<string, Binding<unknown>>();
  private resolving = new Set<string>();

  register<T>(name: string, factory: Factory<T>, singleton: boolean = false): this {
    this.bindings.set(name, { factory, singleton });
    return this;
  }

  singleton<T>(name: string, factory: Factory<T>): this {
    return this.register(name, factory, true);
  }

  transient<T>(name: string, factory: Factory<T>): this {
    return this.register(name, factory, false);
  }

  registerValue<T>(name: string, value: T): this {
    this.bindings.set(name, { factory: () => value, singleton: true, instance: value });
    return this;
  }

  resolve<T>(name: string): T {
    const binding = this.bindings.get(name);
    if (!binding) throw new Error(`No binding found for: ${name}`);
    if (this.resolving.has(name)) throw new Error(`Circular dependency detected: ${name}`);
    if (binding.singleton && binding.instance !== undefined) return binding.instance as T;
    this.resolving.add(name);
    try {
      const instance = binding.factory() as T;
      if (binding.singleton) binding.instance = instance;
      return instance;
    } finally {
      this.resolving.delete(name);
    }
  }

  has(name: string): boolean {
    return this.bindings.has(name);
  }

  remove(name: string): boolean {
    return this.bindings.delete(name);
  }

  clear(): void {
    this.bindings.clear();
  }

  get registeredNames(): string[] {
    return [...this.bindings.keys()];
  }

  createChild(): IoCContainer {
    const child = new IoCContainer();
    for (const [name, binding] of this.bindings) {
      child.bindings.set(name, { ...binding });
    }
    return child;
  }
}
