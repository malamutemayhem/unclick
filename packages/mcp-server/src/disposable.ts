export interface IDisposable {
  dispose(): void;
}

export class DisposableStack {
  private stack: IDisposable[] = [];
  private disposed = false;

  use<T extends IDisposable>(resource: T): T {
    if (this.disposed) throw new Error("Stack already disposed");
    this.stack.push(resource);
    return resource;
  }

  adopt<T>(value: T, onDispose: (value: T) => void): T {
    this.use({ dispose: () => onDispose(value) });
    return value;
  }

  defer(fn: () => void): void {
    this.use({ dispose: fn });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    while (this.stack.length > 0) {
      const resource = this.stack.pop()!;
      try { resource.dispose(); } catch {}
    }
  }

  get isDisposed(): boolean {
    return this.disposed;
  }

  get size(): number {
    return this.stack.length;
  }
}

export function using<T extends IDisposable, R>(resource: T, fn: (r: T) => R): R {
  try {
    return fn(resource);
  } finally {
    resource.dispose();
  }
}

export async function usingAsync<T extends IDisposable, R>(resource: T, fn: (r: T) => Promise<R>): Promise<R> {
  try {
    return await fn(resource);
  } finally {
    resource.dispose();
  }
}
