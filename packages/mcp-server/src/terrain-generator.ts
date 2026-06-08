export interface TerrainConfig {
  width: number;
  height: number;
  seed?: number;
  octaves?: number;
  persistence?: number;
  scale?: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (a - b) * t;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function hash(x: number, y: number, seed: number): number {
  let h = seed + x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return (h & 0x7fffffff) / 0x7fffffff;
}

function noise2D(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const u = fade(fx);
  const v = fade(fy);

  const n00 = hash(x0, y0, seed) * 2 - 1;
  const n10 = hash(x0 + 1, y0, seed) * 2 - 1;
  const n01 = hash(x0, y0 + 1, seed) * 2 - 1;
  const n11 = hash(x0 + 1, y0 + 1, seed) * 2 - 1;

  const nx0 = n00 + u * (n10 - n00);
  const nx1 = n01 + u * (n11 - n01);
  return nx0 + v * (nx1 - nx0);
}

export function generateHeightmap(config: TerrainConfig): number[][] {
  const {
    width, height,
    seed = 42,
    octaves = 4,
    persistence = 0.5,
    scale = 50,
  } = config;

  const map: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;

      for (let o = 0; o < octaves; o++) {
        value += noise2D(x * frequency / scale, y * frequency / scale, seed + o * 1000) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }

      row.push((value / maxValue + 1) / 2);
    }
    map.push(row);
  }

  return map;
}

export type BiomeType = "water" | "beach" | "grass" | "forest" | "mountain" | "snow";

export function classifyBiome(height: number, moisture?: number): BiomeType {
  if (height < 0.3) return "water";
  if (height < 0.35) return "beach";
  if (height < 0.6) return moisture !== undefined && moisture > 0.6 ? "forest" : "grass";
  if (height < 0.8) return "mountain";
  return "snow";
}

export function applyErosion(heightmap: number[][], iterations = 1, strength = 0.1): number[][] {
  const h = heightmap.length;
  const w = heightmap[0].length;
  const result = heightmap.map((row) => [...row]);

  for (let iter = 0; iter < iterations; iter++) {
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const avg = (
          result[y - 1][x] + result[y + 1][x] +
          result[y][x - 1] + result[y][x + 1]
        ) / 4;
        result[y][x] += (avg - result[y][x]) * strength;
      }
    }
  }

  return result;
}

export function normalizeHeightmap(heightmap: number[][]): number[][] {
  let min = Infinity;
  let max = -Infinity;
  for (const row of heightmap) {
    for (const v of row) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  const range = max - min || 1;
  return heightmap.map((row) => row.map((v) => (v - min) / range));
}
