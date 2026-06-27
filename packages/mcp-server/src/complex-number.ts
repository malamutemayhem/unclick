export class ComplexNumber {
  constructor(public real: number, public imag: number) {}

  static fromPolar(magnitude: number, angle: number): ComplexNumber {
    return new ComplexNumber(
      Math.round(magnitude * Math.cos(angle) * 10000) / 10000,
      Math.round(magnitude * Math.sin(angle) * 10000) / 10000,
    );
  }

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  subtract(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  multiply(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real,
    );
  }

  divide(other: ComplexNumber): ComplexNumber {
    const denom = other.real * other.real + other.imag * other.imag;
    if (denom === 0) throw new Error("Division by zero");
    return new ComplexNumber(
      Math.round(((this.real * other.real + this.imag * other.imag) / denom) * 10000) / 10000,
      Math.round(((this.imag * other.real - this.real * other.imag) / denom) * 10000) / 10000,
    );
  }

  magnitude(): number {
    return Math.round(Math.sqrt(this.real * this.real + this.imag * this.imag) * 10000) / 10000;
  }

  phase(): number {
    return Math.round(Math.atan2(this.imag, this.real) * 10000) / 10000;
  }

  conjugate(): ComplexNumber {
    return new ComplexNumber(this.real, -this.imag);
  }

  power(n: number): ComplexNumber {
    const mag = Math.pow(this.magnitude(), n);
    const angle = this.phase() * n;
    return ComplexNumber.fromPolar(mag, angle);
  }

  equals(other: ComplexNumber, tolerance = 1e-10): boolean {
    return Math.abs(this.real - other.real) < tolerance && Math.abs(this.imag - other.imag) < tolerance;
  }

  toString(): string {
    if (this.imag === 0) return `${this.real}`;
    if (this.real === 0) return `${this.imag}i`;
    const sign = this.imag > 0 ? "+" : "-";
    return `${this.real} ${sign} ${Math.abs(this.imag)}i`;
  }

  static roots(n: number, magnitude = 1): ComplexNumber[] {
    const result: ComplexNumber[] = [];
    for (let k = 0; k < n; k++) {
      const angle = (2 * Math.PI * k) / n;
      result.push(ComplexNumber.fromPolar(magnitude, angle));
    }
    return result;
  }
}
