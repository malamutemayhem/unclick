export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export class BezierSurface {
  private controlPoints: Point3D[][];

  constructor(controlPoints: Point3D[][]) {
    this.controlPoints = controlPoints.map((row) => row.map((p) => ({ ...p })));
  }

  evaluate(u: number, v: number): Point3D {
    const n = this.controlPoints.length - 1;
    const m = this.controlPoints[0].length - 1;
    let x = 0, y = 0, z = 0;

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= m; j++) {
        const basis = BezierSurface.bernstein(n, i, u) * BezierSurface.bernstein(m, j, v);
        x += basis * this.controlPoints[i][j].x;
        y += basis * this.controlPoints[i][j].y;
        z += basis * this.controlPoints[i][j].z;
      }
    }

    return { x, y, z };
  }

  private static bernstein(n: number, k: number, t: number): number {
    return BezierSurface.binomial(n, k) * Math.pow(t, k) * Math.pow(1 - t, n - k);
  }

  private static binomial(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = result * (n - i) / (i + 1);
    }
    return result;
  }

  generateMesh(uSteps: number, vSteps: number): Point3D[][] {
    const mesh: Point3D[][] = [];
    for (let i = 0; i <= uSteps; i++) {
      const row: Point3D[] = [];
      for (let j = 0; j <= vSteps; j++) {
        row.push(this.evaluate(i / uSteps, j / vSteps));
      }
      mesh.push(row);
    }
    return mesh;
  }

  normal(u: number, v: number, delta = 0.001): Point3D {
    const p = this.evaluate(u, v);
    const pu = this.evaluate(Math.min(u + delta, 1), v);
    const pv = this.evaluate(u, Math.min(v + delta, 1));

    const du = { x: pu.x - p.x, y: pu.y - p.y, z: pu.z - p.z };
    const dv = { x: pv.x - p.x, y: pv.y - p.y, z: pv.z - p.z };

    const nx = du.y * dv.z - du.z * dv.y;
    const ny = du.z * dv.x - du.x * dv.z;
    const nz = du.x * dv.y - du.y * dv.x;
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

    if (len < 1e-10) return { x: 0, y: 0, z: 1 };
    return { x: nx / len, y: ny / len, z: nz / len };
  }

  degree(): { u: number; v: number } {
    return {
      u: this.controlPoints.length - 1,
      v: this.controlPoints[0].length - 1,
    };
  }

  controlPointCount(): number {
    return this.controlPoints.length * this.controlPoints[0].length;
  }

  getControlPoints(): Point3D[][] {
    return this.controlPoints.map((row) => row.map((p) => ({ ...p })));
  }
}
