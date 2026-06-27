export interface StepResult<T = unknown> {
  value: T;
  stepCount: number;
  limitReached: boolean;
}

export class StepLimiter {
  private steps = 0;
  private readonly maxSteps: number;
  private readonly onLimit: "throw" | "stop";

  constructor(maxSteps: number, onLimit: "throw" | "stop" = "throw") {
    this.maxSteps = maxSteps;
    this.onLimit = onLimit;
  }

  step(): boolean {
    this.steps++;
    if (this.steps > this.maxSteps) {
      if (this.onLimit === "throw") {
        throw new Error(`Step limit reached: ${this.maxSteps}`);
      }
      return false;
    }
    return true;
  }

  get current(): number {
    return this.steps;
  }

  get remaining(): number {
    return Math.max(0, this.maxSteps - this.steps);
  }

  get isExhausted(): boolean {
    return this.steps >= this.maxSteps;
  }

  reset(): void {
    this.steps = 0;
  }
}

export async function runWithLimit<T>(
  fn: (limiter: StepLimiter) => T | Promise<T>,
  maxSteps: number,
): Promise<StepResult<T>> {
  const limiter = new StepLimiter(maxSteps, "throw");
  try {
    const value = await fn(limiter);
    return { value, stepCount: limiter.current, limitReached: false };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Step limit reached")) {
      return { value: undefined as T, stepCount: limiter.current, limitReached: true };
    }
    throw err;
  }
}

export function loopWithLimit<T>(
  items: Iterable<T>,
  maxIterations: number,
  fn: (item: T, index: number) => void,
): { processed: number; limitReached: boolean } {
  let i = 0;
  for (const item of items) {
    if (i >= maxIterations) return { processed: i, limitReached: true };
    fn(item, i);
    i++;
  }
  return { processed: i, limitReached: false };
}

export function* limitedGenerator<T>(
  gen: Iterable<T>,
  maxYields: number,
): Generator<T, void, undefined> {
  let count = 0;
  for (const item of gen) {
    if (count >= maxYields) return;
    yield item;
    count++;
  }
}
