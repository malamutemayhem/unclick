export interface FluidConfig {
  width: number;
  height: number;
  viscosity?: number;
  diffusion?: number;
}

export class FluidGrid {
  readonly width: number;
  readonly height: number;
  private viscosity: number;
  private diffusion: number;
  private density: Float64Array;
  private densityPrev: Float64Array;
  private vx: Float64Array;
  private vy: Float64Array;
  private vxPrev: Float64Array;
  private vyPrev: Float64Array;

  constructor(config: FluidConfig) {
    this.width = config.width;
    this.height = config.height;
    this.viscosity = config.viscosity ?? 0.0001;
    this.diffusion = config.diffusion ?? 0.0001;
    const size = (config.width + 2) * (config.height + 2);
    this.density = new Float64Array(size);
    this.densityPrev = new Float64Array(size);
    this.vx = new Float64Array(size);
    this.vy = new Float64Array(size);
    this.vxPrev = new Float64Array(size);
    this.vyPrev = new Float64Array(size);
  }

  private idx(x: number, y: number): number {
    return x + (this.width + 2) * y;
  }

  addDensity(x: number, y: number, amount: number): void {
    this.density[this.idx(x + 1, y + 1)] += amount;
  }

  addVelocity(x: number, y: number, amountX: number, amountY: number): void {
    const i = this.idx(x + 1, y + 1);
    this.vx[i] += amountX;
    this.vy[i] += amountY;
  }

  getDensity(x: number, y: number): number {
    return this.density[this.idx(x + 1, y + 1)];
  }

  getVelocity(x: number, y: number): { vx: number; vy: number } {
    const i = this.idx(x + 1, y + 1);
    return { vx: this.vx[i], vy: this.vy[i] };
  }

  step(dt: number): void {
    const N = this.width;
    this.diffuse(1, this.vxPrev, this.vx, this.viscosity, dt, N);
    this.diffuse(2, this.vyPrev, this.vy, this.viscosity, dt, N);
    this.project(this.vxPrev, this.vyPrev, this.vx, this.vy, N);
    this.advect(1, this.vx, this.vxPrev, this.vxPrev, this.vyPrev, dt, N);
    this.advect(2, this.vy, this.vyPrev, this.vxPrev, this.vyPrev, dt, N);
    this.project(this.vx, this.vy, this.vxPrev, this.vyPrev, N);
    this.diffuse(0, this.densityPrev, this.density, this.diffusion, dt, N);
    this.advect(0, this.density, this.densityPrev, this.vx, this.vy, dt, N);
  }

  getDensityGrid(): number[][] {
    const result: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(this.density[this.idx(x + 1, y + 1)]);
      }
      result.push(row);
    }
    return result;
  }

  totalDensity(): number {
    let sum = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        sum += this.density[this.idx(x + 1, y + 1)];
      }
    }
    return sum;
  }

  private diffuse(
    b: number, x: Float64Array, x0: Float64Array,
    diff: number, dt: number, N: number,
  ): void {
    const a = dt * diff * N * N;
    for (let k = 0; k < 20; k++) {
      for (let j = 1; j <= N; j++) {
        for (let i = 1; i <= N; i++) {
          const idx = this.idx(i, j);
          x[idx] = (x0[idx] + a * (
            x[this.idx(i - 1, j)] + x[this.idx(i + 1, j)] +
            x[this.idx(i, j - 1)] + x[this.idx(i, j + 1)]
          )) / (1 + 4 * a);
        }
      }
      this.setBound(b, x, N);
    }
  }

  private advect(
    b: number, d: Float64Array, d0: Float64Array,
    u: Float64Array, v: Float64Array, dt: number, N: number,
  ): void {
    const dt0 = dt * N;
    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        const idx = this.idx(i, j);
        let x = i - dt0 * u[idx];
        let y = j - dt0 * v[idx];
        if (x < 0.5) x = 0.5;
        if (x > N + 0.5) x = N + 0.5;
        if (y < 0.5) y = 0.5;
        if (y > N + 0.5) y = N + 0.5;
        const i0 = Math.floor(x);
        const j0 = Math.floor(y);
        const s1 = x - i0;
        const t1 = y - j0;
        const s0 = 1 - s1;
        const t0 = 1 - t1;
        d[idx] = s0 * (t0 * d0[this.idx(i0, j0)] + t1 * d0[this.idx(i0, j0 + 1)]) +
          s1 * (t0 * d0[this.idx(i0 + 1, j0)] + t1 * d0[this.idx(i0 + 1, j0 + 1)]);
      }
    }
    this.setBound(b, d, N);
  }

  private project(
    u: Float64Array, v: Float64Array,
    p: Float64Array, div: Float64Array, N: number,
  ): void {
    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        const idx = this.idx(i, j);
        div[idx] = -0.5 * (
          u[this.idx(i + 1, j)] - u[this.idx(i - 1, j)] +
          v[this.idx(i, j + 1)] - v[this.idx(i, j - 1)]
        ) / N;
        p[idx] = 0;
      }
    }
    this.setBound(0, div, N);
    this.setBound(0, p, N);

    for (let k = 0; k < 20; k++) {
      for (let j = 1; j <= N; j++) {
        for (let i = 1; i <= N; i++) {
          const idx = this.idx(i, j);
          p[idx] = (div[idx] + p[this.idx(i - 1, j)] + p[this.idx(i + 1, j)] +
            p[this.idx(i, j - 1)] + p[this.idx(i, j + 1)]) / 4;
        }
      }
      this.setBound(0, p, N);
    }

    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        const idx = this.idx(i, j);
        u[idx] -= 0.5 * N * (p[this.idx(i + 1, j)] - p[this.idx(i - 1, j)]);
        v[idx] -= 0.5 * N * (p[this.idx(i, j + 1)] - p[this.idx(i, j - 1)]);
      }
    }
    this.setBound(1, u, N);
    this.setBound(2, v, N);
  }

  private setBound(b: number, x: Float64Array, N: number): void {
    for (let i = 1; i <= N; i++) {
      x[this.idx(0, i)] = b === 1 ? -x[this.idx(1, i)] : x[this.idx(1, i)];
      x[this.idx(N + 1, i)] = b === 1 ? -x[this.idx(N, i)] : x[this.idx(N, i)];
      x[this.idx(i, 0)] = b === 2 ? -x[this.idx(i, 1)] : x[this.idx(i, 1)];
      x[this.idx(i, N + 1)] = b === 2 ? -x[this.idx(i, N)] : x[this.idx(i, N)];
    }
    x[this.idx(0, 0)] = 0.5 * (x[this.idx(1, 0)] + x[this.idx(0, 1)]);
    x[this.idx(0, N + 1)] = 0.5 * (x[this.idx(1, N + 1)] + x[this.idx(0, N)]);
    x[this.idx(N + 1, 0)] = 0.5 * (x[this.idx(N, 0)] + x[this.idx(N + 1, 1)]);
    x[this.idx(N + 1, N + 1)] = 0.5 * (x[this.idx(N, N + 1)] + x[this.idx(N + 1, N)]);
  }
}
