export function memo<T extends (...args: any[]) => any>(
  fn: T,
  options?: { maxSize?: number; keyFn?: (...args: any[]) => string }
): T & { clear: () => void; size: number } {
  const cache = new Map<string, ReturnType<T>>();
  const maxSize = options?.maxSize ?? 1000;
  const keyFn = options?.keyFn ?? ((...args: any[]) => JSON.stringify(args));

  const memoized = function (this: any, ...args: any[]) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn.apply(this, args);
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }
    cache.set(key, result);
    return result;
  } as T & { clear: () => void; size: number };

  Object.defineProperty(memoized, "size", { get: () => cache.size });
  memoized.clear = () => cache.clear();
  return memoized;
}

export function memoAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: { maxSize?: number; keyFn?: (...args: any[]) => string }
): T & { clear: () => void; size: number } {
  const cache = new Map<string, Promise<any>>();
  const maxSize = options?.maxSize ?? 1000;
  const keyFn = options?.keyFn ?? ((...args: any[]) => JSON.stringify(args));

  const memoized = function (this: any, ...args: any[]) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key)!;
    const promise = fn.apply(this, args);
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }
    cache.set(key, promise);
    promise.catch(() => cache.delete(key));
    return promise;
  } as T & { clear: () => void; size: number };

  Object.defineProperty(memoized, "size", { get: () => cache.size });
  memoized.clear = () => cache.clear();
  return memoized;
}
