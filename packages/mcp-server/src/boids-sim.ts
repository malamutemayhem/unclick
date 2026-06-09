export interface Vec2 {
  x: number;
  y: number;
}

function v(x: number, y: number): Vec2 { return { x, y }; }
function vAdd(a: Vec2, b: Vec2): Vec2 { return v(a.x + b.x, a.y + b.y); }
function vSub(a: Vec2, b: Vec2): Vec2 { return v(a.x - b.x, a.y - b.y); }
function vScale(a: Vec2, s: number): Vec2 { return v(a.x * s, a.y * s); }
function vLen(a: Vec2): number { return Math.sqrt(a.x * a.x + a.y * a.y); }
function vDist(a: Vec2, b: Vec2): number { return vLen(vSub(a, b)); }
function vNorm(a: Vec2): Vec2 {
  const len = vLen(a);
  return len > 0 ? vScale(a, 1 / len) : v(0, 0);
}
function vLimit(a: Vec2, max: number): Vec2 {
  const len = vLen(a);
  return len > max ? vScale(a, max / len) : a;
}

export interface Boid {
  position: Vec2;
  velocity: Vec2;
}

export interface BoidsConfig {
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  separationRadius: number;
  neighborRadius: number;
  maxSpeed: number;
  maxForce: number;
}

const DEFAULT_CONFIG: BoidsConfig = {
  separationWeight: 1.5,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
  separationRadius: 25,
  neighborRadius: 50,
  maxSpeed: 4,
  maxForce: 0.3,
};

export class BoidsSimulation {
  boids: Boid[] = [];
  config: BoidsConfig;
  width: number;
  height: number;

  constructor(width: number, height: number, config: Partial<BoidsConfig> = {}) {
    this.width = width;
    this.height = height;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  addBoid(x: number, y: number, vx = 0, vy = 0): Boid {
    const boid: Boid = { position: v(x, y), velocity: v(vx, vy) };
    this.boids.push(boid);
    return boid;
  }

  private getNeighbors(boid: Boid, radius: number): Boid[] {
    const result: Boid[] = [];
    for (const other of this.boids) {
      if (other === boid) continue;
      if (vDist(boid.position, other.position) < radius) {
        result.push(other);
      }
    }
    return result;
  }

  private separation(boid: Boid): Vec2 {
    let steer = v(0, 0);
    let count = 0;
    for (const other of this.boids) {
      if (other === boid) continue;
      const d = vDist(boid.position, other.position);
      if (d > 0 && d < this.config.separationRadius) {
        const diff = vNorm(vSub(boid.position, other.position));
        steer = vAdd(steer, vScale(diff, 1 / d));
        count++;
      }
    }
    if (count > 0) {
      steer = vScale(steer, 1 / count);
      steer = vScale(vNorm(steer), this.config.maxSpeed);
      steer = vSub(steer, boid.velocity);
      steer = vLimit(steer, this.config.maxForce);
    }
    return steer;
  }

  private alignment(boid: Boid, neighbors: Boid[]): Vec2 {
    if (neighbors.length === 0) return v(0, 0);
    let avg = v(0, 0);
    for (const n of neighbors) avg = vAdd(avg, n.velocity);
    avg = vScale(avg, 1 / neighbors.length);
    avg = vScale(vNorm(avg), this.config.maxSpeed);
    let steer = vSub(avg, boid.velocity);
    return vLimit(steer, this.config.maxForce);
  }

  private cohesion(boid: Boid, neighbors: Boid[]): Vec2 {
    if (neighbors.length === 0) return v(0, 0);
    let center = v(0, 0);
    for (const n of neighbors) center = vAdd(center, n.position);
    center = vScale(center, 1 / neighbors.length);
    let desired = vSub(center, boid.position);
    desired = vScale(vNorm(desired), this.config.maxSpeed);
    let steer = vSub(desired, boid.velocity);
    return vLimit(steer, this.config.maxForce);
  }

  step(dt = 1): void {
    const forces: Vec2[] = [];
    for (const boid of this.boids) {
      const neighbors = this.getNeighbors(boid, this.config.neighborRadius);
      const sep = vScale(this.separation(boid), this.config.separationWeight);
      const ali = vScale(this.alignment(boid, neighbors), this.config.alignmentWeight);
      const coh = vScale(this.cohesion(boid, neighbors), this.config.cohesionWeight);
      forces.push(vAdd(sep, vAdd(ali, coh)));
    }

    for (let i = 0; i < this.boids.length; i++) {
      const boid = this.boids[i];
      boid.velocity = vLimit(vAdd(boid.velocity, vScale(forces[i], dt)), this.config.maxSpeed);
      boid.position = vAdd(boid.position, vScale(boid.velocity, dt));
      this.wrap(boid);
    }
  }

  private wrap(boid: Boid): void {
    if (boid.position.x < 0) boid.position.x += this.width;
    if (boid.position.x >= this.width) boid.position.x -= this.width;
    if (boid.position.y < 0) boid.position.y += this.height;
    if (boid.position.y >= this.height) boid.position.y -= this.height;
  }

  averageSpeed(): number {
    if (this.boids.length === 0) return 0;
    let total = 0;
    for (const b of this.boids) total += vLen(b.velocity);
    return total / this.boids.length;
  }

  centerOfMass(): Vec2 {
    if (this.boids.length === 0) return v(0, 0);
    let center = v(0, 0);
    for (const b of this.boids) center = vAdd(center, b.position);
    return vScale(center, 1 / this.boids.length);
  }

  get count(): number {
    return this.boids.length;
  }
}

export { vDist as boidsDist, vLen as boidsLen };
