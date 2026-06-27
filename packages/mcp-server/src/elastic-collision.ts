export interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
}

export class CollisionEngine {
  static elastic1D(
    m1: number,
    v1: number,
    m2: number,
    v2: number,
  ): { v1: number; v2: number } {
    const totalMass = m1 + m2;
    const newV1 = ((m1 - m2) * v1 + 2 * m2 * v2) / totalMass;
    const newV2 = ((m2 - m1) * v2 + 2 * m1 * v1) / totalMass;
    return { v1: newV1, v2: newV2 };
  }

  static inelastic1D(
    m1: number,
    v1: number,
    m2: number,
    v2: number,
    restitution: number,
  ): { v1: number; v2: number } {
    const totalMass = m1 + m2;
    const vcm = (m1 * v1 + m2 * v2) / totalMass;
    const newV1 = vcm + restitution * m2 * (v2 - v1) / totalMass;
    const newV2 = vcm + restitution * m1 * (v1 - v2) / totalMass;
    return { v1: newV1, v2: newV2 };
  }

  static perfectlyInelastic1D(
    m1: number,
    v1: number,
    m2: number,
    v2: number,
  ): number {
    return (m1 * v1 + m2 * v2) / (m1 + m2);
  }

  static elastic2D(
    a: Particle2D,
    b: Particle2D,
  ): { a: { vx: number; vy: number }; b: { vx: number; vy: number } } {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    const dvx = a.vx - b.vx;
    const dvy = a.vy - b.vy;
    const dvDotN = dvx * nx + dvy * ny;

    if (dvDotN <= 0) {
      return {
        a: { vx: a.vx, vy: a.vy },
        b: { vx: b.vx, vy: b.vy },
      };
    }

    const totalMass = a.mass + b.mass;
    const impulse = (2 * dvDotN) / totalMass;

    return {
      a: {
        vx: a.vx - impulse * b.mass * nx,
        vy: a.vy - impulse * b.mass * ny,
      },
      b: {
        vx: b.vx + impulse * a.mass * nx,
        vy: b.vy + impulse * a.mass * ny,
      },
    };
  }

  static detectCollision(a: Particle2D, b: Particle2D): boolean {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= a.radius + b.radius;
  }

  static kineticEnergy(mass: number, vx: number, vy: number): number {
    return 0.5 * mass * (vx * vx + vy * vy);
  }

  static momentum(mass: number, vx: number, vy: number): { px: number; py: number } {
    return { px: mass * vx, py: mass * vy };
  }

  static totalKineticEnergy(particles: Particle2D[]): number {
    let total = 0;
    for (const p of particles) {
      total += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
    }
    return total;
  }

  static totalMomentum(particles: Particle2D[]): { px: number; py: number } {
    let px = 0;
    let py = 0;
    for (const p of particles) {
      px += p.mass * p.vx;
      py += p.mass * p.vy;
    }
    return { px, py };
  }

  static energyLoss(
    m1: number,
    v1Before: number,
    v2Before: number,
    m2: number,
    v1After: number,
    v2After: number,
  ): number {
    const keBefore =
      0.5 * m1 * v1Before * v1Before + 0.5 * m2 * v2Before * v2Before;
    const keAfter =
      0.5 * m1 * v1After * v1After + 0.5 * m2 * v2After * v2After;
    return keBefore - keAfter;
  }
}

export class ParticleSimulator {
  private particles: Particle2D[] = [];
  private bounds: { width: number; height: number } | null = null;

  addParticle(p: Particle2D): number {
    this.particles.push({ ...p });
    return this.particles.length - 1;
  }

  setBounds(width: number, height: number): void {
    this.bounds = { width, height };
  }

  getParticle(index: number): Particle2D | undefined {
    return this.particles[index];
  }

  particleCount(): number {
    return this.particles.length;
  }

  step(dt: number): void {
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    if (this.bounds) {
      for (const p of this.particles) {
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
        } else if (p.x + p.radius > this.bounds.width) {
          p.x = this.bounds.width - p.radius;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
        } else if (p.y + p.radius > this.bounds.height) {
          p.y = this.bounds.height - p.radius;
          p.vy = -Math.abs(p.vy);
        }
      }
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        if (CollisionEngine.detectCollision(a, b)) {
          const result = CollisionEngine.elastic2D(a, b);
          a.vx = result.a.vx;
          a.vy = result.a.vy;
          b.vx = result.b.vx;
          b.vy = result.b.vy;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const overlap = a.radius + b.radius - dist;
          if (overlap > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const totalMass = a.mass + b.mass;
            a.x -= nx * overlap * (b.mass / totalMass);
            a.y -= ny * overlap * (b.mass / totalMass);
            b.x += nx * overlap * (a.mass / totalMass);
            b.y += ny * overlap * (a.mass / totalMass);
          }
        }
      }
    }
  }

  totalEnergy(): number {
    return CollisionEngine.totalKineticEnergy(this.particles);
  }

  totalMomentum(): { px: number; py: number } {
    return CollisionEngine.totalMomentum(this.particles);
  }
}
