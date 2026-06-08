export type Result<T, E = Error> = Ok<T> | Err<E>;

export class Ok<T> {
  readonly ok = true;
  readonly value: T;
  constructor(value: T) { this.value = value; }
  isOk(): this is Ok<T> { return true; }
  isErr(): this is Err<never> { return false; }
  map<U>(fn: (v: T) => U): Result<U, never> { return new Ok(fn(this.value)); }
  mapErr<F>(_fn: (e: never) => F): Result<T, F> { return this as unknown as Result<T, F>; }
  unwrap(): T { return this.value; }
  unwrapOr(_fallback: T): T { return this.value; }
  unwrapErr(): never { throw new Error("Called unwrapErr on Ok"); }
  andThen<U, E>(fn: (v: T) => Result<U, E>): Result<U, E> { return fn(this.value); }
}

export class Err<E> {
  readonly ok = false;
  readonly error: E;
  constructor(error: E) { this.error = error; }
  isOk(): this is Ok<never> { return false; }
  isErr(): this is Err<E> { return true; }
  map<U>(_fn: (v: never) => U): Result<U, E> { return this as unknown as Result<U, E>; }
  mapErr<F>(fn: (e: E) => F): Result<never, F> { return new Err(fn(this.error)); }
  unwrap(): never { throw this.error instanceof Error ? this.error : new Error(String(this.error)); }
  unwrapOr<T>(fallback: T): T { return fallback; }
  unwrapErr(): E { return this.error; }
  andThen<U>(_fn: (v: never) => Result<U, E>): Result<U, E> { return this as unknown as Result<U, E>; }
}

export function ok<T>(value: T): Ok<T> { return new Ok(value); }
export function err<E>(error: E): Err<E> { return new Err(error); }

export function tryCatch<T>(fn: () => T): Result<T, Error> {
  try { return ok(fn()); } catch (e) { return err(e instanceof Error ? e : new Error(String(e))); }
}

export async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
  try { return ok(await fn()); } catch (e) { return err(e instanceof Error ? e : new Error(String(e))); }
}
