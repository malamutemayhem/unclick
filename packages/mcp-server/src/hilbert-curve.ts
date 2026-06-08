export class HilbertCurve {
  static xyToIndex(x: number, y: number, order: number): number {
    let rx: number, ry: number;
    let d = 0;
    let tempX = x;
    let tempY = y;
    for (let s = (1 << order) >> 1; s > 0; s >>= 1) {
      rx = (tempX & s) > 0 ? 1 : 0;
      ry = (tempY & s) > 0 ? 1 : 0;
      d += s * s * ((3 * rx) ^ ry);
      [tempX, tempY] = HilbertCurve.rotate(s, tempX, tempY, rx, ry);
    }
    return d;
  }

  static indexToXY(index: number, order: number): { x: number; y: number } {
    let rx: number, ry: number;
    let x = 0;
    let y = 0;
    let t = index;
    for (let s = 1; s < (1 << order); s <<= 1) {
      rx = (t / 2) & 1;
      ry = (t ^ rx) & 1;
      [x, y] = HilbertCurve.rotate(s, x, y, rx, ry);
      x += s * rx;
      y += s * ry;
      t = Math.floor(t / 4);
    }
    return { x, y };
  }

  private static rotate(n: number, x: number, y: number, rx: number, ry: number): [number, number] {
    if (ry === 0) {
      if (rx === 1) {
        x = n - 1 - x;
        y = n - 1 - y;
      }
      return [y, x];
    }
    return [x, y];
  }

  static generatePath(order: number): { x: number; y: number }[] {
    const n = 1 << order;
    const total = n * n;
    const path: { x: number; y: number }[] = [];
    for (let i = 0; i < total; i++) {
      path.push(HilbertCurve.indexToXY(i, order));
    }
    return path;
  }

  static distance(x1: number, y1: number, x2: number, y2: number, order: number): number {
    const i1 = HilbertCurve.xyToIndex(x1, y1, order);
    const i2 = HilbertCurve.xyToIndex(x2, y2, order);
    return Math.abs(i1 - i2);
  }

  static totalPoints(order: number): number {
    const n = 1 << order;
    return n * n;
  }

  static gridSize(order: number): number {
    return 1 << order;
  }
}
