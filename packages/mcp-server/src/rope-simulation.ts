export interface RopeNode {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  pinned: boolean;
}

export class RopeSimulation {
  nodes: RopeNode[];
  segmentLength: number;

  constructor(startX: number, startY: number, segments: number, segmentLength = 1) {
    this.segmentLength = segmentLength;
    this.nodes = [];
    for (let i = 0; i <= segments; i++) {
      this.nodes.push({
        x: startX,
        y: startY + i * segmentLength,
        prevX: startX,
        prevY: startY + i * segmentLength,
        pinned: false,
      });
    }
  }

  pin(index: number): void {
    if (this.nodes[index]) this.nodes[index].pinned = true;
  }

  step(dt: number, gravity = 9.81, iterations = 5): void {
    for (const node of this.nodes) {
      if (node.pinned) continue;
      const vx = node.x - node.prevX;
      const vy = node.y - node.prevY;
      node.prevX = node.x;
      node.prevY = node.y;
      node.x += vx * 0.99;
      node.y += vy * 0.99 + gravity * dt * dt;
    }

    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < this.nodes.length - 1; i++) {
        this.satisfy(this.nodes[i], this.nodes[i + 1]);
      }
    }
  }

  getPositions(): { x: number; y: number }[] {
    return this.nodes.map(n => ({
      x: Math.round(n.x * 10000) / 10000,
      y: Math.round(n.y * 10000) / 10000,
    }));
  }

  totalLength(): number {
    let total = 0;
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const dx = this.nodes[i + 1].x - this.nodes[i].x;
      const dy = this.nodes[i + 1].y - this.nodes[i].y;
      total += Math.sqrt(dx * dx + dy * dy);
    }
    return Math.round(total * 10000) / 10000;
  }

  tension(index: number): number {
    if (index < 0 || index >= this.nodes.length - 1) return 0;
    const dx = this.nodes[index + 1].x - this.nodes[index].x;
    const dy = this.nodes[index + 1].y - this.nodes[index].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.round(Math.abs(dist - this.segmentLength) * 10000) / 10000;
  }

  private satisfy(a: RopeNode, b: RopeNode): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
    const diff = (this.segmentLength - dist) / dist / 2;
    const offsetX = dx * diff;
    const offsetY = dy * diff;

    if (!a.pinned) { a.x -= offsetX; a.y -= offsetY; }
    if (!b.pinned) { b.x += offsetX; b.y += offsetY; }
  }
}
