export function pipe<A, B>(a: A, ab: (a: A) => B): B;
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
export function pipe(initial: any, ...fns: Array<(v: any) => any>): any {
  return fns.reduce((acc, fn) => fn(acc), initial);
}

export function compose<A, B>(ab: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D;
export function compose(...fns: Array<(v: any) => any>): (v: any) => any {
  return (v: any) => fns.reduceRight((acc, fn) => fn(acc), v);
}

export function tap<T>(fn: (v: T) => void): (v: T) => T {
  return (v: T) => { fn(v); return v; };
}

export function when<T>(predicate: (v: T) => boolean, fn: (v: T) => T): (v: T) => T {
  return (v: T) => predicate(v) ? fn(v) : v;
}

export function unless<T>(predicate: (v: T) => boolean, fn: (v: T) => T): (v: T) => T {
  return (v: T) => predicate(v) ? v : fn(v);
}
