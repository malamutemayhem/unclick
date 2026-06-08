export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

export class NBodySim {
  static step(bodies: Body[], dt: number, G = 1, softening = 0.01): Body[] {
    const n = bodies.length;
    const ax = new Float64Array(n);
    const ay = new Float64Array(n);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const r2 = dx * dx + dy * dy + softening * softening;
        const r = Math.sqrt(r2);
        const f = G / (r2 * r);
        const fxij = f * dx;
        const fyij = f * dy;
        ax[i] += fxij * bodies[j].mass;
        ay[i] += fyij * bodies[j].mass;
        ax[j] -= fxij * bodies[i].mass;
        ay[j] -= fyij * bodies[i].mass;
      }
    }

    return bodies.map((b, i) => ({
      x: Math.round((b.x + b.vx * dt + 0.5 * ax[i] * dt * dt) * 10000) / 10000,
      y: Math.round((b.y + b.vy * dt + 0.5 * ay[i] * dt * dt) * 10000) / 10000,
      vx: Math.round((b.vx + ax[i] * dt) * 10000) / 10000,
      vy: Math.round((b.vy + ay[i] * dt) * 10000) / 10000,
      mass: b.mass,
    }));
  }

  static totalEnergy(bodies: Body[], G = 1): number {
    let ke = 0;
    let pe = 0;
    for (let i = 0; i < bodies.length; i++) {
      ke += 0.5 * bodies[i].mass * (bodies[i].vx ** 2 + bodies[i].vy ** 2);
      for (let j = i + 1; j < bodies.length; j++) {
        const dx = bodies[j].x - bodies[i].x;
        const dy = bodies[j].y - bodies[i].y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > 0) pe -= G * bodies[i].mass * bodies[j].mass / r;
      }
    }
    return Math.round((ke + pe) * 10000) / 10000;
  }

  static centerOfMass(bodies: Body[]): { x: number; y: number; mass: number } {
    let totalMass = 0, cx = 0, cy = 0;
    for (const b of bodies) {
      totalMass += b.mass;
      cx += b.x * b.mass;
      cy += b.y * b.mass;
    }
    return {
      x: Math.round((cx / totalMass) * 10000) / 10000,
      y: Math.round((cy / totalMass) * 10000) / 10000,
      mass: Math.round(totalMass * 10000) / 10000,
    };
  }

  static momentum(bodies: Body[]): { px: number; py: number } {
    let px = 0, py = 0;
    for (const b of bodies) {
      px += b.mass * b.vx;
      py += b.mass * b.vy;
    }
    return {
      px: Math.round(px * 10000) / 10000,
      py: Math.round(py * 10000) / 10000,
    };
  }

  static angularMomentum(bodies: Body[]): number {
    let L = 0;
    for (const b of bodies) {
      L += b.mass * (b.x * b.vy - b.y * b.vx);
    }
    return Math.round(L * 10000) / 10000;
  }

  static circularOrbit(centralMass: number, radius: number, G = 1): Body {
    const v = Math.sqrt(G * centralMass / radius);
    return {
      x: radius,
      y: 0,
      vx: 0,
      vy: Math.round(v * 10000) / 10000,
      mass: 0.001,
    };
  }
}
