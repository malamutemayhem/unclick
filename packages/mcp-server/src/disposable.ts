export interface Disposable {
  dispose(): void;
}

export class DisposableStack {
  private resources: Disposable[] = [];
  private disposed = false;

  use<T extends Disposable>(resource: T): T {
    if (this.disposed) throw new Error("Stack already disposed");
    this.resources.push(resource);
    return resource;
  }

  defer(fn: () => void): void {
    this.use({ dispose: fn });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    const errors: Error[] = [];
    while (this.resources.length > 0) {
      const resource = this.resources.pop()!;
      try {
        resource.dispose();
      } catch (e) {
        errors.push(e instanceof Error ? e : new Error(String(e)));
      }
    }
    if (errors.length === 1) throw errors[0];
    if (errors.length > 1) throw new AggregateError(errors, "Multiple dispose errors");
  }

  get isDisposed(): boolean {
    return this.disposed;
  }

  get size(): number {
    return this.resources.length;
  }
}

export function using<T extends Disposable, R>(resource: T, fn: (r: T) => R): R {
  try {
    return fn(resource);
  } finally {
    resource.dispose();
  }
}
