// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn = (...args: any[]) => any;

interface MemoizeOptions {
  maxSize?: number;
  ttl?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyFn?: (...args: any[]) => string;
}

interface MemoizedFn<F extends AnyFn> {
  (...args: Parameters<F>): ReturnType<F>;
  cache: Map<string, { value: ReturnType<F>; timestamp: number }>;
  clear: () => void;
  delete: (key: string) => boolean;
  has: (...args: Parameters<F>) => boolean;
}

export function memoize<F extends AnyFn>(fn: F, options: MemoizeOptions = {}): MemoizedFn<F> {
  const { maxSize, ttl, keyFn } = options;
  const cache = new Map<string, { value: ReturnType<F>; timestamp: number }>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getKey = keyFn ?? ((...args: any[]) => JSON.stringify(args));

  const memoized = function (this: unknown, ...args: Parameters<F>): ReturnType<F> {
    const key = getKey(...args);
    const entry = cache.get(key);

    if (entry !== undefined) {
      if (ttl !== undefined && Date.now() - entry.timestamp > ttl) {
        cache.delete(key);
      } else {
        return entry.value;
      }
    }

    const result = fn.apply(this, args) as ReturnType<F>;
    cache.set(key, { value: result, timestamp: Date.now() });

    if (maxSize !== undefined && cache.size > maxSize) {
      const oldest = cache.keys().next().value;
      if (oldest !== undefined) cache.delete(oldest);
    }

    return result;
  } as MemoizedFn<F>;

  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  memoized.delete = (key: string) => cache.delete(key);
  memoized.has = (...args: Parameters<F>) => {
    const key = getKey(...args);
    const entry = cache.get(key);
    if (entry === undefined) return false;
    if (ttl !== undefined && Date.now() - entry.timestamp > ttl) {
      cache.delete(key);
      return false;
    }
    return true;
  };

  return memoized;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function memoizeAsync<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  options: MemoizeOptions = {},
): MemoizedFn<F> {
  const pending = new Map<string, Promise<unknown>>();
  const { keyFn } = options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getKey = keyFn ?? ((...args: any[]) => JSON.stringify(args));

  const inner = memoize(function (this: unknown, ...args: Parameters<F>): ReturnType<F> {
    const key = getKey(...args);
    const existing = pending.get(key);
    if (existing) return existing as ReturnType<F>;

    const promise = fn.apply(this, args) as Promise<unknown>;
    pending.set(key, promise);

    promise.then(
      () => pending.delete(key),
      () => {
        pending.delete(key);
        inner.delete(key);
      },
    );

    return promise as ReturnType<F>;
  }, options);

  return inner;
}
