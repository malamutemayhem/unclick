export function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message ?? `Timed out after ${ms}ms`)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, attempts: number, delayMs: number = 0): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (err) {
      lastError = err;
      if (i < attempts - 1 && delayMs > 0) await delay(delayMs);
    }
  }
  throw lastError;
}

export interface SettledResult<T> {
  status: "fulfilled" | "rejected";
  value?: T;
  reason?: unknown;
}

export async function allSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]> {
  return Promise.all(promises.map(async (p) => {
    try {
      const value = await p;
      return { status: "fulfilled" as const, value };
    } catch (reason) {
      return { status: "rejected" as const, reason };
    }
  }));
}

export async function first<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    let errors = 0;
    for (const p of promises) {
      p.then((val) => {
        if (!settled) { settled = true; resolve(val); }
      }).catch(() => {
        errors++;
        if (errors === promises.length) reject(new Error("All promises rejected"));
      });
    }
  });
}

export function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void; reject: (reason?: unknown) => void } {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
