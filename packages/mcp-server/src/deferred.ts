export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
  readonly settled: boolean;
}

export function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: any) => void;
  let settled = false;

  const promise = new Promise<T>((res, rej) => {
    resolve = (value: T) => { settled = true; res(value); };
    reject = (reason?: any) => { settled = true; rej(reason); };
  });

  return {
    promise,
    resolve,
    reject,
    get settled() { return settled; },
  };
}

export function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message ?? "Timeout")), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function settled<T>(promises: Promise<T>[]): Promise<Array<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: any }>> {
  return Promise.all(
    promises.map((p) =>
      p.then(
        (value) => ({ status: "fulfilled" as const, value }),
        (reason) => ({ status: "rejected" as const, reason })
      )
    )
  );
}
