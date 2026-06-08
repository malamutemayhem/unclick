// Lazy loader for expensive resources.
// Inspired by OpenClaw's lazy-promise.ts. Some things are expensive to
// set up (database connections, compiled schemas, loaded configs) but
// you only want to pay that cost if the feature is actually used.
// This creates them on first access and caches the result.

export interface LazyLoader<T> {
  load(): Promise<T>;
  clear(): void;
  readonly isLoaded: boolean;
}

export interface LazyLoaderOptions {
  /** Cache rejected promises? Default: false (retry on next call). */
  cacheRejections?: boolean;
}

export function createLazyLoader<T>(
  factory: () => T | Promise<T>,
  opts: LazyLoaderOptions = {},
): LazyLoader<T> {
  let promise: Promise<T> | undefined;
  let loaded = false;

  function create(): Promise<T> {
    const p = Promise.resolve().then(factory);
    if (!opts.cacheRejections) {
      void p.catch(() => {
        if (promise === p) {
          promise = undefined;
          loaded = false;
        }
      });
    }
    void p.then(() => { loaded = true; }, () => {});
    return p;
  }

  return {
    async load(): Promise<T> {
      promise ??= create();
      return promise;
    },
    clear(): void {
      promise = undefined;
      loaded = false;
    },
    get isLoaded(): boolean {
      return loaded;
    },
  };
}

// Sync version for cheap resources that just need one-time init.
export function createLazyValue<T>(factory: () => T): { get(): T; clear(): void } {
  let value: T | undefined;
  let initialized = false;

  return {
    get(): T {
      if (!initialized) {
        value = factory();
        initialized = true;
      }
      return value!;
    },
    clear(): void {
      value = undefined;
      initialized = false;
    },
  };
}
