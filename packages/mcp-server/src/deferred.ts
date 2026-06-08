export class Deferred<T> {
  readonly promise: Promise<T>;
  private _resolve!: (value: T) => void;
  private _reject!: (reason: unknown) => void;
  private _settled = false;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value: T): void {
    if (!this._settled) {
      this._settled = true;
      this._resolve(value);
    }
  }

  reject(reason: unknown): void {
    if (!this._settled) {
      this._settled = true;
      this._reject(reason);
    }
  }

  get isSettled(): boolean {
    return this._settled;
  }
}

export function deferred<T>(): Deferred<T> {
  return new Deferred<T>();
}

export function timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message ?? `Timed out after ${ms}ms`)), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
