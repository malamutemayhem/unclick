export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type SDF = (p: Vec3) => number;

export class RayMarcher {
  static sphere(center: Vec3, radius: number): SDF {
    return (p: Vec3) => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      const dz = p.z - center.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz) - radius;
    };
  }

  static box(center: Vec3, half: Vec3): SDF {
    return (p: Vec3) => {
      const dx = Math.abs(p.x - center.x) - half.x;
      const dy = Math.abs(p.y - center.y) - half.y;
      const dz = Math.abs(p.z - center.z) - half.z;
      const outside = Math.sqrt(
        Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2 + Math.max(dz, 0) ** 2
      );
      const inside = Math.min(Math.max(dx, dy, dz), 0);
      return outside + inside;
    };
  }

  static plane(normal: Vec3, offset: number): SDF {
    const len = Math.sqrt(normal.x ** 2 + normal.y ** 2 + normal.z ** 2);
    const nx = normal.x / len, ny = normal.y / len, nz = normal.z / len;
    return (p: Vec3) => p.x * nx + p.y * ny + p.z * nz + offset;
  }

  static union(a: SDF, b: SDF): SDF {
    return (p: Vec3) => Math.min(a(p), b(p));
  }

  static intersection(a: SDF, b: SDF): SDF {
    return (p: Vec3) => Math.max(a(p), b(p));
  }

  static difference(a: SDF, b: SDF): SDF {
    return (p: Vec3) => Math.max(a(p), -b(p));
  }

  static smoothUnion(a: SDF, b: SDF, k: number): SDF {
    return (p: Vec3) => {
      const da = a(p);
      const db = b(p);
      const h = Math.max(k - Math.abs(da - db), 0) / k;
      return Math.min(da, db) - h * h * k * 0.25;
    };
  }

  static march(
    origin: Vec3,
    direction: Vec3,
    scene: SDF,
    maxSteps = 64,
    maxDist = 100,
    epsilon = 0.001,
  ): { hit: boolean; position: Vec3; distance: number; steps: number } {
    const len = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    const dx = direction.x / len, dy = direction.y / len, dz = direction.z / len;
    let t = 0;
    for (let i = 0; i < maxSteps; i++) {
      const p = { x: origin.x + dx * t, y: origin.y + dy * t, z: origin.z + dz * t };
      const d = scene(p);
      if (d < epsilon) {
        return {
          hit: true,
          position: {
            x: Math.round(p.x * 10000) / 10000,
            y: Math.round(p.y * 10000) / 10000,
            z: Math.round(p.z * 10000) / 10000,
          },
          distance: Math.round(t * 10000) / 10000,
          steps: i + 1,
        };
      }
      t += d;
      if (t > maxDist) break;
    }
    return {
      hit: false,
      position: { x: origin.x + dx * t, y: origin.y + dy * t, z: origin.z + dz * t },
      distance: Math.round(t * 10000) / 10000,
      steps: maxSteps,
    };
  }

  static normal(scene: SDF, p: Vec3, epsilon = 0.0001): Vec3 {
    const d = scene(p);
    const nx = scene({ x: p.x + epsilon, y: p.y, z: p.z }) - d;
    const ny = scene({ x: p.x, y: p.y + epsilon, z: p.z }) - d;
    const nz = scene({ x: p.x, y: p.y, z: p.z + epsilon }) - d;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    return {
      x: Math.round((nx / len) * 10000) / 10000,
      y: Math.round((ny / len) * 10000) / 10000,
      z: Math.round((nz / len) * 10000) / 10000,
    };
  }
}
