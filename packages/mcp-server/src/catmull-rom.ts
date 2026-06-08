export interface CRPoint {
  x: number;
  y: number;
}

export class CatmullRomSpline {
  private points: CRPoint[];
  private alpha: number;

  constructor(points: CRPoint[], alpha = 0.5) {
    this.points = [...points];
    this.alpha = alpha;
  }

  interpolate(segmentIndex: number, t: number): CRPoint {
    const n = this.points.length;
    if (n < 2) throw new Error("Need at least 2 points");

    const i0 = Math.max(segmentIndex - 1, 0);
    const i1 = segmentIndex;
    const i2 = Math.min(segmentIndex + 1, n - 1);
    const i3 = Math.min(segmentIndex + 2, n - 1);

    const p0 = this.points[i0];
    const p1 = this.points[i1];
    const p2 = this.points[i2];
    const p3 = this.points[i3];

    return CatmullRomSpline.interpolatePoints(p0, p1, p2, p3, t, this.alpha);
  }

  static interpolatePoints(p0: CRPoint, p1: CRPoint, p2: CRPoint, p3: CRPoint, t: number, _alpha = 0.5): CRPoint {
    const m1x = (p2.x - p0.x) / 2;
    const m1y = (p2.y - p0.y) / 2;
    const m2x = (p3.x - p1.x) / 2;
    const m2y = (p3.y - p1.y) / 2;

    const t2 = t * t;
    const t3 = t2 * t;

    const x = (2 * t3 - 3 * t2 + 1) * p1.x + (t3 - 2 * t2 + t) * m1x + (-2 * t3 + 3 * t2) * p2.x + (t3 - t2) * m2x;
    const y = (2 * t3 - 3 * t2 + 1) * p1.y + (t3 - 2 * t2 + t) * m1y + (-2 * t3 + 3 * t2) * p2.y + (t3 - t2) * m2y;

    return { x, y };
  }

  private static dist(a: CRPoint, b: CRPoint): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }

  generateCurve(samplesPerSegment = 20): CRPoint[] {
    const result: CRPoint[] = [];
    const n = this.points.length;
    if (n < 2) return [...this.points];

    for (let seg = 0; seg < n - 1; seg++) {
      for (let i = 0; i <= samplesPerSegment; i++) {
        if (seg > 0 && i === 0) continue;
        const t = i / samplesPerSegment;
        result.push(this.interpolate(seg, t));
      }
    }
    return result;
  }

  addPoint(point: CRPoint): void {
    this.points.push({ ...point });
  }

  getPoints(): CRPoint[] {
    return this.points.map((p) => ({ ...p }));
  }

  segmentCount(): number {
    return Math.max(0, this.points.length - 1);
  }

  totalLength(samplesPerSegment = 20): number {
    const curve = this.generateCurve(samplesPerSegment);
    let length = 0;
    for (let i = 1; i < curve.length; i++) {
      length += CatmullRomSpline.dist(curve[i - 1], curve[i]);
    }
    return length;
  }
}
