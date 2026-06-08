export class Interpolation {
  static linear(t: number, a: number, b: number): number {
    return a + (b - a) * t;
  }

  static bilinear(tx: number, ty: number, c00: number, c10: number, c01: number, c11: number): number {
    const a = Interpolation.linear(tx, c00, c10);
    const b = Interpolation.linear(tx, c01, c11);
    return Interpolation.linear(ty, a, b);
  }

  static cosine(t: number, a: number, b: number): number {
    const t2 = (1 - Math.cos(t * Math.PI)) / 2;
    return a * (1 - t2) + b * t2;
  }

  static cubic(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
      (2 * p1) +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
  }

  static hermite(t: number, p0: number, p1: number, m0: number, m1: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    return h00 * p0 + h10 * m0 + h01 * p1 + h11 * m1;
  }

  static bezierQuadratic(t: number, p0: number, p1: number, p2: number): number {
    const u = 1 - t;
    return u * u * p0 + 2 * u * t * p1 + t * t * p2;
  }

  static bezierCubic(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const u = 1 - t;
    const u2 = u * u;
    const t2 = t * t;
    return u2 * u * p0 + 3 * u2 * t * p1 + 3 * u * t2 * p2 + t2 * t * p3;
  }

  static smoothstep(t: number): number {
    const c = Math.max(0, Math.min(1, t));
    return c * c * (3 - 2 * c);
  }

  static smootherstep(t: number): number {
    const c = Math.max(0, Math.min(1, t));
    return c * c * c * (c * (c * 6 - 15) + 10);
  }

  static remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const t = (value - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  static inverseLerp(a: number, b: number, value: number): number {
    if (a === b) return 0;
    return (value - a) / (b - a);
  }
}

export class SplineInterpolator {
  private points: Array<{ x: number; y: number }> = [];

  addPoint(x: number, y: number): void {
    this.points.push({ x, y });
    this.points.sort((a, b) => a.x - b.x);
  }

  evaluate(x: number): number {
    if (this.points.length === 0) return 0;
    if (this.points.length === 1) return this.points[0].y;

    if (x <= this.points[0].x) return this.points[0].y;
    if (x >= this.points[this.points.length - 1].x) return this.points[this.points.length - 1].y;

    let i = 0;
    while (i < this.points.length - 1 && this.points[i + 1].x < x) i++;

    const p0 = this.points[i];
    const p1 = this.points[i + 1];
    const t = (x - p0.x) / (p1.x - p0.x);
    return Interpolation.linear(t, p0.y, p1.y);
  }

  pointCount(): number {
    return this.points.length;
  }

  getPoints(): Array<{ x: number; y: number }> {
    return [...this.points];
  }
}
