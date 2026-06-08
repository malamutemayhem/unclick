export interface AABB {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export class CollisionDetection {
  static aabbOverlap(a: AABB, b: AABB): boolean {
    return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;
  }

  static aabbContains(box: AABB, x: number, y: number): boolean {
    return x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY;
  }

  static circleOverlap(a: Circle, b: Circle): boolean {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < a.radius + b.radius;
  }

  static circleContains(circle: Circle, x: number, y: number): boolean {
    const dx = circle.x - x;
    const dy = circle.y - y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  static circleAABBOverlap(circle: Circle, box: AABB): boolean {
    const closestX = Math.max(box.minX, Math.min(circle.x, box.maxX));
    const closestY = Math.max(box.minY, Math.min(circle.y, box.maxY));
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    return dx * dx + dy * dy < circle.radius * circle.radius;
  }

  static lineIntersect(
    x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number,
  ): { x: number; y: number } | null {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 1e-10) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: Math.round((x1 + t * (x2 - x1)) * 10000) / 10000,
        y: Math.round((y1 + t * (y2 - y1)) * 10000) / 10000,
      };
    }
    return null;
  }

  static pointInPolygon(vertices: { x: number; y: number }[], px: number, py: number): boolean {
    let inside = false;
    const n = vertices.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = vertices[i].x, yi = vertices[i].y;
      const xj = vertices[j].x, yj = vertices[j].y;
      if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  static separatingAxis(polyA: { x: number; y: number }[], polyB: { x: number; y: number }[]): boolean {
    const check = (poly: { x: number; y: number }[]) => {
      for (let i = 0; i < poly.length; i++) {
        const j = (i + 1) % poly.length;
        const nx = -(poly[j].y - poly[i].y);
        const ny = poly[j].x - poly[i].x;

        let minA = Infinity, maxA = -Infinity;
        for (const p of polyA) {
          const proj = nx * p.x + ny * p.y;
          minA = Math.min(minA, proj);
          maxA = Math.max(maxA, proj);
        }
        let minB = Infinity, maxB = -Infinity;
        for (const p of polyB) {
          const proj = nx * p.x + ny * p.y;
          minB = Math.min(minB, proj);
          maxB = Math.max(maxB, proj);
        }
        if (maxA < minB || maxB < minA) return false;
      }
      return true;
    };
    return check(polyA) && check(polyB);
  }

  static sweepAABB(
    boxes: AABB[],
  ): [number, number][] {
    const pairs: [number, number][] = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        if (CollisionDetection.aabbOverlap(boxes[i], boxes[j])) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  }
}
