export class Option<T> {
  private readonly value: T | null;

  private constructor(value: T | null) {
    this.value = value;
  }

  static some<T>(value: T): Option<T> {
    return new Option(value);
  }

  static none<T>(): Option<T> {
    return new Option<T>(null);
  }

  static from<T>(value: T | null | undefined): Option<T> {
    return value === null || value === undefined ? Option.none() : Option.some(value);
  }

  isSome(): boolean {
    return this.value !== null;
  }

  isNone(): boolean {
    return this.value === null;
  }

  unwrap(): T {
    if (this.value === null) throw new Error("Called unwrap on None");
    return this.value;
  }

  unwrapOr(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue;
  }

  map<U>(fn: (value: T) => U): Option<U> {
    return this.value !== null ? Option.some(fn(this.value)) : Option.none();
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return this.value !== null ? fn(this.value) : Option.none();
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (this.value !== null && predicate(this.value)) return this;
    return Option.none();
  }

  match<U>(handlers: { some: (value: T) => U; none: () => U }): U {
    return this.value !== null ? handlers.some(this.value) : handlers.none();
  }

  toArray(): T[] {
    return this.value !== null ? [this.value] : [];
  }
}
