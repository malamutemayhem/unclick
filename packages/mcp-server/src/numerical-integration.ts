export type IntegrandFunc = (x: number) => number;

export function trapezoid(f: IntegrandFunc, a: number, b: number, n = 100): number {
  const h = (b - a) / n;
  let sum = (f(a) + f(b)) / 2;
  for (let i = 1; i < n; i++) {
    sum += f(a + i * h);
  }
  return sum * h;
}

export function simpson(f: IntegrandFunc, a: number, b: number, n = 100): number {
  const adjustedN = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / adjustedN;
  let sum = f(a) + f(b);

  for (let i = 1; i < adjustedN; i++) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * f(x);
  }

  return (sum * h) / 3;
}

export function midpointRule(f: IntegrandFunc, a: number, b: number, n = 100): number {
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += f(a + (i + 0.5) * h);
  }
  return sum * h;
}

export function gaussLegendre2(f: IntegrandFunc, a: number, b: number): number {
  const mid = (a + b) / 2;
  const halfWidth = (b - a) / 2;
  const x1 = mid - halfWidth / Math.sqrt(3);
  const x2 = mid + halfWidth / Math.sqrt(3);
  return halfWidth * (f(x1) + f(x2));
}

export function gaussLegendre3(f: IntegrandFunc, a: number, b: number): number {
  const mid = (a + b) / 2;
  const halfWidth = (b - a) / 2;
  const sqrt35 = Math.sqrt(3 / 5);
  const x1 = mid - halfWidth * sqrt35;
  const x2 = mid;
  const x3 = mid + halfWidth * sqrt35;
  return halfWidth * ((5 / 9) * f(x1) + (8 / 9) * f(x2) + (5 / 9) * f(x3));
}

export function adaptiveSimpson(
  f: IntegrandFunc,
  a: number,
  b: number,
  tol = 1e-8,
  maxDepth = 50
): number {
  function simpsonVal(lo: number, hi: number): number {
    const mid = (lo + hi) / 2;
    const h = hi - lo;
    return (h / 6) * (f(lo) + 4 * f(mid) + f(hi));
  }

  function recurse(lo: number, hi: number, whole: number, depth: number): number {
    const mid = (lo + hi) / 2;
    const left = simpsonVal(lo, mid);
    const right = simpsonVal(mid, hi);
    const refined = left + right;

    if (depth >= maxDepth || Math.abs(refined - whole) < 15 * tol) {
      return refined + (refined - whole) / 15;
    }

    return recurse(lo, mid, left, depth + 1) + recurse(mid, hi, right, depth + 1);
  }

  return recurse(a, b, simpsonVal(a, b), 0);
}

export function romberg(f: IntegrandFunc, a: number, b: number, maxOrder = 8): number {
  const R: number[][] = [];

  for (let i = 0; i <= maxOrder; i++) {
    R.push(new Array(maxOrder + 1).fill(0));
    const n = 1 << i;
    R[i][0] = trapezoid(f, a, b, n);

    for (let j = 1; j <= i; j++) {
      const factor = Math.pow(4, j);
      R[i][j] = (factor * R[i][j - 1] - R[i - 1][j - 1]) / (factor - 1);
    }
  }

  return R[maxOrder][maxOrder];
}

export function monteCarloIntegrate(
  f: IntegrandFunc,
  a: number,
  b: number,
  samples = 10000,
  seed = 42
): { estimate: number; variance: number } {
  let s = seed;
  const rng = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };

  const width = b - a;
  let sum = 0;
  let sumSq = 0;

  for (let i = 0; i < samples; i++) {
    const x = a + rng() * width;
    const val = f(x);
    sum += val;
    sumSq += val * val;
  }

  const mean = sum / samples;
  const estimate = width * mean;
  const variance = width * width * (sumSq / samples - mean * mean) / samples;

  return { estimate, variance };
}
