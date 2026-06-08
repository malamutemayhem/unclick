type Fn<A = unknown, B = unknown> = (input: A) => B;

export function pipe<A, B>(a: Fn<A, B>): Fn<A, B>;
export function pipe<A, B, C>(a: Fn<A, B>, b: Fn<B, C>): Fn<A, C>;
export function pipe<A, B, C, D>(a: Fn<A, B>, b: Fn<B, C>, c: Fn<C, D>): Fn<A, D>;
export function pipe<A, B, C, D, E>(a: Fn<A, B>, b: Fn<B, C>, c: Fn<C, D>, d: Fn<D, E>): Fn<A, E>;
export function pipe(...fns: Fn[]): Fn {
  return (input: unknown) => fns.reduce((acc, fn) => fn(acc), input);
}

export function compose<A, B>(a: Fn<A, B>): Fn<A, B>;
export function compose<A, B, C>(b: Fn<B, C>, a: Fn<A, B>): Fn<A, C>;
export function compose<A, B, C, D>(c: Fn<C, D>, b: Fn<B, C>, a: Fn<A, B>): Fn<A, D>;
export function compose(...fns: Fn[]): Fn {
  return (input: unknown) => fns.reduceRight((acc, fn) => fn(acc), input);
}

export function tap<T>(fn: (value: T) => void): Fn<T, T> {
  return (value: T) => {
    fn(value);
    return value;
  };
}

export function identity<T>(value: T): T {
  return value;
}

export function constant<T>(value: T): () => T {
  return () => value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function pipeAsync(
  value: unknown,
  ...fns: Array<(input: any) => any>
): Promise<unknown> {
  let result: unknown = value;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}

export function when<T>(
  predicate: (value: T) => boolean,
  transform: Fn<T, T>
): Fn<T, T> {
  return (value: T) => (predicate(value) ? transform(value) : value);
}
