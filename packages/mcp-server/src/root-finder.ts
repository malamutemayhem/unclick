export type ScalarFunc = (x: number) => number;

export interface RootResult {
  root: number;
  iterations: number;
  converged: boolean;
}

export function bisection(f: ScalarFunc, a: number, b: number, tol = 1e-10, maxIter = 100): RootResult {
  let lo = a;
  let hi = b;
  let mid = (lo + hi) / 2;

  for (let i = 0; i < maxIter; i++) {
    mid = (lo + hi) / 2;
    const fMid = f(mid);

    if (Math.abs(fMid) < tol || (hi - lo) / 2 < tol) {
      return { root: mid, iterations: i + 1, converged: true };
    }

    if (f(lo) * fMid < 0) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return { root: mid, iterations: maxIter, converged: false };
}

export function newtonRaphson(
  f: ScalarFunc,
  fPrime: ScalarFunc,
  x0: number,
  tol = 1e-10,
  maxIter = 100
): RootResult {
  let x = x0;

  for (let i = 0; i < maxIter; i++) {
    const fx = f(x);
    if (Math.abs(fx) < tol) {
      return { root: x, iterations: i + 1, converged: true };
    }

    const fpx = fPrime(x);
    if (Math.abs(fpx) < 1e-15) {
      return { root: x, iterations: i + 1, converged: false };
    }

    x = x - fx / fpx;
  }

  return { root: x, iterations: maxIter, converged: false };
}

export function secant(f: ScalarFunc, x0: number, x1: number, tol = 1e-10, maxIter = 100): RootResult {
  let xPrev = x0;
  let xCurr = x1;

  for (let i = 0; i < maxIter; i++) {
    const fPrev = f(xPrev);
    const fCurr = f(xCurr);

    if (Math.abs(fCurr) < tol) {
      return { root: xCurr, iterations: i + 1, converged: true };
    }

    const denom = fCurr - fPrev;
    if (Math.abs(denom) < 1e-15) {
      return { root: xCurr, iterations: i + 1, converged: false };
    }

    const xNext = xCurr - fCurr * (xCurr - xPrev) / denom;
    xPrev = xCurr;
    xCurr = xNext;
  }

  return { root: xCurr, iterations: maxIter, converged: false };
}

export function regulaFalsi(f: ScalarFunc, a: number, b: number, tol = 1e-10, maxIter = 100): RootResult {
  let lo = a;
  let hi = b;
  let fLo = f(lo);
  let fHi = f(hi);
  let c = lo;

  for (let i = 0; i < maxIter; i++) {
    c = (lo * fHi - hi * fLo) / (fHi - fLo);
    const fC = f(c);

    if (Math.abs(fC) < tol) {
      return { root: c, iterations: i + 1, converged: true };
    }

    if (fLo * fC < 0) {
      hi = c;
      fHi = fC;
    } else {
      lo = c;
      fLo = fC;
    }
  }

  return { root: c, iterations: maxIter, converged: false };
}

export function fixedPoint(g: ScalarFunc, x0: number, tol = 1e-10, maxIter = 100): RootResult {
  let x = x0;

  for (let i = 0; i < maxIter; i++) {
    const xNext = g(x);
    if (Math.abs(xNext - x) < tol) {
      return { root: xNext, iterations: i + 1, converged: true };
    }
    x = xNext;
  }

  return { root: x, iterations: maxIter, converged: false };
}

export function numericalDerivative(f: ScalarFunc, x: number, h = 1e-8): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}
