// Named timeout management.
// Centralizes timeout tracking so you can set, check, and cancel
// timeouts by name instead of juggling raw timer IDs everywhere.

export class TimeoutManager {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly defaults: Record<string, number>;

  constructor(defaults: Record<string, number> = {}) {
    this.defaults = defaults;
  }

  set(name: string, callback: () => void, ms?: number): void {
    this.clear(name);
    const timeout = ms ?? this.defaults[name];
    if (timeout === undefined || timeout <= 0) return;
    this.timers.set(name, setTimeout(() => {
      this.timers.delete(name);
      callback();
    }, timeout));
  }

  clear(name: string): void {
    const timer = this.timers.get(name);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(name);
    }
  }

  clearAll(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  has(name: string): boolean {
    return this.timers.has(name);
  }

  get activeCount(): number {
    return this.timers.size;
  }

  get activeNames(): string[] {
    return [...this.timers.keys()];
  }
}

// Run a promise with a timeout. Rejects with TimeoutError if it takes too long.
export async function withTimeout<T>(promise: Promise<T>, ms: number, label?: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new TimeoutError(label ?? "Operation", ms));
    }, ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

export class TimeoutError extends Error {
  readonly timeoutMs: number;

  constructor(operation: string, ms: number) {
    super(`${operation} timed out after ${ms}ms`);
    this.name = "TimeoutError";
    this.timeoutMs = ms;
  }
}
