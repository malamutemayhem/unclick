export interface Disposable {
  dispose(): void;
}

export class DisposableStack {
  private stack: Disposable[] = [];
  private _disposed = false;

  get disposed(): boolean {
    return this._disposed;
  }

  use<T extends Disposable>(resource: T): T {
    if (this._disposed) throw new Error("Stack already disposed");
    this.stack.push(resource);
    return resource;
  }

  adopt<T>(value: T, onDispose: (value: T) => void): T {
    if (this._disposed) throw new Error("Stack already disposed");
    this.stack.push({ dispose: () => onDispose(value) });
    return value;
  }

  defer(fn: () => void): void {
    if (this._disposed) throw new Error("Stack already disposed");
    this.stack.push({ dispose: fn });
  }

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    const errors: unknown[] = [];
    while (this.stack.length > 0) {
      const resource = this.stack.pop()!;
      try {
        resource.dispose();
      } catch (err) {
        errors.push(err);
      }
    }
    if (errors.length === 1) throw errors[0];
    if (errors.length > 1) throw new AggregateDisposalError(errors);
  }

  get size(): number {
    return this.stack.length;
  }
}

export class AggregateDisposalError extends Error {
  readonly errors: unknown[];
  constructor(errors: unknown[]) {
    super(`Multiple disposal errors (${errors.length})`);
    this.name = "AggregateDisposalError";
    this.errors = errors;
  }
}

export function using<T extends Disposable, R>(resource: T, fn: (r: T) => R): R {
  try {
    return fn(resource);
  } finally {
    resource.dispose();
  }
}

export async function usingAsync<T extends Disposable, R>(resource: T, fn: (r: T) => Promise<R>): Promise<R> {
  try {
    return await fn(resource);
  } finally {
    resource.dispose();
  }
}

export class ManagedResource implements Disposable {
  private cleanups: (() => void)[] = [];
  private _disposed = false;

  get disposed(): boolean {
    return this._disposed;
  }

  onDispose(fn: () => void): void {
    if (this._disposed) {
      fn();
      return;
    }
    this.cleanups.push(fn);
  }

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    for (let i = this.cleanups.length - 1; i >= 0; i--) {
      this.cleanups[i]();
    }
    this.cleanups.length = 0;
  }
}
