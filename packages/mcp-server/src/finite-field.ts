export class FieldElement {
  readonly value: number;
  readonly prime: number;

  constructor(value: number, prime: number) {
    this.prime = prime;
    this.value = ((value % prime) + prime) % prime;
  }

  add(other: FieldElement): FieldElement {
    this.checkField(other);
    return new FieldElement(this.value + other.value, this.prime);
  }

  sub(other: FieldElement): FieldElement {
    this.checkField(other);
    return new FieldElement(this.value - other.value, this.prime);
  }

  mul(other: FieldElement): FieldElement {
    this.checkField(other);
    return new FieldElement(this.value * other.value, this.prime);
  }

  pow(exp: number): FieldElement {
    const e = ((exp % (this.prime - 1)) + (this.prime - 1)) % (this.prime - 1);
    let result = 1;
    let base = this.value;
    let n = e;
    while (n > 0) {
      if (n & 1) result = (result * base) % this.prime;
      base = (base * base) % this.prime;
      n >>= 1;
    }
    return new FieldElement(result, this.prime);
  }

  inv(): FieldElement {
    if (this.value === 0) throw new Error("Cannot invert zero");
    return this.pow(this.prime - 2);
  }

  div(other: FieldElement): FieldElement {
    this.checkField(other);
    return this.mul(other.inv());
  }

  neg(): FieldElement {
    return new FieldElement(-this.value, this.prime);
  }

  equals(other: FieldElement): boolean {
    return this.value === other.value && this.prime === other.prime;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  toString(): string {
    return `${this.value} (mod ${this.prime})`;
  }

  private checkField(other: FieldElement): void {
    if (this.prime !== other.prime) {
      throw new Error("Fields must match");
    }
  }
}

export function field(prime: number): (value: number) => FieldElement {
  return (value: number) => new FieldElement(value, prime);
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const result = extendedGcd(b, a % b);
  return { gcd: result.gcd, x: result.y, y: result.x - Math.floor(a / b) * result.y };
}
