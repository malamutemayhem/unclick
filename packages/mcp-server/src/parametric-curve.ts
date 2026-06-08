export interface CurvePoint {
  x: number;
  y: number;
}

export class ParametricCurve {
  static evaluate(
    xFn: (t: number) => number,
    yFn: (t: number) => number,
    tStart: number,
    tEnd: number,
    samples: number,
  ): CurvePoint[] {
    const points: CurvePoint[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = tStart + (tEnd - tStart) * i / samples;
      points.push({
        x: Math.round(xFn(t) * 10000) / 10000,
        y: Math.round(yFn(t) * 10000) / 10000,
      });
    }
    return points;
  }

  static circle(radius: number, center: CurvePoint = { x: 0, y: 0 }, samples = 64): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => center.x + radius * Math.cos(t),
      t => center.y + radius * Math.sin(t),
      0, 2 * Math.PI, samples,
    );
  }

  static ellipse(a: number, b: number, center: CurvePoint = { x: 0, y: 0 }, samples = 64): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => center.x + a * Math.cos(t),
      t => center.y + b * Math.sin(t),
      0, 2 * Math.PI, samples,
    );
  }

  static lissajous(a: number, b: number, delta: number, samples = 200): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => Math.sin(a * t + delta),
      t => Math.sin(b * t),
      0, 2 * Math.PI, samples,
    );
  }

  static spiral(turns: number, maxRadius: number, samples = 200): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => t * maxRadius * Math.cos(t * 2 * Math.PI * turns),
      t => t * maxRadius * Math.sin(t * 2 * Math.PI * turns),
      0, 1, samples,
    );
  }

  static rose(petals: number, radius = 1, samples = 200): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => radius * Math.cos(petals * t) * Math.cos(t),
      t => radius * Math.cos(petals * t) * Math.sin(t),
      0, 2 * Math.PI, samples,
    );
  }

  static heart(size = 1, samples = 200): CurvePoint[] {
    return ParametricCurve.evaluate(
      t => size * 16 * Math.pow(Math.sin(t), 3),
      t => size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
      0, 2 * Math.PI, samples,
    );
  }

  static arcLength(points: CurvePoint[]): number {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += Math.sqrt(
        (points[i].x - points[i - 1].x) ** 2 +
        (points[i].y - points[i - 1].y) ** 2,
      );
    }
    return Math.round(total * 10000) / 10000;
  }

  static boundingBox(points: CurvePoint[]): { minX: number; minY: number; maxX: number; maxY: number } {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    return { minX, minY, maxX, maxY };
  }
}
