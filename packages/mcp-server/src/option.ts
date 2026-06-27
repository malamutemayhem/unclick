export type Option<T> = Some<T> | None;

export class Some<T> {
  readonly _tag = "Some" as const;
  constructor(readonly value: T) {}

  isSome(): this is Some<T> { return true; }
  isNone(): this is None { return false; }

  map<U>(fn: (value: T) => U): Option<U> {
    return some(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  getOrElse(_defaultValue: T): T {
    return this.value;
  }

  orElse(_alternative: () => Option<T>): Option<T> {
    return this;
  }

  match<U>(handlers: { some: (value: T) => U; none: () => U }): U {
    return handlers.some(this.value);
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : none();
  }

  unwrap(): T {
    return this.value;
  }
}

export class None {
  readonly _tag = "None" as const;

  isSome(): false { return false; }
  isNone(): this is None { return true; }

  map<U>(_fn: (value: never) => U): Option<U> {
    return this as unknown as Option<U>;
  }

  flatMap<U>(_fn: (value: never) => Option<U>): Option<U> {
    return this as unknown as Option<U>;
  }

  getOrElse<T>(defaultValue: T): T {
    return defaultValue;
  }

  orElse<T>(alternative: () => Option<T>): Option<T> {
    return alternative();
  }

  match<U>(handlers: { some: (value: never) => U; none: () => U }): U {
    return handlers.none();
  }

  filter(_predicate: (value: never) => boolean): Option<never> {
    return this as Option<never>;
  }

  unwrap(): never {
    throw new Error("Cannot unwrap None");
  }
}

const NONE = new None();

export function some<T>(value: T): Option<T> {
  return new Some(value);
}

export function none(): None {
  return NONE;
}

export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value === null || value === undefined ? none() : some(value);
}

export function tryCatch<T>(fn: () => T): Option<T> {
  try {
    return some(fn());
  } catch {
    return none();
  }
}
