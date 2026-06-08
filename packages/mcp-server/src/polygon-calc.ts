export interface Point2D {
  x: number;
  y: number;
}

export class PolygonCalc {
  static area(vertices: Point2D[]): number {
    const n = vertices.length;
    if (n < 3) return 0;
    let area = 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += vertices[i].x * vertices[j].y;
      area -= vertices[j].x * vertices[i].y;
    }
    return Math.round(Math.abs(area / 2) * 10000) / 10000;
  }

  static perimeter(vertices: Point2D[]): number {
    let total = 0;
    for (let i = 0; i < vertices.length; i++) {
      const j = (i + 1) % vertices.length;
      total += PolygonCalc.distance(vertices[i], vertices[j]);
    }
    return Math.round(total * 10000) / 10000;
  }

  static centroid(vertices: Point2D[]): Point2D {
    const n = vertices.length;
    const cx = vertices.reduce((s, v) => s + v.x, 0) / n;
    const cy = vertices.reduce((s, v) => s + v.y, 0) / n;
    return { x: Math.round(cx * 10000) / 10000, y: Math.round(cy * 10000) / 10000 };
  }

  static isConvex(vertices: Point2D[]): boolean {
    const n = vertices.length;
    if (n < 3) return false;
    let sign = 0;
    for (let i = 0; i < n; i++) {
      const a = vertices[i];
      const b = vertices[(i + 1) % n];
      const c = vertices[(i + 2) % n];
      const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
      if (cross !== 0) {
        if (sign === 0) sign = cross > 0 ? 1 : -1;
        else if ((cross > 0 ? 1 : -1) !== sign) return false;
      }
    }
    return true;
  }

  static containsPoint(vertices: Point2D[], point: Point2D): boolean {
    let inside = false;
    const n = vertices.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = vertices[i].x, yi = vertices[i].y;
      const xj = vertices[j].x, yj = vertices[j].y;
      if ((yi > point.y) !== (yj > point.y) &&
        point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  static regularPolygon(sides: number, radius: number, center: Point2D = { x: 0, y: 0 }): Point2D[] {
    const vertices: Point2D[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
      vertices.push({
        x: Math.round((center.x + radius * Math.cos(angle)) * 10000) / 10000,
        y: Math.round((center.y + radius * Math.sin(angle)) * 10000) / 10000,
      });
    }
    return vertices;
  }

  static regularArea(sides: number, sideLength: number): number {
    return Math.round((sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides)) * 10000) / 10000;
  }

  static regularPerimeter(sides: number, sideLength: number): number {
    return Math.round(sides * sideLength * 10000) / 10000;
  }

  static interiorAngle(sides: number): number {
    return Math.round(((sides - 2) * 180 / sides) * 10000) / 10000;
  }

  static diagonals(sides: number): number {
    return (sides * (sides - 3)) / 2;
  }

  private static distance(a: Point2D, b: Point2D): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }
}
