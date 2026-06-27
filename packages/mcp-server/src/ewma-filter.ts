export class EWMAFilter {
  private alpha: number;
  private value: number | null = null;
  private count = 0;
  private variance = 0;

  constructor(alpha: number) {
    if (alpha <= 0 || alpha > 1) throw new Error("Alpha must be in (0, 1]");
    this.alpha = alpha;
  }

  update(x: number): number {
    this.count++;
    if (this.value === null) {
      this.value = x;
      this.variance = 0;
      return x;
    }
    const diff = x - this.value;
    this.value = this.alpha * x + (1 - this.alpha) * this.value;
    this.variance = (1 - this.alpha) * (this.variance + this.alpha * diff * diff);
    return this.value;
  }

  current(): number | null {
    return this.value;
  }

  standardDeviation(): number {
    return Math.sqrt(this.variance);
  }

  reset(): void {
    this.value = null;
    this.count = 0;
    this.variance = 0;
  }

  static fromHalfLife(halfLife: number): EWMAFilter {
    return new EWMAFilter(1 - Math.exp(-Math.LN2 / halfLife));
  }

  static fromSpan(span: number): EWMAFilter {
    return new EWMAFilter(2 / (span + 1));
  }

  static smooth(data: number[], alpha: number): number[] {
    const filter = new EWMAFilter(alpha);
    return data.map((x) => filter.update(x));
  }

  static doubleSmooth(data: number[], alpha: number): number[] {
    const first = this.smooth(data, alpha);
    return this.smooth(first, alpha);
  }

  getAlpha(): number {
    return this.alpha;
  }

  getCount(): number {
    return this.count;
  }
}
