type AnyFn = (arg: any) => any;

export function pipe<A, B>(a: A, fn1: (a: A) => B): B;
export function pipe<A, B, C>(a: A, fn1: (a: A) => B, fn2: (b: B) => C): C;
export function pipe<A, B, C, D>(a: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): D;
export function pipe<A, B, C, D, E>(a: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): E;
export function pipe(initial: unknown, ...fns: AnyFn[]): unknown {
  return fns.reduce((acc: unknown, fn: AnyFn) => fn(acc), initial);
}

export function compose<A, B>(fn1: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(fn1: (b: B) => C, fn2: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(fn1: (c: C) => D, fn2: (b: B) => C, fn3: (a: A) => B): (a: A) => D;
export function compose(...fns: AnyFn[]): AnyFn {
  return (arg: unknown) => fns.reduceRight((acc: unknown, fn: AnyFn) => fn(acc), arg);
}

export function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T): T => { fn(value); return value; };
}

export function identity<T>(value: T): T { return value; }

export function constant<T>(value: T): () => T { return () => value; }

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
