export interface Point2D {
  x: number;
  y: number;
}

function cross(o: Point2D, a: Point2D, b: Point2D): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

export function convexHull(points: Point2D[]): Point2D[] {
  if (points.length <= 1) return [...points];
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const n = sorted.length;

  const lower: Point2D[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point2D[] = [];
  for (let i = n - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], sorted[i]) <= 0) {
      upper.pop();
    }
    upper.push(sorted[i]);
  }

  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

export function isInsideHull(hull: Point2D[], point: Point2D): boolean {
  const n = hull.length;
  if (n < 3) return false;
  for (let i = 0; i < n; i++) {
    if (cross(hull[i], hull[(i + 1) % n], point) < 0) return false;
  }
  return true;
}

export function hullArea(hull: Point2D[]): number {
  let area = 0;
  const n = hull.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += hull[i].x * hull[j].y;
    area -= hull[j].x * hull[i].y;
  }
  return Math.abs(area) / 2;
}

export function hullPerimeter(hull: Point2D[]): number {
  let perimeter = 0;
  const n = hull.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const dx = hull[j].x - hull[i].x;
    const dy = hull[j].y - hull[i].y;
    perimeter += Math.sqrt(dx * dx + dy * dy);
  }
  return perimeter;
}

export function centroid(hull: Point2D[]): Point2D {
  let cx = 0;
  let cy = 0;
  for (const p of hull) {
    cx += p.x;
    cy += p.y;
  }
  return { x: cx / hull.length, y: cy / hull.length };
}
