export class LagrangeInterp {
  private xs: number[];
  private ys: number[];

  constructor(xs: number[], ys: number[]) {
    this.xs = [...xs];
    this.ys = [...ys];
  }

  evaluate(x: number): number {
    const n = this.xs.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
      let basis = this.ys[i];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          basis *= (x - this.xs[j]) / (this.xs[i] - this.xs[j]);
        }
      }
      result += basis;
    }

    return result;
  }

  degree(): number {
    return this.xs.length - 1;
  }

  addPoint(x: number, y: number): void {
    this.xs.push(x);
    this.ys.push(y);
  }

  static fromFunction(f: (x: number) => number, a: number, b: number, n: number): LagrangeInterp {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n;
      xs.push(x);
      ys.push(f(x));
    }
    return new LagrangeInterp(xs, ys);
  }

  static chebyshevNodes(a: number, b: number, n: number): number[] {
    const nodes: number[] = [];
    for (let k = 0; k < n; k++) {
      const theta = (2 * k + 1) / (2 * n) * Math.PI;
      nodes.push((a + b) / 2 + (b - a) / 2 * Math.cos(theta));
    }
    return nodes;
  }

  static fromChebyshev(f: (x: number) => number, a: number, b: number, n: number): LagrangeInterp {
    const xs = this.chebyshevNodes(a, b, n);
    const ys = xs.map(f);
    return new LagrangeInterp(xs, ys);
  }

  maxError(f: (x: number) => number, samples: number = 100): number {
    const a = Math.min(...this.xs);
    const b = Math.max(...this.xs);
    let maxErr = 0;
    for (let i = 0; i <= samples; i++) {
      const x = a + (b - a) * i / samples;
      maxErr = Math.max(maxErr, Math.abs(f(x) - this.evaluate(x)));
    }
    return maxErr;
  }
}
