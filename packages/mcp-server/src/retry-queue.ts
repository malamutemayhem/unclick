export interface QueueItem<T = unknown> {
  id: string;
  payload: T;
  attempts: number;
  maxAttempts: number;
  nextAttemptAt: number;
  createdAt: number;
  lastError?: string;
}

export class RetryQueue<T = unknown> {
  private items = new Map<string, QueueItem<T>>();
  private deadLetter: QueueItem<T>[] = [];
  private counter = 0;
  private maxAttempts: number;
  private baseDelayMs: number;

  constructor(maxAttempts = 3, baseDelayMs = 1000) {
    this.maxAttempts = maxAttempts;
    this.baseDelayMs = baseDelayMs;
  }

  enqueue(payload: T, maxAttempts?: number): string {
    const id = `rq_${++this.counter}`;
    this.items.set(id, {
      id, payload, attempts: 0,
      maxAttempts: maxAttempts ?? this.maxAttempts,
      nextAttemptAt: Date.now(),
      createdAt: Date.now(),
    });
    return id;
  }

  dequeue(now = Date.now()): QueueItem<T> | undefined {
    for (const item of this.items.values()) {
      if (item.nextAttemptAt <= now) return item;
    }
    return undefined;
  }

  ack(id: string): boolean {
    return this.items.delete(id);
  }

  nack(id: string, error?: string): boolean {
    const item = this.items.get(id);
    if (!item) return false;
    item.attempts++;
    item.lastError = error;
    if (item.attempts >= item.maxAttempts) {
      this.deadLetter.push(item);
      this.items.delete(id);
    } else {
      item.nextAttemptAt = Date.now() + this.baseDelayMs * Math.pow(2, item.attempts);
    }
    return true;
  }

  getDeadLetter(): QueueItem<T>[] {
    return [...this.deadLetter];
  }

  retry(id: string): boolean {
    const idx = this.deadLetter.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    const item = this.deadLetter.splice(idx, 1)[0];
    item.attempts = 0;
    item.nextAttemptAt = Date.now();
    this.items.set(item.id, item);
    return true;
  }

  get size(): number {
    return this.items.size;
  }

  get deadLetterSize(): number {
    return this.deadLetter.length;
  }

  pending(now = Date.now()): number {
    let count = 0;
    for (const item of this.items.values()) {
      if (item.nextAttemptAt <= now) count++;
    }
    return count;
  }

  clear(): void {
    this.items.clear();
    this.deadLetter = [];
  }
}
