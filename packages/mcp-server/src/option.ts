export type Option<T> = Some<T> | None;

export class Some<T> {
  readonly tag = "some" as const;
  constructor(readonly value: T) {}

  isSome(): this is Some<T> { return true; }
  isNone(): this is None { return false; }

  map<U>(fn: (value: T) => U): Option<U> {
    return some(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_fallback: T): T {
    return this.value;
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : none();
  }

  match<U>(handlers: { some: (value: T) => U; none: () => U }): U {
    return handlers.some(this.value);
  }
}

export class None {
  readonly tag = "none" as const;

  isSome(): boolean { return false; }
  isNone(): this is None { return true; }

  map<U>(_fn: (value: never) => U): Option<U> {
    return this as unknown as Option<U>;
  }

  flatMap<U>(_fn: (value: never) => Option<U>): Option<U> {
    return this as unknown as Option<U>;
  }

  unwrap(): never {
    throw new Error("Called unwrap on None");
  }

  unwrapOr<T>(fallback: T): T {
    return fallback;
  }

  filter(_predicate: (value: never) => boolean): Option<never> {
    return this as Option<never>;
  }

  match<U>(handlers: { some: (value: never) => U; none: () => U }): U {
    return handlers.none();
  }
}

const NONE = new None();

export function some<T>(value: T): Option<T> {
  return new Some(value);
}

export function none<T = never>(): Option<T> {
  return NONE as Option<T>;
}

export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value === null || value === undefined ? none() : some(value);
}
