const SCALE = 10000;

export class FixedPoint {
  private readonly raw: number;

  private constructor(raw: number) {
    this.raw = Math.round(raw);
  }

  static from(value: number): FixedPoint {
    return new FixedPoint(value * SCALE);
  }

  static fromRaw(raw: number): FixedPoint {
    return new FixedPoint(raw);
  }

  toNumber(): number {
    return this.raw / SCALE;
  }

  toRaw(): number {
    return this.raw;
  }

  add(other: FixedPoint): FixedPoint {
    return new FixedPoint(this.raw + other.raw);
  }

  subtract(other: FixedPoint): FixedPoint {
    return new FixedPoint(this.raw - other.raw);
  }

  multiply(other: FixedPoint): FixedPoint {
    return new FixedPoint(Math.round((this.raw * other.raw) / SCALE));
  }

  divide(other: FixedPoint): FixedPoint {
    if (other.raw === 0) throw new Error("Division by zero");
    return new FixedPoint(Math.round((this.raw * SCALE) / other.raw));
  }

  abs(): FixedPoint {
    return new FixedPoint(Math.abs(this.raw));
  }

  negate(): FixedPoint {
    return new FixedPoint(-this.raw);
  }

  equals(other: FixedPoint): boolean {
    return this.raw === other.raw;
  }

  compareTo(other: FixedPoint): number {
    return this.raw - other.raw;
  }

  isZero(): boolean {
    return this.raw === 0;
  }

  isPositive(): boolean {
    return this.raw > 0;
  }

  isNegative(): boolean {
    return this.raw < 0;
  }

  toString(): string {
    return this.toNumber().toFixed(4);
  }
}
