export class Vec2 {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vec2): Vec2 { return new Vec2(this.x + other.x, this.y + other.y); }
  subtract(other: Vec2): Vec2 { return new Vec2(this.x - other.x, this.y - other.y); }
  scale(factor: number): Vec2 { return new Vec2(this.x * factor, this.y * factor); }

  dot(other: Vec2): number { return this.x * other.x + this.y * other.y; }
  cross(other: Vec2): number { return this.x * other.y - this.y * other.x; }

  get length(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
  get lengthSquared(): number { return this.x * this.x + this.y * this.y; }

  normalize(): Vec2 {
    const len = this.length;
    if (len === 0) return new Vec2(0, 0);
    return new Vec2(this.x / len, this.y / len);
  }

  rotate(angle: number): Vec2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  angle(): number { return Math.atan2(this.y, this.x); }

  angleTo(other: Vec2): number {
    return Math.atan2(this.cross(other), this.dot(other));
  }

  distanceTo(other: Vec2): number {
    return this.subtract(other).length;
  }

  lerp(other: Vec2, t: number): Vec2 {
    return new Vec2(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t);
  }

  negate(): Vec2 { return new Vec2(-this.x, -this.y); }

  equals(other: Vec2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string { return `(${this.x}, ${this.y})`; }

  static zero(): Vec2 { return new Vec2(0, 0); }
  static one(): Vec2 { return new Vec2(1, 1); }
  static up(): Vec2 { return new Vec2(0, 1); }
  static right(): Vec2 { return new Vec2(1, 0); }
}
