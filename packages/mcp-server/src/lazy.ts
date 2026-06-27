export function lazy<T>(factory: () => T): () => T {
  let value: T;
  let initialized = false;
  return () => {
    if (!initialized) {
      value = factory();
      initialized = true;
    }
    return value;
  };
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

export class LazyMap<K, V> {
  private cache = new Map<K, V>();
  private factory: (key: K) => V;

  constructor(factory: (key: K) => V) {
    this.factory = factory;
  }

  get(key: K): V {
    if (!this.cache.has(key)) {
      this.cache.set(key, this.factory(key));
    }
    return this.cache.get(key)!;
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }

  keys(): IterableIterator<K> {
    return this.cache.keys();
  }
}

export class Memo<T> {
  private value: T | undefined;
  private deps: unknown[];
  private factory: (...deps: unknown[]) => T;

  constructor(factory: (...deps: unknown[]) => T, ...initialDeps: unknown[]) {
    this.factory = factory;
    this.deps = initialDeps;
  }

  get(...currentDeps: unknown[]): T {
    if (this.value === undefined || !depsEqual(this.deps, currentDeps)) {
      this.value = this.factory(...currentDeps);
      this.deps = currentDeps;
    }
    return this.value;
  }

  invalidate(): void {
    this.value = undefined;
  }
}

function depsEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
