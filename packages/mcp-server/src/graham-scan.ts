type Point = [number, number];

export class GrahamScan {
  static convexHull(points: Point[]): Point[] {
    if (points.length < 3) return [...points];

    let lowest = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i][1] < points[lowest][1] ||
          (points[i][1] === points[lowest][1] && points[i][0] < points[lowest][0])) {
        lowest = i;
      }
    }

    const pivot = points[lowest];
    const sorted = points
      .filter((_, i) => i !== lowest)
      .sort((a, b) => {
        const angleA = Math.atan2(a[1] - pivot[1], a[0] - pivot[0]);
        const angleB = Math.atan2(b[1] - pivot[1], b[0] - pivot[0]);
        if (angleA !== angleB) return angleA - angleB;
        const distA = (a[0] - pivot[0]) ** 2 + (a[1] - pivot[1]) ** 2;
        const distB = (b[0] - pivot[0]) ** 2 + (b[1] - pivot[1]) ** 2;
        return distA - distB;
      });

    const hull: Point[] = [pivot];
    for (const p of sorted) {
      while (hull.length >= 2 && GrahamScan.cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
        hull.pop();
      }
      hull.push(p);
    }
    return hull;
  }

  static cross(o: Point, a: Point, b: Point): number {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  static area(hull: Point[]): number {
    let a = 0;
    const n = hull.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      a += hull[i][0] * hull[j][1];
      a -= hull[j][0] * hull[i][1];
    }
    return Math.abs(a) / 2;
  }

  static perimeter(hull: Point[]): number {
    let p = 0;
    const n = hull.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const dx = hull[j][0] - hull[i][0];
      const dy = hull[j][1] - hull[i][1];
      p += Math.sqrt(dx * dx + dy * dy);
    }
    return p;
  }

  static isConvex(polygon: Point[]): boolean {
    const n = polygon.length;
    if (n < 3) return false;
    let sign = 0;
    for (let i = 0; i < n; i++) {
      const c = GrahamScan.cross(polygon[i], polygon[(i + 1) % n], polygon[(i + 2) % n]);
      if (c !== 0) {
        if (sign === 0) sign = c > 0 ? 1 : -1;
        else if ((c > 0 ? 1 : -1) !== sign) return false;
      }
    }
    return true;
  }
}
