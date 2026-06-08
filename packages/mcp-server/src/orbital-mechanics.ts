export interface OrbitalBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  name: string;
}

export interface OrbitalElements {
  semiMajorAxis: number;
  eccentricity: number;
  period: number;
  apoapsis: number;
  periapsis: number;
}

export class OrbitalSimulator {
  private bodies: OrbitalBody[] = [];
  private G: number;
  private time = 0;

  constructor(gravitationalConstant = 6.674e-11) {
    this.G = gravitationalConstant;
  }

  addBody(
    name: string,
    x: number,
    y: number,
    vx: number,
    vy: number,
    mass: number,
  ): number {
    this.bodies.push({ x, y, vx, vy, mass, name });
    return this.bodies.length - 1;
  }

  getBody(index: number): OrbitalBody | undefined {
    return this.bodies[index];
  }

  bodyCount(): number {
    return this.bodies.length;
  }

  getTime(): number {
    return this.time;
  }

  step(dt: number): void {
    const n = this.bodies.length;
    const ax = new Float64Array(n);
    const ay = new Float64Array(n);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const bi = this.bodies[i];
        const bj = this.bodies[j];
        const dx = bj.x - bi.x;
        const dy = bj.y - bi.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        const force = this.G * bi.mass * bj.mass / distSq;
        const fx = force * dx / dist;
        const fy = force * dy / dist;

        ax[i] += fx / bi.mass;
        ay[i] += fy / bi.mass;
        ax[j] -= fx / bj.mass;
        ay[j] -= fy / bj.mass;
      }
    }

    for (let i = 0; i < n; i++) {
      const b = this.bodies[i];
      b.vx += ax[i] * dt;
      b.vy += ay[i] * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
    }

    this.time += dt;
  }

  totalEnergy(): number {
    let kinetic = 0;
    let potential = 0;

    for (let i = 0; i < this.bodies.length; i++) {
      const b = this.bodies[i];
      kinetic += 0.5 * b.mass * (b.vx * b.vx + b.vy * b.vy);
      for (let j = i + 1; j < this.bodies.length; j++) {
        const bj = this.bodies[j];
        const dx = bj.x - b.x;
        const dy = bj.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        potential -= this.G * b.mass * bj.mass / dist;
      }
    }

    return kinetic + potential;
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

  totalMomentum(): { x: number; y: number } {
    let px = 0;
    let py = 0;
    for (const b of this.bodies) {
      px += b.mass * b.vx;
      py += b.mass * b.vy;
    }
    return { x: px, y: py };
  }

  distanceBetween(i: number, j: number): number {
    const a = this.bodies[i];
    const b = this.bodies[j];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static circularOrbitSpeed(G: number, centralMass: number, radius: number): number {
    return Math.sqrt(G * centralMass / radius);
  }

  static escapeSpeed(G: number, centralMass: number, radius: number): number {
    return Math.sqrt(2 * G * centralMass / radius);
  }

  static orbitalPeriod(G: number, centralMass: number, semiMajorAxis: number): number {
    return 2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / (G * centralMass));
  }

  static orbitalElements(
    G: number,
    centralMass: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): OrbitalElements {
    const r = Math.sqrt(x * x + y * y);
    const v = Math.sqrt(vx * vx + vy * vy);
    const mu = G * centralMass;

    const specificEnergy = v * v / 2 - mu / r;
    const hx = x * vy - y * vx;
    const h = Math.abs(hx);

    const semiMajorAxis = -mu / (2 * specificEnergy);
    const eccentricity = Math.sqrt(1 + 2 * specificEnergy * h * h / (mu * mu));
    const period = 2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / mu);
    const periapsis = semiMajorAxis * (1 - eccentricity);
    const apoapsis = semiMajorAxis * (1 + eccentricity);

    return { semiMajorAxis, eccentricity, period, apoapsis, periapsis };
  }
}
