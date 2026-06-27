export interface Point {
  x: number;
  y: number;
}

export interface FitResult {
  coefficients: number[];
  rSquared: number;
  predict: (x: number) => number;
}

export function linearFit(points: Point[]): FitResult {
  const n = points.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const predict = (x: number) => slope * x + intercept;
  const rSquared = computeRSquared(points, predict);

  return { coefficients: [intercept, slope], rSquared, predict };
}

export function quadraticFit(points: Point[]): FitResult {
  return polynomialFit(points, 2);
}

export function polynomialFit(points: Point[], degree: number): FitResult {
  const n = points.length;
  const size = degree + 1;

  const matrix: number[][] = Array.from({ length: size }, () => new Array(size + 1).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (const p of points) {
        matrix[i][j] += Math.pow(p.x, i + j);
      }
    }
    for (const p of points) {
      matrix[i][size] += p.y * Math.pow(p.x, i);
    }
  }

  const coefficients = solveSystem(matrix, size);

  const predict = (x: number) => {
    let result = 0;
    for (let i = 0; i < coefficients.length; i++) {
      result += coefficients[i] * Math.pow(x, i);
    }
    return result;
  };

  const rSquared = computeRSquared(points, predict);
  return { coefficients, rSquared, predict };
}

function solveSystem(matrix: number[][], size: number): number[] {
  for (let col = 0; col < size; col++) {
    let maxRow = col;
    for (let row = col + 1; row < size; row++) {
      if (Math.abs(matrix[row][col]) > Math.abs(matrix[maxRow][col])) {
        maxRow = row;
      }
    }
    [matrix[col], matrix[maxRow]] = [matrix[maxRow], matrix[col]];

    const pivot = matrix[col][col];
    if (Math.abs(pivot) < 1e-12) continue;

    for (let j = col; j <= size; j++) {
      matrix[col][j] /= pivot;
    }

    for (let row = 0; row < size; row++) {
      if (row === col) continue;
      const factor = matrix[row][col];
      for (let j = col; j <= size; j++) {
        matrix[row][j] -= factor * matrix[col][j];
      }
    }
  }

  return matrix.map(row => row[size]);
}

function computeRSquared(points: Point[], predict: (x: number) => number): number {
  const meanY = points.reduce((s, p) => s + p.y, 0) / points.length;
  let ssRes = 0, ssTot = 0;

  for (const p of points) {
    const predicted = predict(p.x);
    ssRes += (p.y - predicted) ** 2;
    ssTot += (p.y - meanY) ** 2;
  }

  return ssTot === 0 ? 1 : 1 - ssRes / ssTot;
}

export function exponentialFit(points: Point[]): FitResult {
  const logPoints = points
    .filter(p => p.y > 0)
    .map(p => ({ x: p.x, y: Math.log(p.y) }));

  const linear = linearFit(logPoints);
  const a = Math.exp(linear.coefficients[0]);
  const b = linear.coefficients[1];

  const predict = (x: number) => a * Math.exp(b * x);
  const rSquared = computeRSquared(points, predict);

  return { coefficients: [a, b], rSquared, predict };
}

export function powerFit(points: Point[]): FitResult {
  const logPoints = points
    .filter(p => p.x > 0 && p.y > 0)
    .map(p => ({ x: Math.log(p.x), y: Math.log(p.y) }));

  const linear = linearFit(logPoints);
  const a = Math.exp(linear.coefficients[0]);
  const b = linear.coefficients[1];

  const predict = (x: number) => a * Math.pow(x, b);
  const rSquared = computeRSquared(points, predict);

  return { coefficients: [a, b], rSquared, predict };
}

export function residuals(points: Point[], predict: (x: number) => number): number[] {
  return points.map(p => p.y - predict(p.x));
}

export function rootMeanSquareError(points: Point[], predict: (x: number) => number): number {
  const res = residuals(points, predict);
  const mse = res.reduce((s, r) => s + r * r, 0) / res.length;
  return Math.sqrt(mse);
}
