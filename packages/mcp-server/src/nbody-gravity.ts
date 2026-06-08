export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

export class NBodyGravity {
  private bodies: Body[];
  private G: number;

  constructor(bodies: Body[], G: number = 6.674e-11) {
    this.bodies = bodies.map((b) => ({ ...b }));
    this.G = G;
  }

  step(dt: number): void {
    const n = this.bodies.length;
    const ax = new Array(n).fill(0);
    const ay = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = this.bodies[j].x - this.bodies[i].x;
        const dy = this.bodies[j].y - this.bodies[i].y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        if (dist < 1e-10) continue;
        const force = this.G / (distSq * dist);
        const fx = force * dx;
        const fy = force * dy;
        ax[i] += fx * this.bodies[j].mass;
        ay[i] += fy * this.bodies[j].mass;
        ax[j] -= fx * this.bodies[i].mass;
        ay[j] -= fy * this.bodies[i].mass;
      }
    }

    for (let i = 0; i < n; i++) {
      this.bodies[i].vx += ax[i] * dt;
      this.bodies[i].vy += ay[i] * dt;
      this.bodies[i].x += this.bodies[i].vx * dt;
      this.bodies[i].y += this.bodies[i].vy * dt;
    }
  }

  simulate(dt: number, steps: number): Body[][] {
    const history: Body[][] = [this.getState()];
    for (let i = 0; i < steps; i++) {
      this.step(dt);
      history.push(this.getState());
    }
    return history;
  }

  getState(): Body[] {
    return this.bodies.map((b) => ({ ...b }));
  }

  totalEnergy(): number {
    let ke = 0;
    let pe = 0;
    for (let i = 0; i < this.bodies.length; i++) {
      const b = this.bodies[i];
      ke += 0.5 * b.mass * (b.vx * b.vx + b.vy * b.vy);
      for (let j = i + 1; j < this.bodies.length; j++) {
        const dx = this.bodies[j].x - b.x;
        const dy = this.bodies[j].y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) pe -= this.G * b.mass * this.bodies[j].mass / dist;
      }
    }
    return ke + pe;
  }

  centerOfMass(): { x: number; y: number } {
    let totalMass = 0;
    let cx = 0;
    let cy = 0;
    for (const b of this.bodies) {
      totalMass += b.mass;
      cx += b.x * b.mass;
      cy += b.y * b.mass;
    }
    return { x: cx / totalMass, y: cy / totalMass };
  }
}
