export type Option<T> = { some: true; value: T } | { some: false };

export function some<T>(value: T): Option<T> {
  return { some: true, value };
}

export function none<T = never>(): Option<T> {
  return { some: false };
}

export function isSome<T>(opt: Option<T>): opt is { some: true; value: T } {
  return opt.some;
}

export function isNone<T>(opt: Option<T>): opt is { some: false } {
  return !opt.some;
}

export function unwrapOption<T>(opt: Option<T>): T {
  if (opt.some) return opt.value;
  throw new Error("Unwrap called on None");
}

export function unwrapOptionOr<T>(opt: Option<T>, fallback: T): T {
  return opt.some ? opt.value : fallback;
}

export function mapOption<T, U>(opt: Option<T>, fn: (value: T) => U): Option<U> {
  return opt.some ? some(fn(opt.value)) : none();
}

export function flatMapOption<T, U>(opt: Option<T>, fn: (value: T) => Option<U>): Option<U> {
  return opt.some ? fn(opt.value) : none();
}

export function filterOption<T>(opt: Option<T>, pred: (value: T) => boolean): Option<T> {
  return opt.some && pred(opt.value) ? opt : none();
}

export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value != null ? some(value) : none();
}

export function toNullable<T>(opt: Option<T>): T | null {
  return opt.some ? opt.value : null;
}
