export class Rational {
  readonly num: number;
  readonly den: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) throw new Error("Division by zero");
    const sign = denominator < 0 ? -1 : 1;
    const g = gcd(Math.abs(numerator), Math.abs(denominator));
    this.num = sign * numerator / g;
    this.den = sign * denominator / g;
  }

  add(other: Rational): Rational {
    return new Rational(
      this.num * other.den + other.num * this.den,
      this.den * other.den,
    );
  }

  sub(other: Rational): Rational {
    return new Rational(
      this.num * other.den - other.num * this.den,
      this.den * other.den,
    );
  }

  mul(other: Rational): Rational {
    return new Rational(this.num * other.num, this.den * other.den);
  }

  div(other: Rational): Rational {
    return new Rational(this.num * other.den, this.den * other.num);
  }

  negate(): Rational {
    return new Rational(-this.num, this.den);
  }

  reciprocal(): Rational {
    return new Rational(this.den, this.num);
  }

  abs(): Rational {
    return new Rational(Math.abs(this.num), this.den);
  }

  equals(other: Rational): boolean {
    return this.num === other.num && this.den === other.den;
  }

  compareTo(other: Rational): number {
    return this.num * other.den - other.num * this.den;
  }

  isZero(): boolean {
    return this.num === 0;
  }

  isPositive(): boolean {
    return this.num > 0;
  }

  isNegative(): boolean {
    return this.num < 0;
  }

  isInteger(): boolean {
    return this.den === 1;
  }

  toNumber(): number {
    return this.num / this.den;
  }

  toString(): string {
    if (this.den === 1) return `${this.num}`;
    return `${this.num}/${this.den}`;
  }

  toMixed(): string {
    if (Math.abs(this.num) < this.den) return this.toString();
    const whole = Math.trunc(this.num / this.den);
    const remainder = Math.abs(this.num % this.den);
    if (remainder === 0) return `${whole}`;
    return `${whole} ${remainder}/${this.den}`;
  }

  pow(n: number): Rational {
    if (n === 0) return new Rational(1, 1);
    if (n < 0) return this.reciprocal().pow(-n);
    return new Rational(Math.pow(this.num, n), Math.pow(this.den, n));
  }
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function rat(num: number, den = 1): Rational {
  return new Rational(num, den);
}

export function fromDecimal(value: number, maxDen = 1000): Rational {
  let bestNum = Math.round(value);
  let bestDen = 1;
  let bestError = Math.abs(value - bestNum);

  for (let d = 2; d <= maxDen; d++) {
    const n = Math.round(value * d);
    const error = Math.abs(value - n / d);
    if (error < bestError) {
      bestNum = n;
      bestDen = d;
      bestError = error;
      if (error < 1e-10) break;
    }
  }

  return new Rational(bestNum, bestDen);
}

export function mediant(a: Rational, b: Rational): Rational {
  return new Rational(a.num + b.num, a.den + b.den);
}

export function harmonicMean(a: Rational, b: Rational): Rational {
  const sum = a.reciprocal().add(b.reciprocal());
  return rat(2, 1).div(sum);
}
