export type FiberState = "pending" | "running" | "suspended" | "completed" | "failed";

export interface FiberResult<T> {
  value?: T;
  error?: Error;
  state: FiberState;
}

export class Fiber<T = void> {
  private _state: FiberState = "pending";
  private _result: T | undefined;
  private _error: Error | undefined;
  private steps: (() => T | Fiber<T> | undefined)[];
  private currentStep = 0;
  private children: Fiber<unknown>[] = [];
  private _name: string;

  constructor(name: string, ...steps: (() => T | Fiber<T> | undefined)[]) {
    this._name = name;
    this.steps = steps;
  }

  get name(): string {
    return this._name;
  }

  get state(): FiberState {
    return this._state;
  }

  get result(): FiberResult<T> {
    return { value: this._result, error: this._error, state: this._state };
  }

  get isComplete(): boolean {
    return this._state === "completed" || this._state === "failed";
  }

  tick(): boolean {
    if (this.isComplete) return false;
    if (this._state === "pending") this._state = "running";

    if (this.children.length > 0) {
      const pendingChildren = this.children.filter((c) => !c.isComplete);
      if (pendingChildren.length > 0) {
        pendingChildren[0].tick();
        return true;
      }
      this.children = [];
    }

    if (this.currentStep >= this.steps.length) {
      this._state = "completed";
      return false;
    }

    try {
      const result = this.steps[this.currentStep]();
      this.currentStep++;
      if (result instanceof Fiber) {
        this.children.push(result);
      } else if (result !== undefined) {
        this._result = result;
      }
      if (this.currentStep >= this.steps.length && this.children.length === 0) {
        this._state = "completed";
        return false;
      }
      this._state = "suspended";
      return true;
    } catch (e) {
      this._state = "failed";
      this._error = e instanceof Error ? e : new Error(String(e));
      return false;
    }
  }

  run(): FiberResult<T> {
    while (!this.isComplete) {
      this.tick();
    }
    return this.result;
  }

  spawn<U>(name: string, ...steps: (() => U | Fiber<U> | undefined)[]): Fiber<U> {
    const child = new Fiber<U>(name, ...steps);
    this.children.push(child);
    return child;
  }

  static of<T>(name: string, value: T): Fiber<T> {
    return new Fiber(name, () => value);
  }
}

export class FiberPool {
  private fibers: Fiber<unknown>[] = [];
  private _completed: Fiber<unknown>[] = [];
  private _ticks = 0;
  private maxConcurrency: number;

  constructor(maxConcurrency = Infinity) {
    this.maxConcurrency = maxConcurrency;
  }

  get ticks(): number {
    return this._ticks;
  }

  get active(): number {
    return this.fibers.length;
  }

  get completed(): Fiber<unknown>[] {
    return [...this._completed];
  }

  add(fiber: Fiber<unknown>): void {
    this.fibers.push(fiber);
  }

  step(): number {
    this._ticks++;
    let ran = 0;
    const limit = Math.min(this.fibers.length, this.maxConcurrency);
    for (let i = 0; i < limit; i++) {
      this.fibers[i].tick();
      ran++;
    }
    const done = this.fibers.filter((f) => f.isComplete);
    this._completed.push(...done);
    this.fibers = this.fibers.filter((f) => !f.isComplete);
    return ran;
  }

  run(maxTicks = 1000): number {
    let total = 0;
    while (this.fibers.length > 0 && total < maxTicks) {
      this.step();
      total++;
    }
    return total;
  }

  drain(): FiberResult<unknown>[] {
    this.run();
    return this._completed.map((f) => f.result);
  }
}

export function sequence<T>(...fibers: Fiber<T>[]): Fiber<T[]> {
  const results: T[] = [];
  const steps = fibers.map((f) => () => {
    f.run();
    if (f.result.value !== undefined) results.push(f.result.value);
    return undefined as unknown as T[];
  });
  steps.push(() => results);
  return new Fiber("sequence", ...steps);
}

export function parallel<T>(...fibers: Fiber<T>[]): Fiber<T[]> {
  return new Fiber("parallel", () => {
    const pool = new FiberPool();
    for (const f of fibers) pool.add(f);
    pool.run();
    return pool.completed
      .map((f) => f.result.value)
      .filter((v): v is T => v !== undefined);
  });
}
