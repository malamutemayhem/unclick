export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

export class MolecularDynamics {
  static lennardJones(r: number, epsilon = 1, sigma = 1): number {
    const s6 = (sigma / r) ** 6;
    return 4 * epsilon * (s6 * s6 - s6);
  }

  static ljForce(r: number, epsilon = 1, sigma = 1): number {
    const s6 = (sigma / r) ** 6;
    return 24 * epsilon * (2 * s6 * s6 - s6) / r;
  }

  static step(particles: Particle[], dt: number, epsilon = 1, sigma = 1, cutoff = 3): Particle[] {
    const n = particles.length;
    const fx = new Float64Array(n);
    const fy = new Float64Array(n);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < cutoff && r > 0.01) {
          const f = MolecularDynamics.ljForce(r, epsilon, sigma);
          const fdx = f * dx / r;
          const fdy = f * dy / r;
          fx[i] += fdx;
          fy[i] += fdy;
          fx[j] -= fdx;
          fy[j] -= fdy;
        }
      }
    }

    return particles.map((p, i) => ({
      x: Math.round((p.x + p.vx * dt + 0.5 * fx[i] / p.mass * dt * dt) * 10000) / 10000,
      y: Math.round((p.y + p.vy * dt + 0.5 * fy[i] / p.mass * dt * dt) * 10000) / 10000,
      vx: Math.round((p.vx + fx[i] / p.mass * dt) * 10000) / 10000,
      vy: Math.round((p.vy + fy[i] / p.mass * dt) * 10000) / 10000,
      mass: p.mass,
    }));
  }

  static kineticEnergy(particles: Particle[]): number {
    let ke = 0;
    for (const p of particles) {
      ke += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
    }
    return Math.round(ke * 10000) / 10000;
  }

  static temperature(particles: Particle[]): number {
    const ke = MolecularDynamics.kineticEnergy(particles);
    return Math.round((2 * ke / (2 * particles.length)) * 10000) / 10000;
  }

  static potentialEnergy(particles: Particle[], epsilon = 1, sigma = 1, cutoff = 3): number {
    let pe = 0;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < cutoff && r > 0.01) {
          pe += MolecularDynamics.lennardJones(r, epsilon, sigma);
        }
      }
    }
    return Math.round(pe * 10000) / 10000;
  }

  static radialDistribution(particles: Particle[], dr = 0.1, maxR = 5): { r: number; g: number }[] {
    const n = particles.length;
    const bins: number[] = [];
    const nBins = Math.ceil(maxR / dr);
    for (let b = 0; b < nBins; b++) bins.push(0);

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const r = Math.sqrt(dx * dx + dy * dy);
        const bin = Math.floor(r / dr);
        if (bin < nBins) bins[bin] += 2;
      }
    }

    return bins.map((count, b) => {
      const r = (b + 0.5) * dr;
      const shellArea = 2 * Math.PI * r * dr;
      return {
        r: Math.round(r * 10000) / 10000,
        g: Math.round((count / (n * shellArea)) * 10000) / 10000,
      };
    });
  }
}
