export type Predicate<T> = (item: T) => boolean;

export function and<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return (item) => predicates.every((p) => p(item));
}

export function or<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return (item) => predicates.some((p) => p(item));
}

export function not<T>(predicate: Predicate<T>): Predicate<T> {
  return (item) => !predicate(item);
}

export function always<T>(): Predicate<T> {
  return () => true;
}

export function never<T>(): Predicate<T> {
  return () => false;
}

export function where<T, K extends keyof T>(key: K, expected: T[K]): Predicate<T> {
  return (item) => item[key] === expected;
}

export function whereIn<T, K extends keyof T>(key: K, values: T[K][]): Predicate<T> {
  const set = new Set(values);
  return (item) => set.has(item[key]);
}

export function matches<T>(partial: Partial<T>): Predicate<T> {
  const entries = Object.entries(partial) as Array<[keyof T, T[keyof T]]>;
  return (item) => entries.every(([key, value]) => item[key] === value);
}

export function pipe<T>(...predicates: Predicate<T>[]): (items: T[]) => T[] {
  const combined = and(...predicates);
  return (items) => items.filter(combined);
}
