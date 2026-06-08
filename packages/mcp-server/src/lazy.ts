export class Lazy<T> {
  private factory: (() => T) | null;
  private cached: T | undefined;
  private initialized = false;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  get value(): T {
    if (!this.initialized) {
      this.cached = this.factory!();
      this.factory = null;
      this.initialized = true;
    }
    return this.cached as T;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  map<U>(fn: (value: T) => U): Lazy<U> {
    return new Lazy(() => fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Lazy<U>): Lazy<U> {
    return new Lazy(() => fn(this.value).value);
  }
}

export function lazy<T>(factory: () => T): Lazy<T> {
  return new Lazy(factory);
}

export function lazyAsync<T>(factory: () => Promise<T>): () => Promise<T> {
  let promise: Promise<T> | null = null;
  return () => {
    if (!promise) {
      promise = factory();
    }
    return promise;
  };
}

export function memoizeLazy<K, V>(factory: (key: K) => V): (key: K) => V {
  const cache = new Map<K, V>();
  return (key: K) => {
    if (cache.has(key)) return cache.get(key)!;
    const value = factory(key);
    cache.set(key, value);
    return value;
  };
}
