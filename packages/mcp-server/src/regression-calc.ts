export interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  correlation: number;
  predict: (x: number) => number;
}

export class RegressionCalc {
  static linear(points: Array<{ x: number; y: number }>): RegressionResult {
    const n = points.length;
    if (n < 2) {
      return { slope: 0, intercept: 0, rSquared: 0, correlation: 0, predict: () => 0 };
    }

    const sumX = points.reduce((s, p) => s + p.x, 0);
    const sumY = points.reduce((s, p) => s + p.y, 0);
    const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
    const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
    const sumY2 = points.reduce((s, p) => s + p.y * p.y, 0);

    const denom = n * sumX2 - sumX * sumX;
    const slope = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    const meanY = sumY / n;
    const ssRes = points.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
    const ssTot = points.reduce((s, p) => s + (p.y - meanY) ** 2, 0);
    const rSquared = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

    const corrDenom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
    const correlation = corrDenom === 0 ? 0 : (n * sumXY - sumX * sumY) / corrDenom;

    return {
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 10000) / 10000,
      rSquared: Math.round(rSquared * 10000) / 10000,
      correlation: Math.round(correlation * 10000) / 10000,
      predict: (x: number) => Math.round((slope * x + intercept) * 10000) / 10000,
    };
  }

  static polynomial(points: Array<{ x: number; y: number }>, degree: number = 2): {
    coefficients: number[];
    predict: (x: number) => number;
  } {
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

    for (let i = 0; i < size; i++) {
      let maxRow = i;
      for (let k = i + 1; k < size; k++) {
        if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) maxRow = k;
      }
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

      if (Math.abs(matrix[i][i]) < 1e-10) continue;
      for (let k = i + 1; k < size; k++) {
        const factor = matrix[k][i] / matrix[i][i];
        for (let j = i; j <= size; j++) {
          matrix[k][j] -= factor * matrix[i][j];
        }
      }
    }

    const coefficients = new Array(size).fill(0);
    for (let i = size - 1; i >= 0; i--) {
      coefficients[i] = matrix[i][size];
      for (let j = i + 1; j < size; j++) {
        coefficients[i] -= matrix[i][j] * coefficients[j];
      }
      if (Math.abs(matrix[i][i]) > 1e-10) {
        coefficients[i] /= matrix[i][i];
      }
    }

    return {
      coefficients: coefficients.map((c) => Math.round(c * 10000) / 10000),
      predict: (x: number) => {
        let result = 0;
        for (let i = 0; i < coefficients.length; i++) {
          result += coefficients[i] * Math.pow(x, i);
        }
        return Math.round(result * 10000) / 10000;
      },
    };
  }

  static residuals(points: Array<{ x: number; y: number }>, result: RegressionResult): number[] {
    return points.map((p) => Math.round((p.y - result.predict(p.x)) * 10000) / 10000);
  }

  static standardError(points: Array<{ x: number; y: number }>, result: RegressionResult): number {
    const residuals = RegressionCalc.residuals(points, result);
    const sse = residuals.reduce((s, r) => s + r * r, 0);
    return Math.round(Math.sqrt(sse / (points.length - 2)) * 10000) / 10000;
  }
}
