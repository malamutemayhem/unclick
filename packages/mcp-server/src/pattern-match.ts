type Pattern<T, R> = [(value: T) => boolean, (value: T) => R];

export function match<T, R>(value: T, patterns: Pattern<T, R>[], fallback?: (value: T) => R): R {
  for (const [predicate, handler] of patterns) {
    if (predicate(value)) return handler(value);
  }
  if (fallback) return fallback(value);
  throw new Error("No matching pattern");
}

export function when<T>(predicate: (value: T) => boolean): (value: T) => boolean {
  return predicate;
}

export function is<T>(expected: T): (value: T) => boolean {
  return (value: T) => value === expected;
}

export function isIn<T>(...values: T[]): (value: T) => boolean {
  return (value: T) => values.includes(value);
}

export function isType(type: string): (value: unknown) => boolean {
  return (value: unknown) => typeof value === type;
}

export function isInstance<T>(ctor: new (...args: any[]) => T): (value: unknown) => boolean {
  return (value: unknown) => value instanceof ctor;
}

export function not<T>(pred: (value: T) => boolean): (value: T) => boolean {
  return (value: T) => !pred(value);
}

export function and<T>(...preds: Array<(value: T) => boolean>): (value: T) => boolean {
  return (value: T) => preds.every((p: (v: T) => boolean) => p(value));
}

export function or<T>(...preds: Array<(value: T) => boolean>): (value: T) => boolean {
  return (value: T) => preds.some((p: (v: T) => boolean) => p(value));
}

export function always<T>(): (value: T) => boolean {
  return () => true;
}
