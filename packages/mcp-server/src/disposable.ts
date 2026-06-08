// Resource cleanup pattern.
// Tracks resources that need cleanup (timers, connections, subscriptions)
// and disposes them all at once on shutdown. Prevents memory leaks
// when the server restarts or a request ends.

export interface Disposable {
  dispose(): void;
}

export class DisposableStack {
  private resources: Disposable[] = [];
  private disposed = false;

  add<T extends Disposable>(resource: T): T {
    if (this.disposed) {
      resource.dispose();
      return resource;
    }
    this.resources.push(resource);
    return resource;
  }

  addCallback(fn: () => void): void {
    this.add({ dispose: fn });
  }

  addTimer(timer: ReturnType<typeof setTimeout>): void {
    this.add({ dispose: () => clearTimeout(timer) });
  }

  addInterval(interval: ReturnType<typeof setInterval>): void {
    this.add({ dispose: () => clearInterval(interval) });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;

    const errors: Error[] = [];
    for (const resource of this.resources.reverse()) {
      try {
        resource.dispose();
      } catch (err) {
        errors.push(err instanceof Error ? err : new Error(String(err)));
      }
    }
    this.resources = [];

    if (errors.length > 0) {
      throw new AggregateDisposalError(errors);
    }
  }

  get isDisposed(): boolean {
    return this.disposed;
  }

  get size(): number {
    return this.resources.length;
  }
}

export class AggregateDisposalError extends Error {
  readonly errors: Error[];

  constructor(errors: Error[]) {
    super(`${errors.length} error(s) during disposal: ${errors.map((e) => e.message).join("; ")}`);
    this.name = "AggregateDisposalError";
    this.errors = errors;
  }
}

// Helper: run a function with a disposable stack that auto-cleans on exit.
export async function withDisposables<T>(fn: (stack: DisposableStack) => Promise<T>): Promise<T> {
  const stack = new DisposableStack();
  try {
    return await fn(stack);
  } finally {
    stack.dispose();
  }
}
