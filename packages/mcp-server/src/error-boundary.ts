export function tryCatch<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export async function tryCatchAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export function tryCatchWith<T>(fn: () => T, onError: (err: unknown) => T): T {
  try {
    return fn();
  } catch (err) {
    return onError(err);
  }
}

export async function tryCatchAsyncWith<T>(
  fn: () => Promise<T>,
  onError: (err: unknown) => T | Promise<T>,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    return onError(err);
  }
}

export function ignoreErrors(fn: () => void): void {
  try { fn(); } catch {}
}

export async function ignoreErrorsAsync(fn: () => Promise<void>): Promise<void> {
  try { await fn(); } catch {}
}

export function wrapSafe<A extends unknown[], R>(
  fn: (...args: A) => R,
  fallback: R,
): (...args: A) => R {
  return (...args: A): R => {
    try {
      return fn(...args);
    } catch {
      return fallback;
    }
  };
}
