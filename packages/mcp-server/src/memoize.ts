export function memoize<A extends unknown[], R>(
  fn: (...args: A) => R,
  opts: { maxSize?: number; ttlMs?: number; keyFn?: (...args: A) => string } = {},
): ((...args: A) => R) & { cache: Map<string, { value: R; expiresAt: number }> } {
  const cache = new Map<string, { value: R; expiresAt: number }>();
  const maxSize = opts.maxSize ?? 100;
  const ttlMs = opts.ttlMs ?? 0;
  const keyFn = opts.keyFn ?? ((...args: A) => JSON.stringify(args));

  const memoized = (...args: A): R => {
    const key = keyFn(...args);
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && (ttlMs === 0 || cached.expiresAt > now)) {
      cache.delete(key);
      cache.set(key, cached);
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, expiresAt: now + ttlMs });

    if (cache.size > maxSize) {
      const oldest = cache.keys().next().value!;
      cache.delete(oldest);
    }

    return result;
  };

  memoized.cache = cache;
  return memoized;
}

export function memoizeAsync<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  opts: { maxSize?: number; ttlMs?: number; keyFn?: (...args: A) => string } = {},
): ((...args: A) => Promise<R>) & { cache: Map<string, { value: Promise<R>; expiresAt: number }> } {
  const cache = new Map<string, { value: Promise<R>; expiresAt: number }>();
  const maxSize = opts.maxSize ?? 100;
  const ttlMs = opts.ttlMs ?? 0;
  const keyFn = opts.keyFn ?? ((...args: A) => JSON.stringify(args));

  const memoized = (...args: A): Promise<R> => {
    const key = keyFn(...args);
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && (ttlMs === 0 || cached.expiresAt > now)) {
      return cached.value;
    }

    const promise = fn(...args);
    cache.set(key, { value: promise, expiresAt: now + ttlMs });

    promise.catch(() => cache.delete(key));

    if (cache.size > maxSize) {
      const oldest = cache.keys().next().value!;
      cache.delete(oldest);
    }

    return promise;
  };

  memoized.cache = cache;
  return memoized;
}
