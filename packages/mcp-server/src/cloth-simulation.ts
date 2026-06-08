export interface ClothNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
}

export class ClothSimulation {
  nodes: ClothNode[][];
  width: number;
  height: number;
  restLength: number;

  constructor(width: number, height: number, spacing = 1) {
    this.width = width;
    this.height = height;
    this.restLength = spacing;
    this.nodes = [];
    for (let y = 0; y < height; y++) {
      const row: ClothNode[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ x: x * spacing, y: y * spacing, vx: 0, vy: 0, pinned: false });
      }
      this.nodes.push(row);
    }
  }

  pin(row: number, col: number): void {
    if (this.nodes[row]?.[col]) {
      this.nodes[row][col].pinned = true;
    }
  }

  step(dt: number, gravity = 9.81, damping = 0.99, stiffness = 50): void {
    for (const row of this.nodes) {
      for (const node of row) {
        if (!node.pinned) {
          node.vy += gravity * dt;
          node.vx *= damping;
          node.vy *= damping;
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors: [number, number][] = [];
        if (x > 0) neighbors.push([y, x - 1]);
        if (x < this.width - 1) neighbors.push([y, x + 1]);
        if (y > 0) neighbors.push([y - 1, x]);
        if (y < this.height - 1) neighbors.push([y + 1, x]);

        for (const [ny, nx] of neighbors) {
          this.applyConstraint(this.nodes[y][x], this.nodes[ny][nx], stiffness, dt);
        }
      }
    }

    for (const row of this.nodes) {
      for (const node of row) {
        if (!node.pinned) {
          node.x += node.vx * dt;
          node.y += node.vy * dt;
        }
      }
    }
  }

  getPositions(): { x: number; y: number }[][] {
    return this.nodes.map(row =>
      row.map(n => ({
        x: Math.round(n.x * 10000) / 10000,
        y: Math.round(n.y * 10000) / 10000,
      })),
    );
  }

  totalEnergy(gravity = 9.81): number {
    let energy = 0;
    for (const row of this.nodes) {
      for (const node of row) {
        energy += 0.5 * (node.vx * node.vx + node.vy * node.vy);
        energy += gravity * node.y;
      }
    }
    return Math.round(energy * 10000) / 10000;
  }

  private applyConstraint(a: ClothNode, b: ClothNode, stiffness: number, dt: number): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
    const diff = (dist - this.restLength) / dist;
    const fx = stiffness * diff * dx * dt;
    const fy = stiffness * diff * dy * dt;

    if (!a.pinned) { a.vx += fx; a.vy += fy; }
    if (!b.pinned) { b.vx -= fx; b.vy -= fy; }
  }
}
