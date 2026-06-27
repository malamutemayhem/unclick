export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Operation timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

export function race<T>(promises: Promise<T>[], ms: number): Promise<T> {
  return withTimeout(Promise.race(promises), ms);
}

export async function firstSettled<T>(
  promises: Promise<T>[]
): Promise<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown }> {
  return new Promise((resolve) => {
    for (const p of promises) {
      p.then(
        (value) => resolve({ status: "fulfilled", value }),
        (reason) => resolve({ status: "rejected", reason })
      );
    }
  });
}

export function delay<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value as T), ms));
}

export function deadline(ms: number): { promise: Promise<never>; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout>;
  const promise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
  });
  return { promise, cancel: () => clearTimeout(timer!) };
}
