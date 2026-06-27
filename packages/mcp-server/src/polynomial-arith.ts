export class Polynomial {
  readonly coeffs: number[];

  constructor(coeffs: number[]) {
    this.coeffs = [...coeffs];
    while (this.coeffs.length > 1 && this.coeffs[this.coeffs.length - 1] === 0) {
      this.coeffs.pop();
    }
  }

  get degree(): number {
    return Math.max(0, this.coeffs.length - 1);
  }

  evaluate(x: number): number {
    let result = 0;
    let power = 1;
    for (let i = 0; i < this.coeffs.length; i++) {
      result += this.coeffs[i] * power;
      power *= x;
    }
    return result;
  }

  add(other: Polynomial): Polynomial {
    const len = Math.max(this.coeffs.length, other.coeffs.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < this.coeffs.length; i++) result[i] += this.coeffs[i];
    for (let i = 0; i < other.coeffs.length; i++) result[i] += other.coeffs[i];
    return new Polynomial(result);
  }

  subtract(other: Polynomial): Polynomial {
    const len = Math.max(this.coeffs.length, other.coeffs.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < this.coeffs.length; i++) result[i] += this.coeffs[i];
    for (let i = 0; i < other.coeffs.length; i++) result[i] -= other.coeffs[i];
    return new Polynomial(result);
  }

  multiply(other: Polynomial): Polynomial {
    const result = new Array(this.coeffs.length + other.coeffs.length - 1).fill(0);
    for (let i = 0; i < this.coeffs.length; i++) {
      for (let j = 0; j < other.coeffs.length; j++) {
        result[i + j] += this.coeffs[i] * other.coeffs[j];
      }
    }
    return new Polynomial(result);
  }

  scale(factor: number): Polynomial {
    return new Polynomial(this.coeffs.map(c => c * factor));
  }

  derivative(): Polynomial {
    if (this.coeffs.length <= 1) return new Polynomial([0]);
    const result: number[] = [];
    for (let i = 1; i < this.coeffs.length; i++) {
      result.push(this.coeffs[i] * i);
    }
    return new Polynomial(result);
  }

  integral(constant = 0): Polynomial {
    const result = [constant];
    for (let i = 0; i < this.coeffs.length; i++) {
      result.push(this.coeffs[i] / (i + 1));
    }
    return new Polynomial(result);
  }

  toString(): string {
    if (this.coeffs.every(c => c === 0)) return "0";
    const terms: string[] = [];
    for (let i = this.coeffs.length - 1; i >= 0; i--) {
      const c = this.coeffs[i];
      if (c === 0) continue;
      if (i === 0) {
        terms.push(`${c}`);
      } else if (i === 1) {
        terms.push(c === 1 ? "x" : c === -1 ? "-x" : `${c}x`);
      } else {
        terms.push(c === 1 ? `x^${i}` : c === -1 ? `-x^${i}` : `${c}x^${i}`);
      }
    }
    return terms.join(" + ").replace(/\+ -/g, "- ");
  }

  isEqual(other: Polynomial): boolean {
    if (this.coeffs.length !== other.coeffs.length) return false;
    return this.coeffs.every((c, i) => Math.abs(c - other.coeffs[i]) < 1e-10);
  }
}

export function fromRoots(...roots: number[]): Polynomial {
  let result = new Polynomial([1]);
  for (const r of roots) {
    result = result.multiply(new Polynomial([-r, 1]));
  }
  return result;
}

export function lagrangeInterpolation(points: [number, number][]): Polynomial {
  let result = new Polynomial([0]);
  for (let i = 0; i < points.length; i++) {
    let basis = new Polynomial([1]);
    let denom = 1;
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      basis = basis.multiply(new Polynomial([-points[j][0], 1]));
      denom *= points[i][0] - points[j][0];
    }
    result = result.add(basis.scale(points[i][1] / denom));
  }
  return result;
}
