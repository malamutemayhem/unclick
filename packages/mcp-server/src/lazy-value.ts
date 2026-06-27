export class Lazy<T> {
  private factory: () => T;
  private value?: T;
  private initialized = false;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  get(): T {
    if (!this.initialized) {
      this.value = this.factory();
      this.initialized = true;
    }
    return this.value!;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  reset(): void {
    this.initialized = false;
    this.value = undefined;
  }

  map<U>(fn: (value: T) => U): Lazy<U> {
    return new Lazy(() => fn(this.get()));
  }
}

export class AsyncLazy<T> {
  private factory: () => Promise<T>;
  private promise?: Promise<T>;

  constructor(factory: () => Promise<T>) {
    this.factory = factory;
  }

  async get(): Promise<T> {
    if (!this.promise) {
      this.promise = this.factory();
    }
    return this.promise;
  }

  get isInitialized(): boolean {
    return this.promise !== undefined;
  }

  reset(): void {
    this.promise = undefined;
  }
}

export function lazy<T>(factory: () => T): Lazy<T> {
  return new Lazy(factory);
}
