export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
  readonly settled: boolean;
}

export function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  let settled = false;

  const promise = new Promise<T>((res, rej) => {
    resolve = (value) => { settled = true; res(value); };
    reject = (reason) => { settled = true; rej(reason); };
  });

  return {
    promise,
    resolve,
    reject,
    get settled() { return settled; },
  };
}

export function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(message || `Timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function settling<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]> {
  return Promise.all(
    promises.map((p) =>
      p.then(
        (value) => ({ status: "fulfilled" as const, value }),
        (reason) => ({ status: "rejected" as const, reason })
      )
    )
  );
}

export type SettledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: unknown };

export async function props<T extends Record<string, Promise<unknown>>>(
  obj: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  const keys = Object.keys(obj) as (keyof T)[];
  const values = await Promise.all(keys.map((k) => obj[k]));
  const result = {} as { [K in keyof T]: Awaited<T[K]> };
  keys.forEach((k, i) => {
    (result as any)[k] = values[i];
  });
  return result;
}

export async function retry<T>(fn: () => Promise<T>, attempts: number, delayMs = 0): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      if (delayMs > 0) await delay(delayMs);
    }
  }
  throw new Error("Unreachable");
}
