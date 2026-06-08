export class Timer {
  private startTime = 0;
  private elapsed = 0;
  private _running = false;

  start(): this {
    if (this._running) return this;
    this._running = true;
    this.startTime = performance.now();
    return this;
  }

  stop(): number {
    if (!this._running) return this.elapsed;
    this._running = false;
    this.elapsed += performance.now() - this.startTime;
    return this.elapsed;
  }

  reset(): this {
    this._running = false;
    this.elapsed = 0;
    this.startTime = 0;
    return this;
  }

  restart(): this {
    this.reset();
    return this.start();
  }

  get running(): boolean {
    return this._running;
  }

  get ms(): number {
    if (this._running) {
      return this.elapsed + (performance.now() - this.startTime);
    }
    return this.elapsed;
  }

  get seconds(): number {
    return this.ms / 1000;
  }

  static measure(fn: () => void): number {
    const t = new Timer().start();
    fn();
    return t.stop();
  }

  static async measureAsync(fn: () => Promise<void>): Promise<number> {
    const t = new Timer().start();
    await fn();
    return t.stop();
  }
}

export class Stopwatch {
  private laps: number[] = [];
  private timer = new Timer();

  start(): this {
    this.timer.start();
    return this;
  }

  lap(): number {
    const current = this.timer.ms;
    const lastLap = this.laps.length > 0 ? this.laps.reduce((a, b) => a + b, 0) : 0;
    const lapTime = current - lastLap;
    this.laps.push(lapTime);
    return lapTime;
  }

  stop(): number {
    this.lap();
    return this.timer.stop();
  }

  getLaps(): number[] {
    return [...this.laps];
  }

  get total(): number {
    return this.timer.ms;
  }

  reset(): this {
    this.timer.reset();
    this.laps.length = 0;
    return this;
  }
}

export function debounceTimer(fn: () => void, ms: number): { trigger: () => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return {
    trigger: () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, ms);
    },
    cancel: () => {
      if (timer) { clearTimeout(timer); timer = null; }
    },
  };
}
