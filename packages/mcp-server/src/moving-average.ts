export class SimpleMovingAverage {
  private values: number[] = [];
  private readonly windowSize: number;

  constructor(windowSize: number) {
    this.windowSize = windowSize;
  }

  push(value: number): number {
    this.values.push(value);
    if (this.values.length > this.windowSize) this.values.shift();
    return this.current;
  }

  get current(): number {
    if (this.values.length === 0) return 0;
    return this.values.reduce((a, b) => a + b, 0) / this.values.length;
  }

  get count(): number {
    return this.values.length;
  }

  get full(): boolean {
    return this.values.length >= this.windowSize;
  }

  reset(): void {
    this.values = [];
  }
}

export class ExponentialMovingAverage {
  private value: number | null = null;
  private readonly alpha: number;
  private n = 0;

  constructor(alpha: number) {
    if (alpha <= 0 || alpha > 1) throw new Error("Alpha must be between 0 (exclusive) and 1 (inclusive)");
    this.alpha = alpha;
  }

  push(value: number): number {
    this.n++;
    if (this.value === null) {
      this.value = value;
    } else {
      this.value = this.alpha * value + (1 - this.alpha) * this.value;
    }
    return this.value;
  }

  get current(): number {
    return this.value ?? 0;
  }

  get count(): number {
    return this.n;
  }

  reset(): void {
    this.value = null;
    this.n = 0;
  }
}

export function simpleMA(values: number[], window: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1);
    const slice = values.slice(start, i + 1);
    result.push(slice.reduce((a, b) => a + b, 0) / slice.length);
  }
  return result;
}
