export interface RopePoint {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  locked: boolean;
}

export class RopeSimulation {
  private points: RopePoint[] = [];
  private segmentLength: number;
  private gravity: number;
  private iterations: number;

  constructor(segmentLength: number, gravity = 9.81, constraintIterations = 10) {
    this.segmentLength = segmentLength;
    this.gravity = gravity;
    this.iterations = constraintIterations;
  }

  addPoint(x: number, y: number, locked = false): number {
    this.points.push({ x, y, prevX: x, prevY: y, locked });
    return this.points.length - 1;
  }

  createRope(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    segments: number,
    lockStart = true,
    lockEnd = false,
  ): void {
    const dx = (endX - startX) / segments;
    const dy = (endY - startY) / segments;
    for (let i = 0; i <= segments; i++) {
      const locked = (i === 0 && lockStart) || (i === segments && lockEnd);
      this.addPoint(startX + dx * i, startY + dy * i, locked);
    }
  }

  pointCount(): number {
    return this.points.length;
  }

  getPoint(index: number): RopePoint | undefined {
    return this.points[index];
  }

  step(dt: number): void {
    for (const p of this.points) {
      if (p.locked) continue;
      const tempX = p.x;
      const tempY = p.y;
      const dx = p.x - p.prevX;
      const dy = p.y - p.prevY;
      p.x += dx;
      p.y += dy + this.gravity * dt * dt;
      p.prevX = tempX;
      p.prevY = tempY;
    }

    for (let iter = 0; iter < this.iterations; iter++) {
      for (let i = 0; i < this.points.length - 1; i++) {
        const a = this.points[i];
        const b = this.points[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const diff = (dist - this.segmentLength) / dist;

        if (!a.locked && !b.locked) {
          a.x += dx * 0.5 * diff;
          a.y += dy * 0.5 * diff;
          b.x -= dx * 0.5 * diff;
          b.y -= dy * 0.5 * diff;
        } else if (!a.locked) {
          a.x += dx * diff;
          a.y += dy * diff;
        } else if (!b.locked) {
          b.x -= dx * diff;
          b.y -= dy * diff;
        }
      }
    }
  }

  totalLength(): number {
    let len = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      const a = this.points[i];
      const b = this.points[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
  }

  tension(segmentIndex: number): number {
    if (segmentIndex < 0 || segmentIndex >= this.points.length - 1) return 0;
    const a = this.points[segmentIndex];
    const b = this.points[segmentIndex + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.abs(dist - this.segmentLength) / this.segmentLength;
  }

  maxTension(): number {
    let max = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      max = Math.max(max, this.tension(i));
    }
    return max;
  }

  movePoint(index: number, x: number, y: number): void {
    const p = this.points[index];
    if (p) {
      p.x = x;
      p.y = y;
    }
  }

  lockPoint(index: number): void {
    const p = this.points[index];
    if (p) p.locked = true;
  }

  unlockPoint(index: number): void {
    const p = this.points[index];
    if (p) p.locked = false;
  }

  centerOfMass(): { x: number; y: number } {
    let sx = 0;
    let sy = 0;
    for (const p of this.points) {
      sx += p.x;
      sy += p.y;
    }
    return { x: sx / this.points.length, y: sy / this.points.length };
  }
}
