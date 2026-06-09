export interface RDConfig {
  width: number;
  height: number;
  feedRate: number;
  killRate: number;
  diffusionA: number;
  diffusionB: number;
  dt: number;
}

export class ReactionDiffusion {
  private config: RDConfig;
  private a: Float64Array;
  private b: Float64Array;
  private stepCount = 0;

  constructor(config: Partial<RDConfig> = {}) {
    this.config = {
      width: config.width ?? 64,
      height: config.height ?? 64,
      feedRate: config.feedRate ?? 0.055,
      killRate: config.killRate ?? 0.062,
      diffusionA: config.diffusionA ?? 1.0,
      diffusionB: config.diffusionB ?? 0.5,
      dt: config.dt ?? 1.0,
    };

    const size = this.config.width * this.config.height;
    this.a = new Float64Array(size).fill(1.0);
    this.b = new Float64Array(size).fill(0.0);
  }

  seed(cx: number, cy: number, radius: number): void {
    const { width, height } = this.config;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy < radius * radius) {
          this.b[y * width + x] = 1.0;
        }
      }
    }
  }

  step(): void {
    const { width, height, feedRate, killRate, diffusionA, diffusionB, dt } = this.config;
    const size = width * height;
    const newA = new Float64Array(size);
    const newB = new Float64Array(size);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const aVal = this.a[i];
        const bVal = this.b[i];
        const lapA = this.laplacian(this.a, x, y);
        const lapB = this.laplacian(this.b, x, y);
        const reaction = aVal * bVal * bVal;

        newA[i] = aVal + (diffusionA * lapA - reaction + feedRate * (1 - aVal)) * dt;
        newB[i] = bVal + (diffusionB * lapB + reaction - (killRate + feedRate) * bVal) * dt;

        newA[i] = Math.max(0, Math.min(1, newA[i]));
        newB[i] = Math.max(0, Math.min(1, newB[i]));
      }
    }

    this.a = newA;
    this.b = newB;
    this.stepCount++;
  }

  private laplacian(grid: Float64Array, x: number, y: number): number {
    const { width, height } = this.config;
    const i = y * width + x;
    const up = ((y - 1 + height) % height) * width + x;
    const down = ((y + 1) % height) * width + x;
    const left = y * width + ((x - 1 + width) % width);
    const right = y * width + ((x + 1) % width);

    return grid[up] + grid[down] + grid[left] + grid[right] - 4 * grid[i];
  }

  run(steps: number): void {
    for (let i = 0; i < steps; i++) this.step();
  }

  getA(x: number, y: number): number {
    return this.a[y * this.config.width + x];
  }

  getB(x: number, y: number): number {
    return this.b[y * this.config.width + x];
  }

  getGridA(): Float64Array {
    return new Float64Array(this.a);
  }

  getGridB(): Float64Array {
    return new Float64Array(this.b);
  }

  get width(): number {
    return this.config.width;
  }

  get height(): number {
    return this.config.height;
  }

  get steps(): number {
    return this.stepCount;
  }

  stats(): { avgA: number; avgB: number; maxB: number } {
    let sumA = 0;
    let sumB = 0;
    let maxB = 0;
    for (let i = 0; i < this.a.length; i++) {
      sumA += this.a[i];
      sumB += this.b[i];
      if (this.b[i] > maxB) maxB = this.b[i];
    }
    const n = this.a.length;
    return { avgA: sumA / n, avgB: sumB / n, maxB };
  }

  reset(): void {
    this.a.fill(1.0);
    this.b.fill(0.0);
    this.stepCount = 0;
  }
}
