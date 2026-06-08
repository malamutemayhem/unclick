export interface Point {
  x: number;
  y: number;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

export function quadratic(p0: Point, p1: Point, p2: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

export function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

export function deCasteljau(points: Point[], t: number): Point {
  if (points.length === 1) return points[0];
  const next: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    next.push(lerpPoint(points[i], points[i + 1], t));
  }
  return deCasteljau(next, t);
}

export function sampleCurve(points: Point[], steps: number): Point[] {
  const result: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    result.push(deCasteljau(points, i / steps));
  }
  return result;
}

export function curveLength(points: Point[], steps = 100): number {
  let length = 0;
  let prev = deCasteljau(points, 0);
  for (let i = 1; i <= steps; i++) {
    const curr = deCasteljau(points, i / steps);
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    length += Math.sqrt(dx * dx + dy * dy);
    prev = curr;
  }
  return length;
}

export function splitCurve(points: Point[], t: number): [Point[], Point[]] {
  if (points.length < 2) return [[...points], [...points]];

  const left: Point[] = [points[0]];
  const right: Point[] = [points[points.length - 1]];
  let current = [...points];

  while (current.length > 1) {
    const next: Point[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      const p = lerpPoint(current[i], current[i + 1], t);
      next.push(p);
    }
    left.push(next[0]);
    right.unshift(next[next.length - 1]);
    current = next;
  }

  return [left, right];
}

export function tangent(points: Point[], t: number): Point {
  if (points.length < 2) return { x: 0, y: 0 };
  const dt = 0.0001;
  const t0 = Math.max(0, t - dt);
  const t1 = Math.min(1, t + dt);
  const p0 = deCasteljau(points, t0);
  const p1 = deCasteljau(points, t1);
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { x: 0, y: 0 };
  return { x: dx / len, y: dy / len };
}
