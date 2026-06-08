function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export class Fraction {
  readonly num: number;
  readonly den: number;

  constructor(num: number, den = 1) {
    if (den === 0) throw new Error("Division by zero");
    const sign = den < 0 ? -1 : 1;
    const g = gcd(Math.abs(num), Math.abs(den));
    this.num = sign * num / g;
    this.den = sign * den / g;
  }

  static fromDecimal(value: number, precision = 1000000): Fraction {
    return new Fraction(Math.round(value * precision), precision);
  }

  add(other: Fraction): Fraction {
    return new Fraction(
      this.num * other.den + other.num * this.den,
      this.den * other.den
    );
  }

  subtract(other: Fraction): Fraction {
    return new Fraction(
      this.num * other.den - other.num * this.den,
      this.den * other.den
    );
  }

  multiply(other: Fraction): Fraction {
    return new Fraction(this.num * other.num, this.den * other.den);
  }

  divide(other: Fraction): Fraction {
    return new Fraction(this.num * other.den, this.den * other.num);
  }

  equals(other: Fraction): boolean {
    return this.num === other.num && this.den === other.den;
  }

  toNumber(): number {
    return this.num / this.den;
  }

  toString(): string {
    return this.den === 1 ? `${this.num}` : `${this.num}/${this.den}`;
  }

  reciprocal(): Fraction {
    return new Fraction(this.den, this.num);
  }

  negate(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  abs(): Fraction {
    return new Fraction(Math.abs(this.num), this.den);
  }

  compareTo(other: Fraction): number {
    const diff = this.num * other.den - other.num * this.den;
    return diff < 0 ? -1 : diff > 0 ? 1 : 0;
  }
}
