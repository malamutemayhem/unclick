export class MortonCode {
  static encode2D(x: number, y: number): number {
    return MortonCode.spread(x) | (MortonCode.spread(y) << 1);
  }

  static decode2D(code: number): { x: number; y: number } {
    return {
      x: MortonCode.compact(code),
      y: MortonCode.compact(code >> 1),
    };
  }

  private static spread(v: number): number {
    let x = v & 0xFFFF;
    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;
    return x;
  }

  private static compact(v: number): number {
    let x = v & 0x55555555;
    x = (x | (x >> 1)) & 0x33333333;
    x = (x | (x >> 2)) & 0x0F0F0F0F;
    x = (x | (x >> 4)) & 0x00FF00FF;
    x = (x | (x >> 8)) & 0x0000FFFF;
    return x;
  }

  static encode3D(x: number, y: number, z: number): number {
    return MortonCode.spread3(x) | (MortonCode.spread3(y) << 1) | (MortonCode.spread3(z) << 2);
  }

  static decode3D(code: number): { x: number; y: number; z: number } {
    return {
      x: MortonCode.compact3(code),
      y: MortonCode.compact3(code >> 1),
      z: MortonCode.compact3(code >> 2),
    };
  }

  private static spread3(v: number): number {
    let x = v & 0x3FF;
    x = (x | (x << 16)) & 0x030000FF;
    x = (x | (x << 8)) & 0x0300F00F;
    x = (x | (x << 4)) & 0x030C30C3;
    x = (x | (x << 2)) & 0x09249249;
    return x;
  }

  private static compact3(v: number): number {
    let x = v & 0x09249249;
    x = (x | (x >> 2)) & 0x030C30C3;
    x = (x | (x >> 4)) & 0x0300F00F;
    x = (x | (x >> 8)) & 0x030000FF;
    x = (x | (x >> 16)) & 0x3FF;
    return x;
  }

  static compare2D(ax: number, ay: number, bx: number, by: number): number {
    const a = MortonCode.encode2D(ax, ay);
    const b = MortonCode.encode2D(bx, by);
    return a - b;
  }

  static sort2D(points: { x: number; y: number }[]): { x: number; y: number }[] {
    return [...points].sort((a, b) => MortonCode.compare2D(a.x, a.y, b.x, b.y));
  }

  static range2D(minX: number, minY: number, maxX: number, maxY: number): number[] {
    const codes: number[] = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        codes.push(MortonCode.encode2D(x, y));
      }
    }
    return codes.sort((a, b) => a - b);
  }
}
