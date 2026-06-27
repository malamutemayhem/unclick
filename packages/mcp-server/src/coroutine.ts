export type CoroutineState = "ready" | "running" | "suspended" | "done";

export class Coroutine<T = void> {
  private gen: Generator<unknown, T, unknown>;
  private _state: CoroutineState = "ready";
  private _result: T | undefined;
  private _error: Error | undefined;

  constructor(fn: () => Generator<unknown, T, unknown>) {
    this.gen = fn();
  }

  get state(): CoroutineState {
    return this._state;
  }

  get result(): T | undefined {
    return this._result;
  }

  get error(): Error | undefined {
    return this._error;
  }

  get isDone(): boolean {
    return this._state === "done";
  }

  resume(value?: unknown): { done: boolean; yielded?: unknown } {
    if (this._state === "done") throw new Error("Cannot resume a completed coroutine");
    this._state = "running";
    try {
      const result = this.gen.next(value);
      if (result.done) {
        this._state = "done";
        this._result = result.value;
        return { done: true };
      }
      this._state = "suspended";
      return { done: false, yielded: result.value };
    } catch (e) {
      this._state = "done";
      this._error = e instanceof Error ? e : new Error(String(e));
      throw this._error;
    }
  }

  runToCompletion(): T {
    while (!this.isDone) {
      this.resume();
    }
    if (this._error) throw this._error;
    return this._result!;
  }

  static create<T>(fn: () => Generator<unknown, T, unknown>): Coroutine<T> {
    return new Coroutine(fn);
  }
}

export class Scheduler {
  private queue: { coroutine: Coroutine<unknown>; priority: number }[] = [];
  private _ticks = 0;

  get ticks(): number {
    return this._ticks;
  }

  get size(): number {
    return this.queue.length;
  }

  add(coroutine: Coroutine<unknown>, priority = 0): void {
    this.queue.push({ coroutine, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  step(): boolean {
    if (this.queue.length === 0) return false;
    this._ticks++;
    const { coroutine } = this.queue[0];
    try {
      const result = coroutine.resume();
      if (result.done) {
        this.queue.shift();
      }
    } catch {
      this.queue.shift();
    }
    return this.queue.length > 0;
  }

  run(maxTicks = Infinity): number {
    let count = 0;
    while (this.queue.length > 0 && count < maxTicks) {
      this.step();
      count++;
    }
    return count;
  }

  runRoundRobin(maxTicks = Infinity): number {
    let count = 0;
    while (this.queue.length > 0 && count < maxTicks) {
      this._ticks++;
      count++;
      const entry = this.queue.shift()!;
      try {
        const result = entry.coroutine.resume();
        if (!result.done) {
          this.queue.push(entry);
        }
      } catch {
        // coroutine errored, remove it
      }
    }
    return count;
  }
}

export function* range(start: number, end: number, step = 1): Generator<number, void, unknown> {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

export function* take<T>(gen: Generator<T>, n: number): Generator<T, void, unknown> {
  let count = 0;
  for (const value of gen) {
    if (count >= n) return;
    yield value;
    count++;
  }
}

export function* zip<A, B>(
  a: Generator<A, unknown, unknown>,
  b: Generator<B, unknown, unknown>
): Generator<[A, B], void, unknown> {
  while (true) {
    const ra = a.next();
    const rb = b.next();
    if (ra.done || rb.done) return;
    yield [ra.value, rb.value];
  }
}

export function* chain<T>(...gens: Generator<T, unknown, unknown>[]): Generator<T, void, unknown> {
  for (const gen of gens) {
    for (const value of gen) {
      yield value;
    }
  }
}

export function collect<T>(gen: Generator<T, unknown, unknown>, max = Infinity): T[] {
  const result: T[] = [];
  let count = 0;
  for (const value of gen) {
    result.push(value);
    count++;
    if (count >= max) break;
  }
  return result;
}
