export interface Point2D {
  x: number;
  y: number;
}

export interface Triangle {
  a: number;
  b: number;
  c: number;
}

export interface Circle {
  center: Point2D;
  radius: number;
}

export class Delaunay {
  static circumcircle(p1: Point2D, p2: Point2D, p3: Point2D): Circle {
    const ax = p1.x, ay = p1.y;
    const bx = p2.x, by = p2.y;
    const cx = p3.x, cy = p3.y;

    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 1e-10) {
      return { center: { x: 0, y: 0 }, radius: Infinity };
    }

    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;

    const radius = Math.sqrt((ax - ux) ** 2 + (ay - uy) ** 2);
    return { center: { x: ux, y: uy }, radius };
  }

  static inCircumcircle(point: Point2D, p1: Point2D, p2: Point2D, p3: Point2D): boolean {
    const circle = Delaunay.circumcircle(p1, p2, p3);
    const dx = point.x - circle.center.x;
    const dy = point.y - circle.center.y;
    return Math.sqrt(dx * dx + dy * dy) < circle.radius + 1e-10;
  }

  static triangulate(points: Point2D[]): Triangle[] {
    if (points.length < 3) return [];

    const n = points.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    indices.sort((a, b) => points[a].x - points[b].x || points[a].y - points[b].y);

    const minX = points[indices[0]].x - 1;
    const minY = Math.min(...points.map((p) => p.y)) - 1;
    const maxX = points[indices[n - 1]].x + 1;
    const maxY = Math.max(...points.map((p) => p.y)) + 1;

    const superPoints: Point2D[] = [
      { x: minX - (maxY - minY), y: minY },
      { x: maxX + (maxY - minY), y: minY },
      { x: (minX + maxX) / 2, y: maxY + (maxX - minX) },
    ];

    const allPoints = [...points, ...superPoints];
    const si = n; // super triangle indices
    let triangles: Triangle[] = [{ a: si, b: si + 1, c: si + 2 }];

    for (const idx of indices) {
      const p = allPoints[idx];
      const bad: number[] = [];

      for (let t = 0; t < triangles.length; t++) {
        const tri = triangles[t];
        if (Delaunay.inCircumcircle(p, allPoints[tri.a], allPoints[tri.b], allPoints[tri.c])) {
          bad.push(t);
        }
      }

      const edges: Array<[number, number]> = [];
      for (const t of bad) {
        const tri = triangles[t];
        edges.push([tri.a, tri.b], [tri.b, tri.c], [tri.c, tri.a]);
      }

      const boundary: Array<[number, number]> = edges.filter((e) => {
        const count = edges.filter(
          (f) => (f[0] === e[0] && f[1] === e[1]) || (f[0] === e[1] && f[1] === e[0]),
        ).length;
        return count === 1;
      });

      const remaining = triangles.filter((_, i) => !bad.includes(i));
      triangles = remaining;

      for (const [ea, eb] of boundary) {
        triangles.push({ a: idx, b: ea, c: eb });
      }
    }

    return triangles.filter((t) => t.a < n && t.b < n && t.c < n);
  }

  static edgesFromTriangles(triangles: Triangle[]): Array<[number, number]> {
    const edgeSet = new Set<string>();
    const edges: Array<[number, number]> = [];
    for (const t of triangles) {
      const pairs: Array<[number, number]> = [[t.a, t.b], [t.b, t.c], [t.c, t.a]];
      for (const [a, b] of pairs) {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([Math.min(a, b), Math.max(a, b)]);
        }
      }
    }
    return edges;
  }

  static triangleArea(p1: Point2D, p2: Point2D, p3: Point2D): number {
    return Math.abs((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)) / 2;
  }
}
