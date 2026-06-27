export class TimeoutError extends Error {
  constructor(message = "Operation timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

export function withTimeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(message)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err) => { clearTimeout(timer); reject(err); },
    );
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createAbortableTimeout(ms: number): { promise: Promise<void>; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout>;
  let rejectFn: (reason: unknown) => void;
  const promise = new Promise<void>((resolve, reject) => {
    rejectFn = reject;
    timer = setTimeout(resolve, ms);
  });
  return {
    promise,
    cancel: () => {
      clearTimeout(timer);
      rejectFn(new Error("Timeout cancelled"));
    },
  };
}

export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number,
  delayMs: number,
  timeoutMs?: number,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const p = fn();
      return timeoutMs ? await withTimeout(p, timeoutMs) : await p;
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await delay(delayMs);
    }
  }
  throw lastError;
}

export function isTimeoutError(err: unknown): err is TimeoutError {
  return err instanceof TimeoutError;
}
