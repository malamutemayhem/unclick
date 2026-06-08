export class Timer {
  private startTime = 0;
  private elapsed = 0;
  private running = false;
  private laps: number[] = [];

  start(): this {
    if (!this.running) {
      this.startTime = Date.now();
      this.running = true;
    }
    return this;
  }

  stop(): number {
    if (this.running) {
      this.elapsed += Date.now() - this.startTime;
      this.running = false;
    }
    return this.elapsed;
  }

  reset(): this {
    this.elapsed = 0;
    this.startTime = 0;
    this.running = false;
    this.laps = [];
    return this;
  }

  lap(): number {
    const current = this.getElapsed();
    const lastLap = this.laps.length > 0 ? this.laps.reduce((a, b) => a + b, 0) : 0;
    const lapTime = current - lastLap;
    this.laps.push(lapTime);
    return lapTime;
  }

  getLaps(): number[] {
    return [...this.laps];
  }

  getElapsed(): number {
    return this.running ? this.elapsed + (Date.now() - this.startTime) : this.elapsed;
  }

  get isRunning(): boolean {
    return this.running;
  }
}

export class Stopwatch {
  private marks = new Map<string, number>();
  private base: number;

  constructor() {
    this.base = Date.now();
  }

  mark(label: string): number {
    const time = Date.now() - this.base;
    this.marks.set(label, time);
    return time;
  }

  getMark(label: string): number | undefined {
    return this.marks.get(label);
  }

  between(from: string, to: string): number | undefined {
    const f = this.marks.get(from);
    const t = this.marks.get(to);
    if (f === undefined || t === undefined) return undefined;
    return t - f;
  }

  allMarks(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [k, v] of this.marks) result[k] = v;
    return result;
  }

  reset(): void {
    this.marks.clear();
    this.base = Date.now();
  }
}
