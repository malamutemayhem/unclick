import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Point {
  x: number;
  y: number;
}

function cross(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

export async function convexHull(args: Record<string, unknown>) {
  const raw = args.points as unknown[];
  if (!Array.isArray(raw) || raw.length < 3) {
    throw new Error("points must be an array of at least 3 [x, y] pairs.");
  }
  if (raw.length > 50000) {
    throw new Error("Maximum 50000 points supported.");
  }

  const points: Point[] = raw.map((p) => {
    if (!Array.isArray(p) || p.length < 2) {
      throw new Error("Each point must be [x, y].");
    }
    return { x: Number(p[0]), y: Number(p[1]) };
  });

  points.sort((a, b) => a.x - b.x || a.y - b.y);

  const lower: Point[] = [];
  for (const p of points) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point[] = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  lower.pop();
  upper.pop();
  const hull = lower.concat(upper);

  let area = 0;
  for (let i = 0; i < hull.length; i++) {
    const j = (i + 1) % hull.length;
    area += hull[i].x * hull[j].y;
    area -= hull[j].x * hull[i].y;
  }
  area = Math.abs(area) / 2;

  let perimeter = 0;
  for (let i = 0; i < hull.length; i++) {
    const j = (i + 1) % hull.length;
    perimeter += Math.hypot(hull[j].x - hull[i].x, hull[j].y - hull[i].y);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use area_calculate for standard shapes", "Use midpoint_calc for center estimation"],
  };
  return stampMeta(
    {
      hull: hull.map((p) => [p.x, p.y]),
      hull_size: hull.length,
      input_size: raw.length,
      area: Math.round(area * 1e6) / 1e6,
      perimeter: Math.round(perimeter * 1e6) / 1e6,
    },
    meta,
  );
}
