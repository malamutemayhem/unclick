export class IntervalTracker {
  private timestamps: number[] = [];
  private maxSamples: number;

  constructor(maxSamples = 100) {
    this.maxSamples = maxSamples;
  }

  record(now = Date.now()): void {
    this.timestamps.push(now);
    if (this.timestamps.length > this.maxSamples) {
      this.timestamps.shift();
    }
  }

  averageMs(): number {
    if (this.timestamps.length < 2) return 0;
    const intervals: number[] = [];
    for (let i = 1; i < this.timestamps.length; i++) {
      intervals.push(this.timestamps[i] - this.timestamps[i - 1]);
    }
    return intervals.reduce((sum, v) => sum + v, 0) / intervals.length;
  }

  minMs(): number {
    if (this.timestamps.length < 2) return 0;
    let min = Infinity;
    for (let i = 1; i < this.timestamps.length; i++) {
      min = Math.min(min, this.timestamps[i] - this.timestamps[i - 1]);
    }
    return min;
  }

  maxMs(): number {
    if (this.timestamps.length < 2) return 0;
    let max = 0;
    for (let i = 1; i < this.timestamps.length; i++) {
      max = Math.max(max, this.timestamps[i] - this.timestamps[i - 1]);
    }
    return max;
  }

  get sampleCount(): number {
    return this.timestamps.length;
  }

  reset(): void {
    this.timestamps = [];
  }
}

export class Stopwatch {
  private startTime?: number;
  private elapsed = 0;
  private running = false;

  start(): void {
    if (this.running) return;
    this.startTime = Date.now();
    this.running = true;
  }

  stop(): number {
    if (!this.running || this.startTime === undefined) return this.elapsed;
    this.elapsed += Date.now() - this.startTime;
    this.running = false;
    return this.elapsed;
  }

  reset(): void {
    this.elapsed = 0;
    this.startTime = undefined;
    this.running = false;
  }

  get elapsedMs(): number {
    if (this.running && this.startTime !== undefined) {
      return this.elapsed + (Date.now() - this.startTime);
    }
    return this.elapsed;
  }

  get isRunning(): boolean {
    return this.running;
  }
}
