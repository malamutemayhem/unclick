export interface Vec2 {
  x: number;
  y: number;
}

export interface Body {
  position: Vec2;
  velocity: Vec2;
  mass: number;
  radius: number;
}

export class PhysicsEngine {
  static step(bodies: Body[], dt: number, gravity: Vec2 = { x: 0, y: -9.81 }): Body[] {
    return bodies.map(body => ({
      ...body,
      velocity: {
        x: Math.round((body.velocity.x + gravity.x * dt) * 10000) / 10000,
        y: Math.round((body.velocity.y + gravity.y * dt) * 10000) / 10000,
      },
      position: {
        x: Math.round((body.position.x + body.velocity.x * dt) * 10000) / 10000,
        y: Math.round((body.position.y + body.velocity.y * dt) * 10000) / 10000,
      },
    }));
  }

  static applyForce(body: Body, force: Vec2, dt: number): Body {
    const ax = force.x / body.mass;
    const ay = force.y / body.mass;
    return {
      ...body,
      velocity: {
        x: Math.round((body.velocity.x + ax * dt) * 10000) / 10000,
        y: Math.round((body.velocity.y + ay * dt) * 10000) / 10000,
      },
    };
  }

  static collides(a: Body, b: Body): boolean {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < a.radius + b.radius;
  }

  static elasticCollision(a: Body, b: Body): { a: Body; b: Body } {
    const dx = b.position.x - a.position.x;
    const dy = b.position.y - a.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    const dvx = a.velocity.x - b.velocity.x;
    const dvy = a.velocity.y - b.velocity.y;
    const dvn = dvx * nx + dvy * ny;

    if (dvn <= 0) return { a, b };

    const totalMass = a.mass + b.mass;
    const impulse = (2 * dvn) / totalMass;

    return {
      a: {
        ...a,
        velocity: {
          x: Math.round((a.velocity.x - impulse * b.mass * nx) * 10000) / 10000,
          y: Math.round((a.velocity.y - impulse * b.mass * ny) * 10000) / 10000,
        },
      },
      b: {
        ...b,
        velocity: {
          x: Math.round((b.velocity.x + impulse * a.mass * nx) * 10000) / 10000,
          y: Math.round((b.velocity.y + impulse * a.mass * ny) * 10000) / 10000,
        },
      },
    };
  }

  static kineticEnergy(body: Body): number {
    const v2 = body.velocity.x ** 2 + body.velocity.y ** 2;
    return Math.round(0.5 * body.mass * v2 * 10000) / 10000;
  }

  static momentum(body: Body): Vec2 {
    return {
      x: Math.round(body.mass * body.velocity.x * 10000) / 10000,
      y: Math.round(body.mass * body.velocity.y * 10000) / 10000,
    };
  }

  static gravitationalForce(a: Body, b: Body, G = 6.674e-11): Vec2 {
    const dx = b.position.x - a.position.x;
    const dy = b.position.y - a.position.y;
    const dist2 = dx * dx + dy * dy;
    const dist = Math.sqrt(dist2) || 1;
    const force = G * a.mass * b.mass / dist2;
    return {
      x: Math.round(force * dx / dist * 10000) / 10000,
      y: Math.round(force * dy / dist * 10000) / 10000,
    };
  }

  static projectile(v0: number, angle: number, g = 9.81): {
    maxHeight: number;
    range: number;
    flightTime: number;
  } {
    const rad = angle * Math.PI / 180;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);
    return {
      maxHeight: Math.round((vy * vy / (2 * g)) * 10000) / 10000,
      range: Math.round((2 * vx * vy / g) * 10000) / 10000,
      flightTime: Math.round((2 * vy / g) * 10000) / 10000,
    };
  }
}
