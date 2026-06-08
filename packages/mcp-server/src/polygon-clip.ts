export type Point = { x: number; y: number };

export class PolygonClip {
  static sutherlandHodgman(subject: Point[], clip: Point[]): Point[] {
    let output = [...subject];
    for (let i = 0; i < clip.length; i++) {
      if (output.length === 0) return [];
      const input = output;
      output = [];
      const edgeStart = clip[i];
      const edgeEnd = clip[(i + 1) % clip.length];
      for (let j = 0; j < input.length; j++) {
        const current = input[j];
        const previous = input[(j + input.length - 1) % input.length];
        const currInside = PolygonClip.isInside(current, edgeStart, edgeEnd);
        const prevInside = PolygonClip.isInside(previous, edgeStart, edgeEnd);
        if (currInside) {
          if (!prevInside) {
            const inter = PolygonClip.lineIntersect(previous, current, edgeStart, edgeEnd);
            if (inter) output.push(inter);
          }
          output.push(current);
        } else if (prevInside) {
          const inter = PolygonClip.lineIntersect(previous, current, edgeStart, edgeEnd);
          if (inter) output.push(inter);
        }
      }
    }
    return output;
  }

  private static isInside(p: Point, edgeStart: Point, edgeEnd: Point): boolean {
    return (edgeEnd.x - edgeStart.x) * (p.y - edgeStart.y) -
           (edgeEnd.y - edgeStart.y) * (p.x - edgeStart.x) >= 0;
  }

  private static lineIntersect(a1: Point, a2: Point, b1: Point, b2: Point): Point | null {
    const dx1 = a2.x - a1.x;
    const dy1 = a2.y - a1.y;
    const dx2 = b2.x - b1.x;
    const dy2 = b2.y - b1.y;
    const denom = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(denom) < 1e-10) return null;
    const t = ((b1.x - a1.x) * dy2 - (b1.y - a1.y) * dx2) / denom;
    return { x: a1.x + t * dx1, y: a1.y + t * dy1 };
  }

  static area(polygon: Point[]): number {
    let a = 0;
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length;
      a += polygon[i].x * polygon[j].y;
      a -= polygon[j].x * polygon[i].y;
    }
    return Math.abs(a) / 2;
  }

  static centroid(polygon: Point[]): Point {
    let cx = 0;
    let cy = 0;
    let a = 0;
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length;
      const cross = polygon[i].x * polygon[j].y - polygon[j].x * polygon[i].y;
      cx += (polygon[i].x + polygon[j].x) * cross;
      cy += (polygon[i].y + polygon[j].y) * cross;
      a += cross;
    }
    a /= 2;
    cx /= (6 * a);
    cy /= (6 * a);
    return { x: cx, y: cy };
  }

  static perimeter(polygon: Point[]): number {
    let p = 0;
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length;
      const dx = polygon[j].x - polygon[i].x;
      const dy = polygon[j].y - polygon[i].y;
      p += Math.sqrt(dx * dx + dy * dy);
    }
    return p;
  }

  static pointInPolygon(point: Point, polygon: Point[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (
        (polygon[i].y > point.y) !== (polygon[j].y > point.y) &&
        point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) /
          (polygon[j].y - polygon[i].y) + polygon[i].x
      ) {
        inside = !inside;
      }
    }
    return inside;
  }
}
