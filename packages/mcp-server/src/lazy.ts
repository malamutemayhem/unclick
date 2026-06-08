export class Lazy<T> {
  private factory: (() => T) | null;
  private value: T | undefined;
  private initialized = false;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  get(): T {
    if (!this.initialized) {
      this.value = this.factory!();
      this.factory = null;
      this.initialized = true;
    }
    return this.value!;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  map<U>(fn: (value: T) => U): Lazy<U> {
    return new Lazy(() => fn(this.get()));
  }

  flatMap<U>(fn: (value: T) => Lazy<U>): Lazy<U> {
    return new Lazy(() => fn(this.get()).get());
  }
}

export function lazy<T>(factory: () => T): Lazy<T> {
  return new Lazy(factory);
}

export function lazyRecord<T extends Record<string, unknown>>(
  factories: { [K in keyof T]: () => T[K] },
): { [K in keyof T]: Lazy<T[K]> } {
  const result = {} as { [K in keyof T]: Lazy<T[K]> };
  for (const key of Object.keys(factories) as Array<keyof T>) {
    result[key] = new Lazy(factories[key]);
  }
  return result;
}

export class LazySequence<T> {
  private generator: () => Generator<T>;

  constructor(generator: () => Generator<T>) {
    this.generator = generator;
  }

  map<U>(fn: (value: T) => U): LazySequence<U> {
    const gen = this.generator;
    return new LazySequence(function* () {
      for (const v of gen()) yield fn(v);
    });
  }

  filter(fn: (value: T) => boolean): LazySequence<T> {
    const gen = this.generator;
    return new LazySequence(function* () {
      for (const v of gen()) if (fn(v)) yield v;
    });
  }

  take(n: number): T[] {
    const result: T[] = [];
    for (const v of this.generator()) {
      if (result.length >= n) break;
      result.push(v);
    }
    return result;
  }

  toArray(): T[] {
    return [...this.generator()];
  }

  [Symbol.iterator](): Generator<T> {
    return this.generator();
  }
}

export function lazySeq<T>(generator: () => Generator<T>): LazySequence<T> {
  return new LazySequence(generator);
}
