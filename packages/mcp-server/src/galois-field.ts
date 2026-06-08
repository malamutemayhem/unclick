export class GaloisField {
  readonly p: number;

  constructor(p: number) {
    this.p = p;
  }

  mod(a: number): number {
    return ((a % this.p) + this.p) % this.p;
  }

  add(a: number, b: number): number {
    return this.mod(a + b);
  }

  subtract(a: number, b: number): number {
    return this.mod(a - b);
  }

  multiply(a: number, b: number): number {
    return this.mod(a * b);
  }

  power(base: number, exp: number): number {
    base = this.mod(base);
    let result = 1;
    exp = ((exp % (this.p - 1)) + (this.p - 1)) % (this.p - 1);
    while (exp > 0) {
      if (exp % 2 === 1) result = this.mod(result * base);
      base = this.mod(base * base);
      exp = Math.floor(exp / 2);
    }
    return result;
  }

  inverse(a: number): number {
    a = this.mod(a);
    if (a === 0) throw new Error("no inverse for 0");
    return this.power(a, this.p - 2);
  }

  divide(a: number, b: number): number {
    return this.multiply(a, this.inverse(b));
  }

  negate(a: number): number {
    return this.mod(-a);
  }

  elements(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.p; i++) result.push(i);
    return result;
  }

  generators(): number[] {
    const gens: number[] = [];
    for (let g = 2; g < this.p; g++) {
      const seen = new Set<number>();
      let val = 1;
      for (let i = 0; i < this.p - 1; i++) {
        val = this.mod(val * g);
        seen.add(val);
      }
      if (seen.size === this.p - 1) gens.push(g);
    }
    return gens;
  }

  additionTable(): number[][] {
    return this.elements().map(a => this.elements().map(b => this.add(a, b)));
  }

  multiplicationTable(): number[][] {
    return this.elements().map(a => this.elements().map(b => this.multiply(a, b)));
  }

  order(a: number): number {
    a = this.mod(a);
    if (a === 0) return 0;
    let val = 1;
    for (let i = 1; i <= this.p; i++) {
      val = this.mod(val * a);
      if (val === 1) return i;
    }
    return this.p - 1;
  }
}
