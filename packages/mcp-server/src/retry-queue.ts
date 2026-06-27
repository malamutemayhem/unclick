export interface RetryQueueOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay?: number;
  backoff?: "exponential" | "linear" | "fixed";
}

interface QueueItem<T> {
  data: T;
  attempts: number;
  nextAttempt: number;
  firstAttempt: number;
  lastError?: string;
}

export class RetryQueue<T> {
  private active: QueueItem<T>[] = [];
  private deadLetters: QueueItem<T>[] = [];
  private readonly options: Required<RetryQueueOptions>;
  private processed = 0;

  constructor(options: RetryQueueOptions) {
    this.options = {
      maxRetries: options.maxRetries,
      baseDelay: options.baseDelay,
      maxDelay: options.maxDelay ?? 60_000,
      backoff: options.backoff ?? "exponential",
    };
  }

  enqueue(data: T): void {
    this.active.push({
      data,
      attempts: 0,
      nextAttempt: Date.now(),
      firstAttempt: Date.now(),
    });
  }

  async process(handler: (data: T) => Promise<void>, now?: number): Promise<{ succeeded: number; failed: number; retried: number }> {
    const timestamp = now ?? Date.now();
    const ready = this.active.filter((item) => item.nextAttempt <= timestamp);
    let succeeded = 0;
    let failed = 0;
    let retried = 0;

    for (const item of ready) {
      try {
        await handler(item.data);
        succeeded++;
        this.processed++;
        this.active = this.active.filter((i) => i !== item);
      } catch (err) {
        item.attempts++;
        item.lastError = err instanceof Error ? err.message : String(err);
        if (item.attempts >= this.options.maxRetries) {
          failed++;
          this.deadLetters.push(item);
          this.active = this.active.filter((i) => i !== item);
        } else {
          retried++;
          item.nextAttempt = timestamp + this.calculateDelay(item.attempts);
        }
      }
    }

    return { succeeded, failed, retried };
  }

  getDeadLetters(): T[] {
    return this.deadLetters.map((item) => item.data);
  }

  requeue(index: number): boolean {
    if (index < 0 || index >= this.deadLetters.length) return false;
    const item = this.deadLetters.splice(index, 1)[0];
    item.attempts = 0;
    item.nextAttempt = Date.now();
    this.active.push(item);
    return true;
  }

  requeueAll(): number {
    const count = this.deadLetters.length;
    for (const item of this.deadLetters) {
      item.attempts = 0;
      item.nextAttempt = Date.now();
      this.active.push(item);
    }
    this.deadLetters = [];
    return count;
  }

  get pendingCount(): number {
    return this.active.length;
  }

  get deadLetterCount(): number {
    return this.deadLetters.length;
  }

  get processedCount(): number {
    return this.processed;
  }

  clear(): void {
    this.active = [];
    this.deadLetters = [];
  }

  private calculateDelay(attempt: number): number {
    let delay: number;
    switch (this.options.backoff) {
      case "exponential":
        delay = this.options.baseDelay * Math.pow(2, attempt - 1);
        break;
      case "linear":
        delay = this.options.baseDelay * attempt;
        break;
      case "fixed":
        delay = this.options.baseDelay;
        break;
    }
    return Math.min(delay, this.options.maxDelay);
  }
}
