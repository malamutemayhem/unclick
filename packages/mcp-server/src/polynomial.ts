export class Polynomial {
  readonly coefficients: number[];

  constructor(coefficients: number[]) {
    this.coefficients = [...coefficients];
    while (this.coefficients.length > 1 && this.coefficients[this.coefficients.length - 1] === 0) {
      this.coefficients.pop();
    }
  }

  get degree(): number {
    return Math.max(0, this.coefficients.length - 1);
  }

  evaluate(x: number): number {
    let result = 0;
    let power = 1;
    for (const coeff of this.coefficients) {
      result += coeff * power;
      power *= x;
    }
    return result;
  }

  add(other: Polynomial): Polynomial {
    const len = Math.max(this.coefficients.length, other.coefficients.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < this.coefficients.length; i++) result[i] += this.coefficients[i];
    for (let i = 0; i < other.coefficients.length; i++) result[i] += other.coefficients[i];
    return new Polynomial(result);
  }

  sub(other: Polynomial): Polynomial {
    const len = Math.max(this.coefficients.length, other.coefficients.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < this.coefficients.length; i++) result[i] += this.coefficients[i];
    for (let i = 0; i < other.coefficients.length; i++) result[i] -= other.coefficients[i];
    return new Polynomial(result);
  }

  mul(other: Polynomial): Polynomial {
    const result = new Array(this.coefficients.length + other.coefficients.length - 1).fill(0);
    for (let i = 0; i < this.coefficients.length; i++) {
      for (let j = 0; j < other.coefficients.length; j++) {
        result[i + j] += this.coefficients[i] * other.coefficients[j];
      }
    }
    return new Polynomial(result);
  }

  scale(s: number): Polynomial {
    return new Polynomial(this.coefficients.map((c) => c * s));
  }

  derivative(): Polynomial {
    if (this.coefficients.length <= 1) return new Polynomial([0]);
    const result: number[] = [];
    for (let i = 1; i < this.coefficients.length; i++) {
      result.push(this.coefficients[i] * i);
    }
    return new Polynomial(result);
  }

  integral(constant = 0): Polynomial {
    const result = [constant];
    for (let i = 0; i < this.coefficients.length; i++) {
      result.push(this.coefficients[i] / (i + 1));
    }
    return new Polynomial(result);
  }

  roots(): number[] {
    if (this.degree === 1) {
      return [-this.coefficients[0] / this.coefficients[1]];
    }
    if (this.degree === 2) {
      const [c, b, a] = [this.coefficients[0], this.coefficients[1], this.coefficients[2]];
      const disc = b * b - 4 * a * c;
      if (disc < 0) return [];
      if (disc === 0) return [-b / (2 * a)];
      const sq = Math.sqrt(disc);
      return [(-b + sq) / (2 * a), (-b - sq) / (2 * a)];
    }
    return [];
  }

  toString(): string {
    if (this.coefficients.length === 1 && this.coefficients[0] === 0) return "0";
    const parts: string[] = [];
    for (let i = this.coefficients.length - 1; i >= 0; i--) {
      const c = this.coefficients[i];
      if (c === 0) continue;
      let term = "";
      if (i === 0) {
        term = String(c);
      } else if (i === 1) {
        term = c === 1 ? "x" : c === -1 ? "-x" : `${c}x`;
      } else {
        term = c === 1 ? `x^${i}` : c === -1 ? `-x^${i}` : `${c}x^${i}`;
      }
      parts.push(term);
    }
    return parts.join(" + ").replace(/\+ -/g, "- ");
  }
}

export function lagrangeInterpolation(points: [number, number][]): Polynomial {
  let result = new Polynomial([0]);
  for (let i = 0; i < points.length; i++) {
    let basis = new Polynomial([1]);
    let denom = 1;
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      basis = basis.mul(new Polynomial([-points[j][0], 1]));
      denom *= points[i][0] - points[j][0];
    }
    result = result.add(basis.scale(points[i][1] / denom));
  }
  return result;
}
