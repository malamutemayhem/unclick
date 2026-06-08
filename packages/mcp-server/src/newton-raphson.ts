export interface NewtonResult {
  root: number;
  iterations: number;
  converged: boolean;
}

export class NewtonRaphson {
  static solve(
    f: (x: number) => number,
    df: (x: number) => number,
    x0: number,
    tolerance: number = 1e-10,
    maxIterations: number = 100
  ): NewtonResult {
    let x = x0;
    for (let i = 0; i < maxIterations; i++) {
      const fx = f(x);
      if (Math.abs(fx) < tolerance) {
        return { root: x, iterations: i, converged: true };
      }
      const dfx = df(x);
      if (Math.abs(dfx) < 1e-15) {
        return { root: x, iterations: i, converged: false };
      }
      x = x - fx / dfx;
    }
    return { root: x, iterations: maxIterations, converged: Math.abs(f(x)) < tolerance };
  }

  static solveNumericalDerivative(
    f: (x: number) => number,
    x0: number,
    tolerance: number = 1e-10,
    maxIterations: number = 100,
    h: number = 1e-8
  ): NewtonResult {
    const df = (x: number) => (f(x + h) - f(x - h)) / (2 * h);
    return this.solve(f, df, x0, tolerance, maxIterations);
  }

  static sqrt(n: number, tolerance: number = 1e-10): number {
    if (n < 0) return NaN;
    if (n === 0) return 0;
    const result = this.solve(
      (x) => x * x - n,
      (x) => 2 * x,
      n / 2,
      tolerance
    );
    return result.root;
  }

  static nthRoot(n: number, k: number, tolerance: number = 1e-10): number {
    if (k <= 0) return NaN;
    const result = this.solve(
      (x) => Math.pow(x, k) - n,
      (x) => k * Math.pow(x, k - 1),
      n > 0 ? 1 : -1,
      tolerance
    );
    return result.root;
  }
}
