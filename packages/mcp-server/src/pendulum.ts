export class SimplePendulum {
  angle: number;
  angularVelocity: number;
  private length: number;
  private gravity: number;
  private damping: number;
  private time = 0;

  constructor(length: number, gravity = 9.81, damping = 0) {
    this.length = length;
    this.gravity = gravity;
    this.damping = damping;
    this.angle = 0;
    this.angularVelocity = 0;
  }

  setAngle(radians: number): void {
    this.angle = radians;
  }

  kick(impulse: number): void {
    this.angularVelocity += impulse;
  }

  step(dt: number): void {
    const angularAccel =
      (-this.gravity / this.length) * Math.sin(this.angle) -
      this.damping * this.angularVelocity;
    this.angularVelocity += angularAccel * dt;
    this.angle += this.angularVelocity * dt;
    this.time += dt;
  }

  position(): { x: number; y: number } {
    return {
      x: this.length * Math.sin(this.angle),
      y: -this.length * Math.cos(this.angle),
    };
  }

  period(): number {
    return 2 * Math.PI * Math.sqrt(this.length / this.gravity);
  }

  energy(): number {
    const ke = 0.5 * this.length * this.length * this.angularVelocity * this.angularVelocity;
    const pe = this.gravity * this.length * (1 - Math.cos(this.angle));
    return ke + pe;
  }

  getTime(): number {
    return this.time;
  }

  getLength(): number {
    return this.length;
  }
}

export class DoublePendulum {
  angle1: number;
  angle2: number;
  omega1: number;
  omega2: number;
  private l1: number;
  private l2: number;
  private m1: number;
  private m2: number;
  private gravity: number;
  private time = 0;

  constructor(
    l1: number,
    l2: number,
    m1 = 1,
    m2 = 1,
    gravity = 9.81,
  ) {
    this.l1 = l1;
    this.l2 = l2;
    this.m1 = m1;
    this.m2 = m2;
    this.gravity = gravity;
    this.angle1 = 0;
    this.angle2 = 0;
    this.omega1 = 0;
    this.omega2 = 0;
  }

  setAngles(a1: number, a2: number): void {
    this.angle1 = a1;
    this.angle2 = a2;
  }

  step(dt: number): void {
    const g = this.gravity;
    const m1 = this.m1;
    const m2 = this.m2;
    const l1 = this.l1;
    const l2 = this.l2;
    const a1 = this.angle1;
    const a2 = this.angle2;
    const w1 = this.omega1;
    const w2 = this.omega2;
    const da = a1 - a2;

    const den1 = (2 * m1 + m2 - m2 * Math.cos(2 * da)) * l1;
    const alpha1 =
      (-g * (2 * m1 + m2) * Math.sin(a1) -
        m2 * g * Math.sin(a1 - 2 * a2) -
        2 * Math.sin(da) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(da))) /
      den1;

    const den2 = (2 * m1 + m2 - m2 * Math.cos(2 * da)) * l2;
    const alpha2 =
      (2 *
        Math.sin(da) *
        (w1 * w1 * l1 * (m1 + m2) +
          g * (m1 + m2) * Math.cos(a1) +
          w2 * w2 * l2 * m2 * Math.cos(da))) /
      den2;

    this.omega1 += alpha1 * dt;
    this.omega2 += alpha2 * dt;
    this.angle1 += this.omega1 * dt;
    this.angle2 += this.omega2 * dt;
    this.time += dt;
  }

  positions(): { p1: { x: number; y: number }; p2: { x: number; y: number } } {
    const x1 = this.l1 * Math.sin(this.angle1);
    const y1 = -this.l1 * Math.cos(this.angle1);
    const x2 = x1 + this.l2 * Math.sin(this.angle2);
    const y2 = y1 - this.l2 * Math.cos(this.angle2);
    return { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } };
  }

  energy(): number {
    const g = this.gravity;
    const v1 = this.l1 * this.omega1;
    const v2x =
      this.l1 * this.omega1 * Math.cos(this.angle1) +
      this.l2 * this.omega2 * Math.cos(this.angle2);
    const v2y =
      this.l1 * this.omega1 * Math.sin(this.angle1) +
      this.l2 * this.omega2 * Math.sin(this.angle2);
    const ke1 = 0.5 * this.m1 * v1 * v1;
    const ke2 = 0.5 * this.m2 * (v2x * v2x + v2y * v2y);
    const pe1 = this.m1 * g * (-this.l1 * Math.cos(this.angle1));
    const pe2 =
      this.m2 * g * (-this.l1 * Math.cos(this.angle1) - this.l2 * Math.cos(this.angle2));
    return ke1 + ke2 + pe1 + pe2;
  }

  getTime(): number {
    return this.time;
  }
}
