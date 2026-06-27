export interface ProjectileState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
}

export class ProjectileSimulator {
  private gravity: number;
  private dragCoefficient: number;

  constructor(gravity = 9.81, dragCoefficient = 0) {
    this.gravity = gravity;
    this.dragCoefficient = dragCoefficient;
  }

  launch(
    speed: number,
    angleDeg: number,
    height = 0,
    dt = 0.01,
  ): ProjectileState[] {
    const angleRad = (angleDeg * Math.PI) / 180;
    let vx = speed * Math.cos(angleRad);
    let vy = speed * Math.sin(angleRad);
    let x = 0;
    let y = height;
    let t = 0;
    const trajectory: ProjectileState[] = [{ x, y, vx, vy, time: t }];

    while (y >= 0) {
      const v = Math.sqrt(vx * vx + vy * vy);
      const ax = -this.dragCoefficient * v * vx;
      const ay = -this.gravity - this.dragCoefficient * v * vy;
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      t += dt;
      trajectory.push({ x, y, vx, vy, time: t });
      if (t > 10000) break;
    }

    return trajectory;
  }

  static range(speed: number, angleDeg: number, gravity = 9.81): number {
    const angleRad = (angleDeg * Math.PI) / 180;
    return (speed * speed * Math.sin(2 * angleRad)) / gravity;
  }

  static maxHeight(speed: number, angleDeg: number, gravity = 9.81): number {
    const angleRad = (angleDeg * Math.PI) / 180;
    const vy = speed * Math.sin(angleRad);
    return (vy * vy) / (2 * gravity);
  }

  static timeOfFlight(speed: number, angleDeg: number, gravity = 9.81): number {
    const angleRad = (angleDeg * Math.PI) / 180;
    const vy = speed * Math.sin(angleRad);
    return (2 * vy) / gravity;
  }

  static optimalAngle(): number {
    return 45;
  }

  static maxRange(speed: number, gravity = 9.81): number {
    return (speed * speed) / gravity;
  }
}

export class BallisticTable {
  private gravity: number;

  constructor(gravity = 9.81) {
    this.gravity = gravity;
  }

  generate(
    speed: number,
    startAngle: number,
    endAngle: number,
    step: number,
  ): Array<{ angle: number; range: number; maxHeight: number; flightTime: number }> {
    const results: Array<{
      angle: number;
      range: number;
      maxHeight: number;
      flightTime: number;
    }> = [];

    for (let angle = startAngle; angle <= endAngle; angle += step) {
      results.push({
        angle,
        range: ProjectileSimulator.range(speed, angle, this.gravity),
        maxHeight: ProjectileSimulator.maxHeight(speed, angle, this.gravity),
        flightTime: ProjectileSimulator.timeOfFlight(speed, angle, this.gravity),
      });
    }

    return results;
  }

  findAngleForRange(speed: number, targetRange: number): number | null {
    const maxR = ProjectileSimulator.maxRange(speed, this.gravity);
    if (targetRange > maxR) return null;
    const sin2a = (targetRange * this.gravity) / (speed * speed);
    return (Math.asin(sin2a) * 180) / (2 * Math.PI);
  }

  findAngleForHeight(speed: number, targetHeight: number): number | null {
    const maxH = (speed * speed) / (2 * this.gravity);
    if (targetHeight > maxH) return null;
    const sinA = Math.sqrt((2 * this.gravity * targetHeight) / (speed * speed));
    return (Math.asin(sinA) * 180) / Math.PI;
  }
}
