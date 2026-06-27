export interface Point2D {
  x: number;
  y: number;
  t?: number;
}

export class GestureRecognizer {
  static distance(a: Point2D, b: Point2D): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  static pathLength(points: Point2D[]): number {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += GestureRecognizer.distance(points[i - 1], points[i]);
    }
    return Math.round(total * 10000) / 10000;
  }

  static boundingBox(points: Point2D[]): { x: number; y: number; width: number; height: number } {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  static centroid(points: Point2D[]): Point2D {
    let sx = 0, sy = 0;
    for (const p of points) { sx += p.x; sy += p.y; }
    return {
      x: Math.round((sx / points.length) * 10000) / 10000,
      y: Math.round((sy / points.length) * 10000) / 10000,
    };
  }

  static direction(start: Point2D, end: Point2D): string {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if (angle > -45 && angle <= 45) return "right";
    if (angle > 45 && angle <= 135) return "down";
    if (angle > -135 && angle <= -45) return "up";
    return "left";
  }

  static classify(points: Point2D[]): string {
    if (points.length < 2) return "tap";

    const len = GestureRecognizer.pathLength(points);
    const bb = GestureRecognizer.boundingBox(points);
    const diag = Math.sqrt(bb.width ** 2 + bb.height ** 2);

    if (diag < 20) return "tap";

    const ratio = bb.width / (bb.height || 1);
    const start = points[0];
    const end = points[points.length - 1];
    const directDist = GestureRecognizer.distance(start, end);

    if (directDist < diag * 0.3) {
      if (ratio > 0.7 && ratio < 1.3) return "circle";
      return "closed-shape";
    }

    if (len / directDist > 2) return "zigzag";

    if (ratio > 2) return `swipe-${GestureRecognizer.direction(start, end)}`;
    if (ratio < 0.5) return `swipe-${GestureRecognizer.direction(start, end)}`;

    return `swipe-${GestureRecognizer.direction(start, end)}`;
  }

  static resample(points: Point2D[], n: number): Point2D[] {
    const totalLen = GestureRecognizer.pathLength(points);
    const interval = totalLen / (n - 1);
    const result: Point2D[] = [points[0]];
    let accumulated = 0;
    let j = 1;

    for (let i = 1; i < n - 1; i++) {
      const target = interval * i;
      while (j < points.length) {
        const d = GestureRecognizer.distance(points[j - 1], points[j]);
        if (accumulated + d >= target) {
          const ratio = (target - accumulated) / d;
          result.push({
            x: Math.round((points[j - 1].x + ratio * (points[j].x - points[j - 1].x)) * 10000) / 10000,
            y: Math.round((points[j - 1].y + ratio * (points[j].y - points[j - 1].y)) * 10000) / 10000,
          });
          break;
        }
        accumulated += d;
        j++;
      }
    }
    result.push(points[points.length - 1]);
    return result;
  }

  static velocity(points: Point2D[]): number {
    if (points.length < 2) return 0;
    const first = points[0];
    const last = points[points.length - 1];
    if (first.t === undefined || last.t === undefined || last.t === first.t) return 0;
    return Math.round((GestureRecognizer.pathLength(points) / (last.t - first.t)) * 10000) / 10000;
  }
}
