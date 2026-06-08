export interface AggregatedEvent<T> {
  events: T[];
  count: number;
  firstAt: number;
  lastAt: number;
}

export class EventAggregator<T> {
  private buffer: Array<{ event: T; timestamp: number }> = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private flushFn: (batch: AggregatedEvent<T>) => void;
  private maxSize: number;
  private maxWaitMs: number;

  constructor(opts: {
    flush: (batch: AggregatedEvent<T>) => void;
    maxSize?: number;
    maxWaitMs?: number;
  }) {
    this.flushFn = opts.flush;
    this.maxSize = opts.maxSize ?? 100;
    this.maxWaitMs = opts.maxWaitMs ?? 1000;
  }

  push(event: T): void {
    this.buffer.push({ event, timestamp: Date.now() });
    if (this.buffer.length >= this.maxSize) {
      this.flush();
      return;
    }
    if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.maxWaitMs);
    }
  }

  flush(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.buffer.length === 0) return;
    const items = this.buffer;
    this.buffer = [];
    this.flushFn({
      events: items.map((i) => i.event),
      count: items.length,
      firstAt: items[0].timestamp,
      lastAt: items[items.length - 1].timestamp,
    });
  }

  get pending(): number {
    return this.buffer.length;
  }

  dispose(): void {
    this.flush();
  }
}
