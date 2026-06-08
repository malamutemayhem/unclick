type Factory<T> = () => T;

interface Registration<T> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
}

export class Container {
  private registrations = new Map<string, Registration<unknown>>();

  register<T>(name: string, factory: Factory<T>, singleton: boolean = false): this {
    this.registrations.set(name, { factory, singleton });
    return this;
  }

  singleton<T>(name: string, factory: Factory<T>): this {
    return this.register(name, factory, true);
  }

  transient<T>(name: string, factory: Factory<T>): this {
    return this.register(name, factory, false);
  }

  resolve<T>(name: string): T {
    const reg = this.registrations.get(name);
    if (!reg) throw new Error(`No registration for "${name}"`);
    if (reg.singleton) {
      if (reg.instance === undefined) reg.instance = reg.factory();
      return reg.instance as T;
    }
    return reg.factory() as T;
  }

  has(name: string): boolean {
    return this.registrations.has(name);
  }

  remove(name: string): boolean {
    return this.registrations.delete(name);
  }

  clear(): void {
    this.registrations.clear();
  }

  get size(): number {
    return this.registrations.size;
  }

  names(): string[] {
    return [...this.registrations.keys()];
  }

  createChild(): Container {
    const child = new Container();
    for (const [name, reg] of this.registrations) {
      child.registrations.set(name, { ...reg });
    }
    return child;
  }
}
