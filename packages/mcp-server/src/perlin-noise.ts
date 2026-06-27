function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerpN(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

export class PerlinNoise {
  private perm: number[];

  constructor(seed?: number) {
    const p = new Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;

    let s = seed ?? Math.floor(Math.random() * 2147483647);
    for (let i = 255; i > 0; i--) {
      s = ((s * 1103515245 + 12345) & 0x7fffffff) >>> 0;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }

  noise2D(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = fade(xf);
    const v = fade(yf);

    const aa = this.perm[this.perm[xi] + yi];
    const ab = this.perm[this.perm[xi] + yi + 1];
    const ba = this.perm[this.perm[xi + 1] + yi];
    const bb = this.perm[this.perm[xi + 1] + yi + 1];

    return lerpN(
      lerpN(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerpN(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    );
  }

  octave2D(x: number, y: number, octaves: number, persistence = 0.5): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.noise2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= 2;
    }

    return total / maxValue;
  }

  noiseGrid(width: number, height: number, scale: number): number[][] {
    const grid: number[][] = [];
    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width; x++) {
        row.push(this.noise2D(x / scale, y / scale));
      }
      grid.push(row);
    }
    return grid;
  }

  turbulence(x: number, y: number, octaves: number): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;

    for (let i = 0; i < octaves; i++) {
      total += Math.abs(this.noise2D(x * frequency, y * frequency)) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    return total;
  }
}
