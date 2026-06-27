export class FluidSim {
  private width: number;
  private height: number;
  private density: Float64Array;
  private velocityX: Float64Array;
  private velocityY: Float64Array;
  private prevDensity: Float64Array;
  private prevVelX: Float64Array;
  private prevVelY: Float64Array;
  private diffusion: number;
  private viscosity: number;
  private dt: number;
  private stepCount = 0;

  constructor(width = 32, height = 32, diffusion = 0.0001, viscosity = 0.0001, dt = 0.1) {
    this.width = width;
    this.height = height;
    this.diffusion = diffusion;
    this.viscosity = viscosity;
    this.dt = dt;

    const size = width * height;
    this.density = new Float64Array(size);
    this.velocityX = new Float64Array(size);
    this.velocityY = new Float64Array(size);
    this.prevDensity = new Float64Array(size);
    this.prevVelX = new Float64Array(size);
    this.prevVelY = new Float64Array(size);
  }

  addDensity(x: number, y: number, amount: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.density[y * this.width + x] += amount;
    }
  }

  addVelocity(x: number, y: number, vx: number, vy: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      const idx = y * this.width + x;
      this.velocityX[idx] += vx;
      this.velocityY[idx] += vy;
    }
  }

  step(): void {
    this.diffuse(this.prevVelX, this.velocityX, this.viscosity);
    this.diffuse(this.prevVelY, this.velocityY, this.viscosity);
    this.project(this.prevVelX, this.prevVelY);
    this.advect(this.velocityX, this.prevVelX, this.prevVelX, this.prevVelY);
    this.advect(this.velocityY, this.prevVelY, this.prevVelX, this.prevVelY);
    this.project(this.velocityX, this.velocityY);
    this.diffuse(this.prevDensity, this.density, this.diffusion);
    this.advect(this.density, this.prevDensity, this.velocityX, this.velocityY);
    this.stepCount++;
  }

  private diffuse(dst: Float64Array, src: Float64Array, diff: number): void {
    const a = this.dt * diff * this.width * this.height;
    for (let k = 0; k < 4; k++) {
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          const i = y * this.width + x;
          dst[i] = (src[i] + a * (dst[i - 1] + dst[i + 1] + dst[i - this.width] + dst[i + this.width])) / (1 + 4 * a);
        }
      }
    }
  }

  private advect(dst: Float64Array, src: Float64Array, velX: Float64Array, velY: Float64Array): void {
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const i = y * this.width + x;
        let px = x - this.dt * velX[i] * this.width;
        let py = y - this.dt * velY[i] * this.height;
        px = Math.max(0.5, Math.min(this.width - 1.5, px));
        py = Math.max(0.5, Math.min(this.height - 1.5, py));

        const i0 = Math.floor(px);
        const j0 = Math.floor(py);
        const s1 = px - i0;
        const s0 = 1 - s1;
        const t1 = py - j0;
        const t0 = 1 - t1;

        dst[i] =
          s0 * (t0 * src[j0 * this.width + i0] + t1 * src[(j0 + 1) * this.width + i0]) +
          s1 * (t0 * src[j0 * this.width + i0 + 1] + t1 * src[(j0 + 1) * this.width + i0 + 1]);
      }
    }
  }

  private project(velX: Float64Array, velY: Float64Array): void {
    const div = new Float64Array(this.width * this.height);
    const p = new Float64Array(this.width * this.height);

    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const i = y * this.width + x;
        div[i] = -0.5 * (velX[i + 1] - velX[i - 1] + velY[i + this.width] - velY[i - this.width]) / this.width;
      }
    }

    for (let k = 0; k < 4; k++) {
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          const i = y * this.width + x;
          p[i] = (div[i] + p[i - 1] + p[i + 1] + p[i - this.width] + p[i + this.width]) / 4;
        }
      }
    }

    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const i = y * this.width + x;
        velX[i] -= 0.5 * this.width * (p[i + 1] - p[i - 1]);
        velY[i] -= 0.5 * this.height * (p[i + this.width] - p[i - this.width]);
      }
    }
  }

  getDensity(x: number, y: number): number {
    return this.density[y * this.width + x];
  }

  getVelocity(x: number, y: number): { vx: number; vy: number } {
    const idx = y * this.width + x;
    return { vx: this.velocityX[idx], vy: this.velocityY[idx] };
  }

  getDensityGrid(): Float64Array {
    return new Float64Array(this.density);
  }

  get steps(): number {
    return this.stepCount;
  }

  get gridWidth(): number {
    return this.width;
  }

  get gridHeight(): number {
    return this.height;
  }

  totalDensity(): number {
    let sum = 0;
    for (let i = 0; i < this.density.length; i++) sum += this.density[i];
    return sum;
  }

  reset(): void {
    this.density.fill(0);
    this.velocityX.fill(0);
    this.velocityY.fill(0);
    this.prevDensity.fill(0);
    this.prevVelX.fill(0);
    this.prevVelY.fill(0);
    this.stepCount = 0;
  }
}
