export class CancellationToken {
  private cancelled = false;
  private listeners: Array<() => void> = [];
  private reason?: string;

  cancel(reason?: string): void {
    if (this.cancelled) return;
    this.cancelled = true;
    this.reason = reason;
    for (const fn of this.listeners) {
      try { fn(); } catch {}
    }
    this.listeners = [];
  }

  get isCancelled(): boolean {
    return this.cancelled;
  }

  get cancellationReason(): string | undefined {
    return this.reason;
  }

  throwIfCancelled(): void {
    if (this.cancelled) {
      throw new CancellationError(this.reason);
    }
  }

  onCancel(fn: () => void): () => void {
    if (this.cancelled) {
      fn();
      return () => {};
    }
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  toAbortSignal(): AbortSignal {
    const controller = new AbortController();
    if (this.cancelled) {
      controller.abort(this.reason);
    } else {
      this.onCancel(() => controller.abort(this.reason));
    }
    return controller.signal;
  }
}

export class CancellationError extends Error {
  constructor(reason?: string) {
    super(reason ?? "Operation cancelled");
    this.name = "CancellationError";
  }
}

export function linked(...tokens: CancellationToken[]): CancellationToken {
  const child = new CancellationToken();
  for (const t of tokens) {
    if (t.isCancelled) {
      child.cancel(t.cancellationReason);
      return child;
    }
    t.onCancel(() => child.cancel(t.cancellationReason));
  }
  return child;
}
