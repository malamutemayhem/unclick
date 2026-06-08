export class RollingStats {
  private values: number[] = [];
  private maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  push(value: number): void {
    this.values.push(value);
    if (this.values.length > this.maxSize) {
      this.values.shift();
    }
  }

  mean(): number {
    if (this.values.length === 0) return 0;
    return this.values.reduce((a, b) => a + b, 0) / this.values.length;
  }

  variance(): number {
    if (this.values.length < 2) return 0;
    const avg = this.mean();
    return this.values.reduce((sum, v) => sum + (v - avg) ** 2, 0) / (this.values.length - 1);
  }

  stdDev(): number {
    return Math.sqrt(this.variance());
  }

  min(): number {
    if (this.values.length === 0) return 0;
    return Math.min(...this.values);
  }

  max(): number {
    if (this.values.length === 0) return 0;
    return Math.max(...this.values);
  }

  percentile(p: number): number {
    if (this.values.length === 0) return 0;
    const sorted = [...this.values].sort((a, b) => a - b);
    const idx = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, idx)];
  }

  get count(): number {
    return this.values.length;
  }

  reset(): void {
    this.values = [];
  }

  snapshot(): { mean: number; stdDev: number; min: number; max: number; p50: number; p95: number; p99: number; count: number } {
    return {
      mean: this.mean(),
      stdDev: this.stdDev(),
      min: this.min(),
      max: this.max(),
      p50: this.percentile(50),
      p95: this.percentile(95),
      p99: this.percentile(99),
      count: this.count,
    };
  }
}
