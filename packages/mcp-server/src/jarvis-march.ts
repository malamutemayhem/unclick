type JPoint = [number, number];

export class JarvisMarch {
  static convexHull(points: JPoint[]): JPoint[] {
    if (points.length < 3) return [...points];

    let leftmost = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i][0] < points[leftmost][0] ||
          (points[i][0] === points[leftmost][0] && points[i][1] < points[leftmost][1])) {
        leftmost = i;
      }
    }

    const hull: JPoint[] = [];
    let current = leftmost;

    do {
      hull.push(points[current]);
      let next = 0;
      for (let i = 1; i < points.length; i++) {
        if (i === current) continue;
        if (next === current) {
          next = i;
          continue;
        }
        const cross = JarvisMarch.cross(points[current], points[next], points[i]);
        if (cross < 0) {
          next = i;
        } else if (cross === 0) {
          const distNext = JarvisMarch.dist2(points[current], points[next]);
          const distI = JarvisMarch.dist2(points[current], points[i]);
          if (distI > distNext) next = i;
        }
      }
      current = next;
    } while (current !== leftmost && hull.length <= points.length);

    return hull;
  }

  static cross(o: JPoint, a: JPoint, b: JPoint): number {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  private static dist2(a: JPoint, b: JPoint): number {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  }

  static pointInHull(hull: JPoint[], point: JPoint): boolean {
    const n = hull.length;
    for (let i = 0; i < n; i++) {
      if (JarvisMarch.cross(hull[i], hull[(i + 1) % n], point) < 0) {
        return false;
      }
    }
    return true;
  }

  static hullDiameter(hull: JPoint[]): number {
    let maxDist = 0;
    for (let i = 0; i < hull.length; i++) {
      for (let j = i + 1; j < hull.length; j++) {
        const d = JarvisMarch.dist2(hull[i], hull[j]);
        if (d > maxDist) maxDist = d;
      }
    }
    return Math.sqrt(maxDist);
  }
}
