export interface TimingResult<T> {
  result: T;
  durationMs: number;
}

export async function measure<T>(fn: () => Promise<T>): Promise<TimingResult<T>> {
  const start = performance.now();
  const result = await fn();
  return { result, durationMs: performance.now() - start };
}

export function measureSync<T>(fn: () => T): TimingResult<T> {
  const start = performance.now();
  const result = fn();
  return { result, durationMs: performance.now() - start };
}

export class Stopwatch {
  private startTime: number | null = null;
  private accumulated = 0;
  private running = false;

  start(): void {
    if (this.running) return;
    this.startTime = performance.now();
    this.running = true;
  }

  stop(): number {
    if (!this.running || this.startTime === null) return this.accumulated;
    this.accumulated += performance.now() - this.startTime;
    this.startTime = null;
    this.running = false;
    return this.accumulated;
  }

  reset(): void {
    this.startTime = null;
    this.accumulated = 0;
    this.running = false;
  }

  get elapsed(): number {
    if (this.running && this.startTime !== null) {
      return this.accumulated + (performance.now() - this.startTime);
    }
    return this.accumulated;
  }

  get isRunning(): boolean { return this.running; }

  lap(): number {
    const current = this.elapsed;
    this.reset();
    this.start();
    return current;
  }
}

export class Timer {
  private samples: number[] = [];

  record(durationMs: number): void {
    this.samples.push(durationMs);
  }

  get count(): number { return this.samples.length; }
  get min(): number { return Math.min(...this.samples); }
  get max(): number { return Math.max(...this.samples); }
  get mean(): number { return this.samples.reduce((a, b) => a + b, 0) / this.samples.length; }

  percentile(p: number): number {
    const sorted = [...this.samples].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo];
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
  }

  reset(): void { this.samples = []; }
}
