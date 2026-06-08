export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
  isSettled: boolean;
}

export function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  let isSettled = false;

  const promise = new Promise<T>((res, rej) => {
    resolve = (value: T) => {
      if (isSettled) return;
      isSettled = true;
      res(value);
    };
    reject = (reason?: unknown) => {
      if (isSettled) return;
      isSettled = true;
      rej(reason);
    };
  });

  return {
    promise,
    resolve,
    reject,
    get isSettled() { return isSettled; },
  };
}

export function withTimeout<T>(deferred: Deferred<T>, ms: number, message = "Timed out"): Deferred<T> {
  const timer = setTimeout(() => deferred.reject(new Error(message)), ms);
  deferred.promise.then(
    () => clearTimeout(timer),
    () => clearTimeout(timer),
  );
  return deferred;
}
