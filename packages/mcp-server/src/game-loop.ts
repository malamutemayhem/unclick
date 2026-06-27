export interface LoopStats {
  ticks: number;
  totalTime: number;
  avgTickTime: number;
  maxTickTime: number;
  minTickTime: number;
}

export class FixedTimestep {
  private accumulator = 0;
  private tickCount = 0;
  readonly dt: number;

  constructor(ticksPerSecond: number) {
    this.dt = 1 / ticksPerSecond;
  }

  advance(elapsed: number, update: (dt: number) => void): number {
    this.accumulator += elapsed;
    let steps = 0;
    while (this.accumulator >= this.dt) {
      update(this.dt);
      this.accumulator -= this.dt;
      this.tickCount++;
      steps++;
    }
    return steps;
  }

  get alpha(): number {
    return this.accumulator / this.dt;
  }

  get ticks(): number {
    return this.tickCount;
  }

  reset(): void {
    this.accumulator = 0;
    this.tickCount = 0;
  }
}

export class GameClock {
  private startTime: number;
  private lastTime: number;
  private pauseTime = 0;
  private paused = false;
  private scale = 1;
  private elapsed = 0;

  constructor(now = 0) {
    this.startTime = now;
    this.lastTime = now;
  }

  tick(now: number): number {
    if (this.paused) {
      this.lastTime = now;
      return 0;
    }
    const raw = now - this.lastTime;
    const dt = raw * this.scale;
    this.elapsed += dt;
    this.lastTime = now;
    return dt;
  }

  pause(): void {
    if (!this.paused) {
      this.paused = true;
      this.pauseTime = this.lastTime;
    }
  }

  resume(): void {
    if (this.paused) {
      this.paused = false;
    }
  }

  setScale(s: number): void {
    this.scale = Math.max(0, s);
  }

  get timeScale(): number { return this.scale; }
  get totalElapsed(): number { return this.elapsed; }
  get isPaused(): boolean { return this.paused; }
}

export class TickScheduler {
  private tasks: { name: string; interval: number; lastRun: number; fn: () => void }[] = [];
  private currentTime = 0;

  schedule(name: string, interval: number, fn: () => void): void {
    this.tasks.push({ name, interval, lastRun: 0, fn });
  }

  unschedule(name: string): boolean {
    const idx = this.tasks.findIndex(t => t.name === name);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  update(dt: number): string[] {
    this.currentTime += dt;
    const ran: string[] = [];
    for (const task of this.tasks) {
      if (this.currentTime - task.lastRun >= task.interval) {
        task.fn();
        task.lastRun = this.currentTime;
        ran.push(task.name);
      }
    }
    return ran;
  }

  get taskCount(): number {
    return this.tasks.length;
  }

  get time(): number {
    return this.currentTime;
  }
}

export class SimulationRunner {
  private stats: LoopStats = {
    ticks: 0,
    totalTime: 0,
    avgTickTime: 0,
    maxTickTime: 0,
    minTickTime: Infinity,
  };

  run(steps: number, update: (step: number) => number): LoopStats {
    let totalTickTime = 0;
    for (let i = 0; i < steps; i++) {
      const tickTime = update(i);
      totalTickTime += tickTime;
      this.stats.ticks++;
      this.stats.totalTime += tickTime;
      if (tickTime > this.stats.maxTickTime) this.stats.maxTickTime = tickTime;
      if (tickTime < this.stats.minTickTime) this.stats.minTickTime = tickTime;
    }
    this.stats.avgTickTime = this.stats.ticks > 0 ? this.stats.totalTime / this.stats.ticks : 0;
    return { ...this.stats };
  }

  getStats(): LoopStats {
    return { ...this.stats };
  }

  reset(): void {
    this.stats = { ticks: 0, totalTime: 0, avgTickTime: 0, maxTickTime: 0, minTickTime: Infinity };
  }
}
