export class Left<L> {
  readonly _tag = "Left" as const;
  constructor(readonly value: L) {}

  isLeft(): this is Left<L> { return true; }
  isRight(): boolean { return false; }

  map<R2>(_fn: (r: never) => R2): Either<L, R2> { return this as unknown as Either<L, R2>; }
  flatMap<R2>(_fn: (r: never) => Either<L, R2>): Either<L, R2> { return this as unknown as Either<L, R2>; }
  mapLeft<L2>(fn: (l: L) => L2): Either<L2, never> { return new Left(fn(this.value)); }

  fold<B>(onLeft: (l: L) => B, _onRight: (r: never) => B): B { return onLeft(this.value); }
  getOrElse<R>(fallback: R): R { return fallback; }
  getOrThrow(message?: string): never { throw new Error(message || "Called getOrThrow on Left"); }

  toJSON(): { _tag: "Left"; value: L } { return { _tag: "Left", value: this.value }; }
}

export class Right<R> {
  readonly _tag = "Right" as const;
  constructor(readonly value: R) {}

  isLeft(): boolean { return false; }
  isRight(): this is Right<R> { return true; }

  map<R2>(fn: (r: R) => R2): Either<never, R2> { return new Right(fn(this.value)); }
  flatMap<R2>(fn: (r: R) => Either<never, R2>): Either<never, R2> { return fn(this.value); }
  mapLeft<L2>(_fn: (l: never) => L2): Either<L2, R> { return this as unknown as Either<L2, R>; }

  fold<B>(_onLeft: (l: never) => B, onRight: (r: R) => B): B { return onRight(this.value); }
  getOrElse(_fallback: R): R { return this.value; }
  getOrThrow(): R { return this.value; }

  toJSON(): { _tag: "Right"; value: R } { return { _tag: "Right", value: this.value }; }
}

export type Either<L, R> = Left<L> | Right<R>;

export function left<L>(value: L): Left<L> { return new Left(value); }
export function right<R>(value: R): Right<R> { return new Right(value); }

export function tryCatch<R>(fn: () => R): Either<Error, R> {
  try {
    return right(fn());
  } catch (e) {
    return left(e instanceof Error ? e : new Error(String(e)));
  }
}

export function fromNullable<R>(value: R | null | undefined, leftValue?: string): Either<string, R> {
  return value == null ? left(leftValue || "Value is null or undefined") : right(value);
}

export function isLeft<L, R>(e: Either<L, R>): e is Left<L> { return e._tag === "Left"; }
export function isRight<L, R>(e: Either<L, R>): e is Right<R> { return e._tag === "Right"; }

export function sequence<L, R>(eithers: Either<L, R>[]): Either<L, R[]> {
  const results: R[] = [];
  for (const e of eithers) {
    if (isLeft(e)) return e as unknown as Either<L, R[]>;
    results.push((e as Right<R>).value);
  }
  return right(results);
}
