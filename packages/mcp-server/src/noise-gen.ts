export class PerlinNoise {
  private perm: number[];
  private grad: Array<[number, number]>;

  constructor(seed = 42) {
    this.perm = this.buildPermutation(seed);
    this.grad = [
      [1, 1], [-1, 1], [1, -1], [-1, -1],
      [1, 0], [-1, 0], [0, 1], [0, -1],
    ];
  }

  noise2d(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = this.fade(xf);
    const v = this.fade(yf);

    const aa = this.perm[(this.perm[xi] + yi) & 255];
    const ab = this.perm[(this.perm[xi] + yi + 1) & 255];
    const ba = this.perm[(this.perm[(xi + 1) & 255] + yi) & 255];
    const bb = this.perm[(this.perm[(xi + 1) & 255] + yi + 1) & 255];

    const x1 = this.lerp(this.dotGrad(aa, xf, yf), this.dotGrad(ba, xf - 1, yf), u);
    const x2 = this.lerp(this.dotGrad(ab, xf, yf - 1), this.dotGrad(bb, xf - 1, yf - 1), u);

    return this.lerp(x1, x2, v);
  }

  fbm(x: number, y: number, octaves = 4, lacunarity = 2, persistence = 0.5): number {
    let total = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.noise2d(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }

  turbulence(x: number, y: number, octaves = 4): number {
    let total = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += Math.abs(this.noise2d(x * frequency, y * frequency)) * amplitude;
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return total / maxValue;
  }

  ridge(x: number, y: number, octaves = 4, offset = 1): number {
    let total = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      const n = offset - Math.abs(this.noise2d(x * frequency, y * frequency));
      total += n * n * amplitude;
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return total / maxValue;
  }

  generateGrid(width: number, height: number, scale = 0.05): number[][] {
    const grid: number[][] = [];
    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width; x++) {
        row.push(this.noise2d(x * scale, y * scale));
      }
      grid.push(row);
    }
    return grid;
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private dotGrad(hash: number, x: number, y: number): number {
    const g = this.grad[hash & 7];
    return g[0] * x + g[1] * y;
  }

  private buildPermutation(seed: number): number[] {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let s = seed;
    const rng = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    return [...p, ...p];
  }
}

export class ValueNoise {
  private values: number[];

  constructor(seed = 42) {
    let s = seed;
    const rng = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    this.values = Array.from({ length: 512 }, () => rng() * 2 - 1);
  }

  noise2d(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const sx = xf * xf * (3 - 2 * xf);
    const sy = yf * yf * (3 - 2 * yf);

    const n00 = this.values[xi + yi];
    const n10 = this.values[(xi + 1) & 255 + yi];
    const n01 = this.values[xi + ((yi + 1) & 255)];
    const n11 = this.values[((xi + 1) & 255) + ((yi + 1) & 255)];

    const ix0 = n00 + sx * (n10 - n00);
    const ix1 = n01 + sx * (n11 - n01);

    return ix0 + sy * (ix1 - ix0);
  }
}
