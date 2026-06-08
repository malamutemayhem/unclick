// Result type for explicit error handling without try/catch.
// Forces callers to handle both success and failure paths instead of
// letting errors propagate silently through Promise chains.

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function fromThrowable<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn());
  } catch (e) {
    return err(e instanceof Error ? e : new Error(String(e)));
  }
}

export async function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  try {
    return ok(await promise);
  } catch (e) {
    return err(e instanceof Error ? e : new Error(String(e)));
  }
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;
  throw result.error;
}

export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  if (!result.ok) return result;
  return ok(fn(result.value));
}

export function mapError<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
  if (result.ok) return result;
  return err(fn(result.error));
}

export function flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
  if (!result.ok) return result;
  return fn(result.value);
}

export function collect<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  for (const r of results) {
    if (!r.ok) return r;
    values.push(r.value);
  }
  return ok(values);
}

export function partition<T, E>(results: Result<T, E>[]): { successes: T[]; errors: E[] } {
  const successes: T[] = [];
  const errors: E[] = [];
  for (const r of results) {
    if (r.ok) successes.push(r.value);
    else errors.push(r.error);
  }
  return { successes, errors };
}
