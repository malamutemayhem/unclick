export interface ECPoint {
  x: number;
  y: number;
  infinity?: boolean;
}

export class EllipticCurveMath {
  readonly a: number;
  readonly b: number;
  readonly p: number;

  constructor(a: number, b: number, p: number) {
    this.a = a;
    this.b = b;
    this.p = p;
  }

  private mod(n: number): number {
    return ((n % this.p) + this.p) % this.p;
  }

  private modInverse(a: number): number {
    a = this.mod(a);
    let result = 1;
    let exp = this.p - 2;
    let base = a;
    while (exp > 0) {
      if (exp % 2 === 1) result = this.mod(result * base);
      base = this.mod(base * base);
      exp = Math.floor(exp / 2);
    }
    return result;
  }

  isOnCurve(point: ECPoint): boolean {
    if (point.infinity) return true;
    const lhs = this.mod(point.y * point.y);
    const rhs = this.mod(point.x * point.x * point.x + this.a * point.x + this.b);
    return lhs === rhs;
  }

  add(p1: ECPoint, p2: ECPoint): ECPoint {
    if (p1.infinity) return p2;
    if (p2.infinity) return p1;

    if (p1.x === p2.x && this.mod(p1.y + p2.y) === 0) {
      return { x: 0, y: 0, infinity: true };
    }

    let m: number;
    if (p1.x === p2.x && p1.y === p2.y) {
      m = this.mod((3 * p1.x * p1.x + this.a) * this.modInverse(2 * p1.y));
    } else {
      m = this.mod((p2.y - p1.y) * this.modInverse(p2.x - p1.x));
    }

    const x3 = this.mod(m * m - p1.x - p2.x);
    const y3 = this.mod(m * (p1.x - x3) - p1.y);
    return { x: x3, y: y3 };
  }

  multiply(point: ECPoint, n: number): ECPoint {
    if (n === 0 || point.infinity) return { x: 0, y: 0, infinity: true };

    let result: ECPoint = { x: 0, y: 0, infinity: true };
    let current = { ...point };
    let k = n;

    while (k > 0) {
      if (k % 2 === 1) result = this.add(result, current);
      current = this.add(current, current);
      k = Math.floor(k / 2);
    }
    return result;
  }

  negate(point: ECPoint): ECPoint {
    if (point.infinity) return point;
    return { x: point.x, y: this.mod(-point.y) };
  }

  order(point: ECPoint): number {
    let current = { ...point };
    for (let i = 1; i <= this.p + 1; i++) {
      if (current.infinity) return i;
      current = this.add(current, point);
    }
    return 0;
  }

  discriminant(): number {
    return this.mod(-16 * (4 * this.a * this.a * this.a + 27 * this.b * this.b));
  }

  allPoints(): ECPoint[] {
    const points: ECPoint[] = [{ x: 0, y: 0, infinity: true }];
    for (let x = 0; x < this.p; x++) {
      for (let y = 0; y < this.p; y++) {
        if (this.isOnCurve({ x, y })) {
          points.push({ x, y });
        }
      }
    }
    return points;
  }
}
