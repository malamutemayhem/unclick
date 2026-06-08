export interface BisectionResult {
  root: number;
  iterations: number;
  converged: boolean;
  bracket: [number, number];
}

export class BisectionMethod {
  static solve(
    f: (x: number) => number,
    a: number,
    b: number,
    tolerance: number = 1e-10,
    maxIterations: number = 100
  ): BisectionResult {
    let lo = a;
    let hi = b;
    let fa = f(lo);
    let fb = f(hi);

    if (fa * fb > 0) {
      return { root: NaN, iterations: 0, converged: false, bracket: [lo, hi] };
    }

    for (let i = 0; i < maxIterations; i++) {
      const mid = (lo + hi) / 2;
      const fm = f(mid);

      if (Math.abs(fm) < tolerance || (hi - lo) / 2 < tolerance) {
        return { root: mid, iterations: i + 1, converged: true, bracket: [lo, hi] };
      }

      if (fa * fm < 0) {
        hi = mid;
        fb = fm;
      } else {
        lo = mid;
        fa = fm;
      }
    }

    return { root: (lo + hi) / 2, iterations: maxIterations, converged: false, bracket: [lo, hi] };
  }

  static regulaFalsi(
    f: (x: number) => number,
    a: number,
    b: number,
    tolerance: number = 1e-10,
    maxIterations: number = 100
  ): BisectionResult {
    let lo = a;
    let hi = b;
    let fa = f(lo);
    let fb = f(hi);

    if (fa * fb > 0) {
      return { root: NaN, iterations: 0, converged: false, bracket: [lo, hi] };
    }

    for (let i = 0; i < maxIterations; i++) {
      const c = (lo * fb - hi * fa) / (fb - fa);
      const fc = f(c);

      if (Math.abs(fc) < tolerance) {
        return { root: c, iterations: i + 1, converged: true, bracket: [lo, hi] };
      }

      if (fa * fc < 0) {
        hi = c;
        fb = fc;
      } else {
        lo = c;
        fa = fc;
      }
    }

    return { root: (lo + hi) / 2, iterations: maxIterations, converged: false, bracket: [lo, hi] };
  }

  static secant(
    f: (x: number) => number,
    x0: number,
    x1: number,
    tolerance: number = 1e-10,
    maxIterations: number = 100
  ): BisectionResult {
    let xPrev = x0;
    let xCurr = x1;

    for (let i = 0; i < maxIterations; i++) {
      const fPrev = f(xPrev);
      const fCurr = f(xCurr);
      const denom = fCurr - fPrev;

      if (Math.abs(denom) < 1e-15) {
        return { root: xCurr, iterations: i, converged: false, bracket: [xPrev, xCurr] };
      }

      const xNext = xCurr - fCurr * (xCurr - xPrev) / denom;

      if (Math.abs(f(xNext)) < tolerance) {
        return { root: xNext, iterations: i + 1, converged: true, bracket: [xPrev, xCurr] };
      }

      xPrev = xCurr;
      xCurr = xNext;
    }

    return { root: xCurr, iterations: maxIterations, converged: false, bracket: [xPrev, xCurr] };
  }
}
