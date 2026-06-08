export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  a: Point;
  b: Point;
}

function cross(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function onSegment(p: Point, q: Point, r: Point): boolean {
  return (
    q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)
  );
}

function segmentsIntersect(p1: Point, q1: Point, p2: Point, q2: Point): boolean {
  const d1 = cross(p2, q2, p1);
  const d2 = cross(p2, q2, q1);
  const d3 = cross(p1, q1, p2);
  const d4 = cross(p1, q1, q2);

  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }
  if (d1 === 0 && onSegment(p2, p1, q2)) return true;
  if (d2 === 0 && onSegment(p2, q1, q2)) return true;
  if (d3 === 0 && onSegment(p1, p2, q1)) return true;
  if (d4 === 0 && onSegment(p1, q2, q1)) return true;
  return false;
}

function pointsEqual(a: Point, b: Point): boolean {
  return Math.abs(a.x - b.x) < 1e-10 && Math.abs(a.y - b.y) < 1e-10;
}

export function isVisible(a: Point, b: Point, obstacles: Segment[]): boolean {
  for (const seg of obstacles) {
    if (pointsEqual(a, seg.a) || pointsEqual(a, seg.b) ||
        pointsEqual(b, seg.a) || pointsEqual(b, seg.b)) {
      continue;
    }
    if (segmentsIntersect(a, b, seg.a, seg.b)) return false;
  }
  return true;
}

export function buildVisibilityGraph(
  points: Point[],
  obstacles: Segment[],
): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (isVisible(points[i], points[j], obstacles)) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

function dist(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function shortestPath(
  points: Point[],
  edges: [number, number][],
  start: number,
  end: number,
): number[] {
  const n = points.length;
  const adj = new Map<number, { to: number; weight: number }[]>();
  for (let i = 0; i < n; i++) adj.set(i, []);
  for (const [a, b] of edges) {
    const w = dist(points[a], points[b]);
    adj.get(a)!.push({ to: b, weight: w });
    adj.get(b)!.push({ to: a, weight: w });
  }

  const distance = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  const visited = new Set<number>();
  distance[start] = 0;

  for (let step = 0; step < n; step++) {
    let u = -1;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && distance[i] < best) {
        best = distance[i];
        u = i;
      }
    }
    if (u === -1 || u === end) break;
    visited.add(u);
    for (const { to, weight } of adj.get(u)!) {
      const alt = distance[u] + weight;
      if (alt < distance[to]) {
        distance[to] = alt;
        prev[to] = u;
      }
    }
  }

  if (distance[end] === Infinity) return [];
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  return path;
}

export function polygonToSegments(vertices: Point[]): Segment[] {
  const segments: Segment[] = [];
  for (let i = 0; i < vertices.length; i++) {
    segments.push({ a: vertices[i], b: vertices[(i + 1) % vertices.length] });
  }
  return segments;
}
