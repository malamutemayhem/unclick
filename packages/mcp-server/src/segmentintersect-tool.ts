import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Point {
  x: number;
  y: number;
}

interface Segment {
  p1: Point;
  p2: Point;
}

function cross(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function onSegment(p: Point, q: Point, r: Point): boolean {
  return (
    Math.min(p.x, r.x) <= q.x + 1e-10 &&
    q.x <= Math.max(p.x, r.x) + 1e-10 &&
    Math.min(p.y, r.y) <= q.y + 1e-10 &&
    q.y <= Math.max(p.y, r.y) + 1e-10
  );
}

function segmentsIntersect(s1: Segment, s2: Segment): boolean {
  const d1 = cross(s2.p1, s2.p2, s1.p1);
  const d2 = cross(s2.p1, s2.p2, s1.p2);
  const d3 = cross(s1.p1, s1.p2, s2.p1);
  const d4 = cross(s1.p1, s1.p2, s2.p2);

  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }

  if (Math.abs(d1) < 1e-10 && onSegment(s2.p1, s1.p1, s2.p2)) return true;
  if (Math.abs(d2) < 1e-10 && onSegment(s2.p1, s1.p2, s2.p2)) return true;
  if (Math.abs(d3) < 1e-10 && onSegment(s1.p1, s2.p1, s1.p2)) return true;
  if (Math.abs(d4) < 1e-10 && onSegment(s1.p1, s2.p2, s1.p2)) return true;

  return false;
}

function computeIntersectionPoint(s1: Segment, s2: Segment): Point | null {
  const a1 = s1.p2.y - s1.p1.y;
  const b1 = s1.p1.x - s1.p2.x;
  const c1 = a1 * s1.p1.x + b1 * s1.p1.y;

  const a2 = s2.p2.y - s2.p1.y;
  const b2 = s2.p1.x - s2.p2.x;
  const c2 = a2 * s2.p1.x + b2 * s2.p1.y;

  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-10) return null;

  return {
    x: (c1 * b2 - c2 * b1) / det,
    y: (a1 * c2 - a2 * c1) / det,
  };
}

export async function segmentIntersection(args: Record<string, unknown>) {
  const segments = args.segments as Array<{ p1: { x: number; y: number }; p2: { x: number; y: number } }>;

  if (!Array.isArray(segments) || segments.length < 2) {
    throw new Error("segments must be an array of at least 2 segments");
  }
  if (segments.length > 1000) {
    throw new Error("at most 1000 segments supported");
  }

  for (const seg of segments) {
    if (!seg.p1 || !seg.p2) throw new Error("each segment must have p1 and p2");
    for (const p of [seg.p1, seg.p2]) {
      if (typeof p.x !== "number" || typeof p.y !== "number") {
        throw new Error("coordinates must be numbers");
      }
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
        throw new Error("coordinates must be finite");
      }
    }
  }

  const intersections: Array<{ segment_a: number; segment_b: number; point: Point | null }> = [];
  let count = 0;

  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      if (segmentsIntersect(segments[i], segments[j])) {
        const pt = computeIntersectionPoint(segments[i], segments[j]);
        intersections.push({
          segment_a: i,
          segment_b: j,
          point: pt ? { x: Math.round(pt.x * 1e8) / 1e8, y: Math.round(pt.y * 1e8) / 1e8 } : null,
        });
        count++;
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use segment intersection for computational geometry tasks"],
  };

  return stampMeta(
    {
      segment_count: segments.length,
      intersection_count: count,
      intersections,
    },
    meta,
  );
}
