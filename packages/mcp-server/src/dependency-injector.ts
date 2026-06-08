type Factory<T> = () => T;

interface Registration<T> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
}

export class Container {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private registrations = new Map<string, Registration<any>>();

  register<T>(name: string, factory: Factory<T>, singleton = false): void {
    this.registrations.set(name, { factory, singleton });
  }

  singleton<T>(name: string, factory: Factory<T>): void {
    this.register(name, factory, true);
  }

  resolve<T>(name: string): T {
    const reg = this.registrations.get(name);
    if (!reg) throw new Error("No registration for: " + name);
    if (reg.singleton) {
      if (reg.instance === undefined) reg.instance = reg.factory();
      return reg.instance as T;
    }
    return reg.factory() as T;
  }

  has(name: string): boolean {
    return this.registrations.has(name);
  }

  clear(): void {
    this.registrations.clear();
  }

  names(): string[] {
    return [...this.registrations.keys()];
  }
}
