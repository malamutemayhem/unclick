type Factory<T> = () => T;

interface Registration<T = unknown> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
  tags: string[];
}

export class Container {
  private registrations = new Map<string, Registration>();

  register<T>(name: string, factory: Factory<T>, options: { singleton?: boolean; tags?: string[] } = {}): void {
    this.registrations.set(name, {
      factory,
      singleton: options.singleton ?? false,
      tags: options.tags ?? [],
    });
  }

  registerValue<T>(name: string, value: T, tags: string[] = []): void {
    this.registrations.set(name, {
      factory: () => value,
      singleton: true,
      instance: value,
      tags,
    });
  }

  resolve<T>(name: string): T {
    const reg = this.registrations.get(name);
    if (!reg) throw new Error(`No registration for: ${name}`);
    if (reg.singleton) {
      if (reg.instance === undefined) reg.instance = reg.factory();
      return reg.instance as T;
    }
    return reg.factory() as T;
  }

  has(name: string): boolean {
    return this.registrations.has(name);
  }

  unregister(name: string): boolean {
    return this.registrations.delete(name);
  }

  getByTag(tag: string): string[] {
    return [...this.registrations.entries()]
      .filter(([, r]) => r.tags.includes(tag))
      .map(([name]) => name);
  }

  names(): string[] {
    return [...this.registrations.keys()];
  }

  get size(): number {
    return this.registrations.size;
  }

  clear(): void {
    this.registrations.clear();
  }

  createChild(): Container {
    const child = new Container();
    for (const [name, reg] of this.registrations) {
      child.registrations.set(name, { ...reg });
    }
    return child;
  }
}
