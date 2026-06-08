export interface Vec2 {
  x: number;
  y: number;
}

export interface RigidBodyConfig {
  mass?: number;
  restitution?: number;
  friction?: number;
  angularDamping?: number;
  linearDamping?: number;
}

export class RigidBody2D {
  position: Vec2;
  velocity: Vec2;
  acceleration: Vec2;
  angle: number;
  angularVelocity: number;
  mass: number;
  inverseMass: number;
  restitution: number;
  friction: number;
  angularDamping: number;
  linearDamping: number;
  private forces: Vec2[] = [];
  private torques: number[] = [];

  constructor(x: number, y: number, config: RigidBodyConfig = {}) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.angle = 0;
    this.angularVelocity = 0;
    this.mass = config.mass ?? 1;
    this.inverseMass = this.mass === 0 ? 0 : 1 / this.mass;
    this.restitution = config.restitution ?? 0.5;
    this.friction = config.friction ?? 0.1;
    this.angularDamping = config.angularDamping ?? 0.01;
    this.linearDamping = config.linearDamping ?? 0.01;
  }

  applyForce(force: Vec2): void {
    this.forces.push(force);
  }

  applyTorque(torque: number): void {
    this.torques.push(torque);
  }

  applyImpulse(impulse: Vec2): void {
    this.velocity.x += impulse.x * this.inverseMass;
    this.velocity.y += impulse.y * this.inverseMass;
  }

  step(dt: number): void {
    if (this.mass === 0) return;

    let fx = 0;
    let fy = 0;
    for (const f of this.forces) {
      fx += f.x;
      fy += f.y;
    }
    this.forces = [];

    this.acceleration.x = fx * this.inverseMass;
    this.acceleration.y = fy * this.inverseMass;

    this.velocity.x += this.acceleration.x * dt;
    this.velocity.y += this.acceleration.y * dt;

    this.velocity.x *= 1 - this.linearDamping;
    this.velocity.y *= 1 - this.linearDamping;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    let totalTorque = 0;
    for (const t of this.torques) {
      totalTorque += t;
    }
    this.torques = [];

    this.angularVelocity += totalTorque * this.inverseMass * dt;
    this.angularVelocity *= 1 - this.angularDamping;
    this.angle += this.angularVelocity * dt;
  }

  kineticEnergy(): number {
    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y,
    );
    return 0.5 * this.mass * speed * speed;
  }

  momentum(): Vec2 {
    return {
      x: this.mass * this.velocity.x,
      y: this.mass * this.velocity.y,
    };
  }

  speed(): number {
    return Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y,
    );
  }

  isStatic(): boolean {
    return this.mass === 0;
  }
}

export class PhysicsWorld {
  private bodies: RigidBody2D[] = [];
  private gravity: Vec2;

  constructor(gravity: Vec2 = { x: 0, y: -9.81 }) {
    this.gravity = gravity;
  }

  addBody(body: RigidBody2D): void {
    this.bodies.push(body);
  }

  removeBody(body: RigidBody2D): void {
    const idx = this.bodies.indexOf(body);
    if (idx >= 0) this.bodies.splice(idx, 1);
  }

  step(dt: number): void {
    for (const body of this.bodies) {
      if (!body.isStatic()) {
        body.applyForce({
          x: this.gravity.x * body.mass,
          y: this.gravity.y * body.mass,
        });
      }
      body.step(dt);
    }
  }

  bodyCount(): number {
    return this.bodies.length;
  }

  totalEnergy(): number {
    let total = 0;
    for (const body of this.bodies) {
      total += body.kineticEnergy();
    }
    return total;
  }

  totalMomentum(): Vec2 {
    const result: Vec2 = { x: 0, y: 0 };
    for (const body of this.bodies) {
      const m = body.momentum();
      result.x += m.x;
      result.y += m.y;
    }
    return result;
  }

  getBodies(): RigidBody2D[] {
    return [...this.bodies];
  }
}
