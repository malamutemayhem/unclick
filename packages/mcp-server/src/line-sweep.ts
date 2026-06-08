export interface SweepSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id?: string;
}

interface SweepEvent {
  x: number;
  type: "start" | "end";
  segIndex: number;
}

export class LineSweep {
  static findIntersections(segments: SweepSegment[]): { i: number; j: number; x: number; y: number }[] {
    const results: { i: number; j: number; x: number; y: number }[] = [];
    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        const pt = LineSweep.segmentIntersection(segments[i], segments[j]);
        if (pt) {
          results.push({ i, j, ...pt });
        }
      }
    }
    return results;
  }

  static segmentIntersection(a: SweepSegment, b: SweepSegment): { x: number; y: number } | null {
    const dx1 = a.x2 - a.x1;
    const dy1 = a.y2 - a.y1;
    const dx2 = b.x2 - b.x1;
    const dy2 = b.y2 - b.y1;
    const denom = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(denom) < 1e-10) return null;
    const t = ((b.x1 - a.x1) * dy2 - (b.y1 - a.y1) * dx2) / denom;
    const u = ((b.x1 - a.x1) * dy1 - (b.y1 - a.y1) * dx1) / denom;
    if (t < 0 || t > 1 || u < 0 || u > 1) return null;
    return { x: a.x1 + t * dx1, y: a.y1 + t * dy1 };
  }

  static closestPair(points: { x: number; y: number }[]): { i: number; j: number; dist: number } {
    let best = { i: 0, j: 1, dist: Infinity };
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < best.dist) {
          best = { i, j, dist: d };
        }
      }
    }
    return best;
  }

  static activeSegments(segments: SweepSegment[], sweepX: number): number[] {
    const active: number[] = [];
    for (let i = 0; i < segments.length; i++) {
      const minX = Math.min(segments[i].x1, segments[i].x2);
      const maxX = Math.max(segments[i].x1, segments[i].x2);
      if (sweepX >= minX && sweepX <= maxX) {
        active.push(i);
      }
    }
    return active;
  }

  static events(segments: SweepSegment[]): SweepEvent[] {
    const evts: SweepEvent[] = [];
    for (let i = 0; i < segments.length; i++) {
      const minX = Math.min(segments[i].x1, segments[i].x2);
      const maxX = Math.max(segments[i].x1, segments[i].x2);
      evts.push({ x: minX, type: "start", segIndex: i });
      evts.push({ x: maxX, type: "end", segIndex: i });
    }
    return evts.sort((a, b) => a.x - b.x || (a.type === "start" ? -1 : 1));
  }

  static hasAnyIntersection(segments: SweepSegment[]): boolean {
    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        if (LineSweep.segmentIntersection(segments[i], segments[j])) return true;
      }
    }
    return false;
  }
}
