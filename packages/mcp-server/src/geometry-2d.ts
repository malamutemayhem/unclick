export interface Vec2 {
  x: number;
  y: number;
}

export function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function scale(v: Vec2, s: number): Vec2 {
  return { x: v.x * s, y: v.y * s };
}

export function dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}

export function cross(a: Vec2, b: Vec2): number {
  return a.x * b.y - a.y * b.x;
}

export function length(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vec2): Vec2 {
  const len = length(v);
  if (len === 0) return { x: 0, y: 0 };
  return { x: v.x / len, y: v.y / len };
}

export function distance(a: Vec2, b: Vec2): number {
  return length(sub(a, b));
}

export function rotate(v: Vec2, angle: number): Vec2 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

export function lerp(a: Vec2, b: Vec2, t: number): Vec2 {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export function angleBetween(a: Vec2, b: Vec2): number {
  return Math.atan2(cross(a, b), dot(a, b));
}

export function reflect(v: Vec2, normal: Vec2): Vec2 {
  const d = 2 * dot(v, normal);
  return { x: v.x - d * normal.x, y: v.y - d * normal.y };
}

export function perpendicular(v: Vec2): Vec2 {
  return { x: -v.y, y: v.x };
}

export function lineIntersection(
  p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2,
): Vec2 | null {
  const d1 = sub(p2, p1);
  const d2 = sub(p4, p3);
  const denom = cross(d1, d2);
  if (Math.abs(denom) < 1e-10) return null;
  const t = cross(sub(p3, p1), d2) / denom;
  return add(p1, scale(d1, t));
}

export function segmentIntersection(
  p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2,
): Vec2 | null {
  const d1 = sub(p2, p1);
  const d2 = sub(p4, p3);
  const denom = cross(d1, d2);
  if (Math.abs(denom) < 1e-10) return null;
  const t = cross(sub(p3, p1), d2) / denom;
  const u = cross(sub(p3, p1), d1) / denom;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return add(p1, scale(d1, t));
  }
  return null;
}

export function pointInTriangle(p: Vec2, a: Vec2, b: Vec2, c: Vec2): boolean {
  const d1 = cross(sub(b, a), sub(p, a));
  const d2 = cross(sub(c, b), sub(p, b));
  const d3 = cross(sub(a, c), sub(p, c));
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

export function polygonArea(vertices: Vec2[]): number {
  let area = 0;
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return Math.abs(area) / 2;
}

export function polygonCentroid(vertices: Vec2[]): Vec2 {
  let cx = 0;
  let cy = 0;
  const n = vertices.length;
  for (const v of vertices) {
    cx += v.x;
    cy += v.y;
  }
  return { x: cx / n, y: cy / n };
}
