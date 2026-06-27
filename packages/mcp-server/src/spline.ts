export interface SplinePoint {
  x: number;
  y: number;
}

export class Spline {
  static cubicNatural(points: SplinePoint[]): (t: number) => SplinePoint {
    const n = points.length - 1;
    if (n < 1) return () => points[0] || { x: 0, y: 0 };

    const hx = Spline.computeCoeffs(points.map(p => p.x));
    const hy = Spline.computeCoeffs(points.map(p => p.y));

    return (t: number) => {
      const s = Math.max(0, Math.min(n, t * n));
      const i = Math.min(Math.floor(s), n - 1);
      const u = s - i;
      return {
        x: Math.round((hx.a[i] + hx.b[i] * u + hx.c[i] * u * u + hx.d[i] * u * u * u) * 10000) / 10000,
        y: Math.round((hy.a[i] + hy.b[i] * u + hy.c[i] * u * u + hy.d[i] * u * u * u) * 10000) / 10000,
      };
    };
  }

  static interpolate(points: SplinePoint[], numSamples: number): SplinePoint[] {
    const curve = Spline.cubicNatural(points);
    return Array.from({ length: numSamples }, (_, i) => curve(i / (numSamples - 1)));
  }

  static linearInterp(points: SplinePoint[], t: number): SplinePoint {
    const n = points.length - 1;
    const s = Math.max(0, Math.min(n, t * n));
    const i = Math.min(Math.floor(s), n - 1);
    const u = s - i;
    return {
      x: Math.round((points[i].x + (points[i + 1].x - points[i].x) * u) * 10000) / 10000,
      y: Math.round((points[i].y + (points[i + 1].y - points[i].y) * u) * 10000) / 10000,
    };
  }

  static length(points: SplinePoint[], segments = 100): number {
    const curve = Spline.cubicNatural(points);
    let total = 0;
    let prev = curve(0);
    for (let i = 1; i <= segments; i++) {
      const curr = curve(i / segments);
      total += Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2);
      prev = curr;
    }
    return Math.round(total * 10000) / 10000;
  }

  static derivative(points: SplinePoint[], t: number, dt = 0.001): SplinePoint {
    const curve = Spline.cubicNatural(points);
    const a = curve(Math.max(0, t - dt));
    const b = curve(Math.min(1, t + dt));
    const d = 2 * dt;
    return {
      x: Math.round(((b.x - a.x) / d) * 10000) / 10000,
      y: Math.round(((b.y - a.y) / d) * 10000) / 10000,
    };
  }

  private static computeCoeffs(vals: number[]): { a: number[]; b: number[]; c: number[]; d: number[] } {
    const n = vals.length - 1;
    const a = [...vals];
    const b = new Array(n).fill(0);
    const d = new Array(n).fill(0);
    const c = new Array(n + 1).fill(0);

    const h = new Array(n).fill(1);
    const alpha = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
      alpha[i] = 3 * ((a[i + 1] - a[i]) / h[i] - (a[i] - a[i - 1]) / h[i - 1]);
    }

    const l = new Array(n + 1).fill(1);
    const mu = new Array(n + 1).fill(0);
    const z = new Array(n + 1).fill(0);

    for (let i = 1; i < n; i++) {
      l[i] = 2 * (h[i - 1] + h[i]) - h[i - 1] * mu[i - 1];
      mu[i] = h[i] / l[i];
      z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    for (let j = n - 1; j >= 0; j--) {
      c[j] = z[j] - mu[j] * c[j + 1];
      b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
      d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    return { a, b, c, d };
  }
}
