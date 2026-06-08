export type BackpressureStrategy = "drop" | "buffer" | "block";

export interface BackpressureConfig {
  highWatermark: number;
  lowWatermark: number;
  strategy: BackpressureStrategy;
  maxBufferSize?: number;
}

export class BackpressureController<T> {
  private buffer: T[] = [];
  private config: BackpressureConfig;
  private paused: boolean = false;
  private processed: number = 0;
  private dropped: number = 0;

  constructor(config: BackpressureConfig) {
    this.config = config;
  }

  push(item: T): boolean {
    if (this.buffer.length >= this.config.highWatermark) {
      this.paused = true;
      if (this.config.strategy === "drop") {
        this.dropped++;
        return false;
      }
      if (this.config.strategy === "buffer") {
        const maxBuf = this.config.maxBufferSize ?? Infinity;
        if (this.buffer.length >= maxBuf) {
          this.dropped++;
          return false;
        }
      }
    }
    this.buffer.push(item);
    return true;
  }

  pull(): T | undefined {
    const item = this.buffer.shift();
    if (item !== undefined) this.processed++;
    if (this.buffer.length <= this.config.lowWatermark) {
      this.paused = false;
    }
    return item;
  }

  pullBatch(count: number): T[] {
    const batch: T[] = [];
    for (let i = 0; i < count; i++) {
      const item = this.pull();
      if (item === undefined) break;
      batch.push(item);
    }
    return batch;
  }

  isPaused(): boolean {
    return this.paused;
  }

  bufferSize(): number {
    return this.buffer.length;
  }

  pressure(): number {
    if (this.config.highWatermark === 0) return 0;
    return Math.min(1, this.buffer.length / this.config.highWatermark);
  }

  stats(): { buffered: number; processed: number; dropped: number; paused: boolean } {
    return {
      buffered: this.buffer.length,
      processed: this.processed,
      dropped: this.dropped,
      paused: this.paused,
    };
  }

  clear(): void {
    this.buffer = [];
    this.paused = false;
  }

  drain(): T[] {
    const items = [...this.buffer];
    this.processed += items.length;
    this.buffer = [];
    this.paused = false;
    return items;
  }
}
