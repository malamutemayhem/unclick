export interface RetryItem<T> {
  data: T;
  attempts: number;
  nextRetryAt: number;
  lastError?: string;
}

export class RetryQueue<T> {
  private items: RetryItem<T>[] = [];
  private maxAttempts: number;
  private baseDelayMs: number;
  private maxDelayMs: number;

  constructor(opts: { maxAttempts?: number; baseDelayMs?: number; maxDelayMs?: number } = {}) {
    this.maxAttempts = opts.maxAttempts ?? 5;
    this.baseDelayMs = opts.baseDelayMs ?? 1000;
    this.maxDelayMs = opts.maxDelayMs ?? 60000;
  }

  enqueue(data: T): void {
    this.items.push({ data, attempts: 0, nextRetryAt: Date.now() });
  }

  recordFailure(index: number, error?: string): boolean {
    const item = this.items[index];
    if (!item) return false;
    item.attempts++;
    item.lastError = error;
    if (item.attempts >= this.maxAttempts) {
      this.items.splice(index, 1);
      return false;
    }
    const delay = Math.min(this.baseDelayMs * Math.pow(2, item.attempts - 1), this.maxDelayMs);
    item.nextRetryAt = Date.now() + delay;
    return true;
  }

  recordSuccess(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  getReady(now = Date.now()): Array<{ index: number; item: RetryItem<T> }> {
    return this.items
      .map((item, index) => ({ index, item }))
      .filter(({ item }) => item.nextRetryAt <= now);
  }

  get size(): number {
    return this.items.length;
  }

  get pending(): number {
    const now = Date.now();
    return this.items.filter((i) => i.nextRetryAt > now).length;
  }

  clear(): void {
    this.items = [];
  }
}
