type Fn<A, B> = (a: A) => B;

export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, fn1: Fn<A, B>): B;
export function pipe<A, B, C>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>): C;
export function pipe<A, B, C, D>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>): D;
export function pipe<A, B, C, D, E>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>): E;
export function pipe(value: unknown, ...fns: Array<(a: unknown) => unknown>): unknown {
  return fns.reduce((acc: unknown, fn: (a: unknown) => unknown) => fn(acc), value);
}

export function compose<A>(): (a: A) => A;
export function compose<A, B>(fn1: Fn<A, B>): Fn<A, B>;
export function compose<A, B, C>(fn2: Fn<B, C>, fn1: Fn<A, B>): Fn<A, C>;
export function compose<A, B, C, D>(fn3: Fn<C, D>, fn2: Fn<B, C>, fn1: Fn<A, B>): Fn<A, D>;
export function compose(...fns: Array<(a: unknown) => unknown>): (a: unknown) => unknown {
  if (fns.length === 0) return (a: unknown) => a;
  return (value: unknown) => fns.reduceRight((acc: unknown, fn: (a: unknown) => unknown) => fn(acc), value);
}

export function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => { fn(value); return value; };
}

export function when<T>(predicate: (value: T) => boolean, fn: (value: T) => T): (value: T) => T {
  return (value: T) => predicate(value) ? fn(value) : value;
}

export function unless<T>(predicate: (value: T) => boolean, fn: (value: T) => T): (value: T) => T {
  return (value: T) => predicate(value) ? value : fn(value);
}
