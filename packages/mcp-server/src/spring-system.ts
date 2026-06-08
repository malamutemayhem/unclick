export interface SpringNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  fixed: boolean;
}

export interface SpringLink {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
  damping: number;
}

export class SpringSystem {
  private nodes: SpringNode[] = [];
  private links: SpringLink[] = [];

  addNode(
    x: number,
    y: number,
    mass = 1,
    fixed = false,
  ): number {
    this.nodes.push({ x, y, vx: 0, vy: 0, mass, fixed });
    return this.nodes.length - 1;
  }

  addSpring(
    a: number,
    b: number,
    restLength: number,
    stiffness = 100,
    damping = 1,
  ): void {
    this.links.push({ a, b, restLength, stiffness, damping });
  }

  getNode(index: number): SpringNode | undefined {
    return this.nodes[index];
  }

  nodeCount(): number {
    return this.nodes.length;
  }

  springCount(): number {
    return this.links.length;
  }

  step(dt: number, gravity = 0): void {
    const forces: Array<{ fx: number; fy: number }> = this.nodes.map(() => ({
      fx: 0,
      fy: 0,
    }));

    for (const link of this.links) {
      const a = this.nodes[link.a];
      const b = this.nodes[link.b];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
      const stretch = dist - link.restLength;

      const nx = dx / dist;
      const ny = dy / dist;

      const springForce = link.stiffness * stretch;

      const relVx = b.vx - a.vx;
      const relVy = b.vy - a.vy;
      const dampForce = link.damping * (relVx * nx + relVy * ny);

      const totalForce = springForce + dampForce;

      forces[link.a].fx += totalForce * nx;
      forces[link.a].fy += totalForce * ny;
      forces[link.b].fx -= totalForce * nx;
      forces[link.b].fy -= totalForce * ny;
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (node.fixed) continue;

      forces[i].fy += node.mass * gravity;

      const ax = forces[i].fx / node.mass;
      const ay = forces[i].fy / node.mass;

      node.vx += ax * dt;
      node.vy += ay * dt;
      node.x += node.vx * dt;
      node.y += node.vy * dt;
    }
  }

  totalEnergy(): number {
    let kinetic = 0;
    let potential = 0;

    for (const node of this.nodes) {
      kinetic += 0.5 * node.mass * (node.vx * node.vx + node.vy * node.vy);
    }

    for (const link of this.links) {
      const a = this.nodes[link.a];
      const b = this.nodes[link.b];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const stretch = dist - link.restLength;
      potential += 0.5 * link.stiffness * stretch * stretch;
    }

    return kinetic + potential;
  }

  springStress(index: number): number {
    const link = this.links[index];
    if (!link) return 0;
    const a = this.nodes[link.a];
    const b = this.nodes[link.b];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.abs(dist - link.restLength) / link.restLength;
  }

  reset(): void {
    for (const node of this.nodes) {
      node.vx = 0;
      node.vy = 0;
    }
  }
}

export class DampedOscillator {
  position: number;
  velocity: number;
  private mass: number;
  private stiffness: number;
  private damping: number;
  private equilibrium: number;

  constructor(mass: number, stiffness: number, damping: number, equilibrium = 0) {
    this.mass = mass;
    this.stiffness = stiffness;
    this.damping = damping;
    this.equilibrium = equilibrium;
    this.position = equilibrium;
    this.velocity = 0;
  }

  displace(amount: number): void {
    this.position += amount;
  }

  kick(impulse: number): void {
    this.velocity += impulse / this.mass;
  }

  step(dt: number): void {
    const displacement = this.position - this.equilibrium;
    const springForce = -this.stiffness * displacement;
    const dampForce = -this.damping * this.velocity;
    const acceleration = (springForce + dampForce) / this.mass;
    this.velocity += acceleration * dt;
    this.position += this.velocity * dt;
  }

  naturalFrequency(): number {
    return Math.sqrt(this.stiffness / this.mass) / (2 * Math.PI);
  }

  dampingRatio(): number {
    return this.damping / (2 * Math.sqrt(this.stiffness * this.mass));
  }

  isOverdamped(): boolean {
    return this.dampingRatio() > 1;
  }

  isCriticallyDamped(): boolean {
    return Math.abs(this.dampingRatio() - 1) < 1e-6;
  }

  isUnderdamped(): boolean {
    return this.dampingRatio() < 1;
  }

  energy(): number {
    const displacement = this.position - this.equilibrium;
    const ke = 0.5 * this.mass * this.velocity * this.velocity;
    const pe = 0.5 * this.stiffness * displacement * displacement;
    return ke + pe;
  }
}
