export interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
}

export class LinearRegression {
  static fit(xs: number[], ys: number[]): RegressionResult {
    const n = xs.length;
    const sumX = xs.reduce((s, x) => s + x, 0);
    const sumY = ys.reduce((s, y) => s + y, 0);
    const sumXY = xs.reduce((s, x, i) => s + x * ys[i], 0);
    const sumX2 = xs.reduce((s, x) => s + x * x, 0);
    const meanY = sumY / n;

    const denom = n * sumX2 - sumX * sumX;
    if (Math.abs(denom) < 1e-15) {
      return { slope: 0, intercept: meanY, rSquared: 0 };
    }

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    const ssRes = ys.reduce((s, y, i) => s + (y - (slope * xs[i] + intercept)) ** 2, 0);
    const ssTot = ys.reduce((s, y) => s + (y - meanY) ** 2, 0);
    const rSquared = ssTot > 0 ? 1 - ssRes / ssTot : 1;

    return { slope, intercept, rSquared };
  }

  static predict(model: RegressionResult, x: number): number {
    return model.slope * x + model.intercept;
  }

  static residuals(xs: number[], ys: number[], model: RegressionResult): number[] {
    return ys.map((y, i) => y - this.predict(model, xs[i]));
  }

  static correlation(xs: number[], ys: number[]): number {
    const n = xs.length;
    const meanX = xs.reduce((s, x) => s + x, 0) / n;
    const meanY = ys.reduce((s, y) => s + y, 0) / n;
    let num = 0;
    let denX = 0;
    let denY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - meanX;
      const dy = ys[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    const denom = Math.sqrt(denX * denY);
    return denom > 0 ? num / denom : 0;
  }

  static standardError(xs: number[], ys: number[], model: RegressionResult): number {
    const res = this.residuals(xs, ys, model);
    const sse = res.reduce((s, r) => s + r * r, 0);
    return Math.sqrt(sse / (xs.length - 2));
  }
}
