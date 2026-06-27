export type NoiseFn = (x: number, y: number) => number;

function hashNoise(x: number, y: number, seed: number): number {
  let h = seed + Math.floor(x) * 374761393 + Math.floor(y) * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return (h & 0x7fffffff) / 0x7fffffff;
}

function smoothNoise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = hashNoise(x0, y0, seed);
  const n10 = hashNoise(x0 + 1, y0, seed);
  const n01 = hashNoise(x0, y0 + 1, seed);
  const n11 = hashNoise(x0 + 1, y0 + 1, seed);

  return n00 * (1 - sx) * (1 - sy) + n10 * sx * (1 - sy) +
    n01 * (1 - sx) * sy + n11 * sx * sy;
}

export function valueNoise(seed = 0): NoiseFn {
  return (x, y) => smoothNoise(x, y, seed) * 2 - 1;
}

export function fbm(base: NoiseFn, octaves = 4, lacunarity = 2, gain = 0.5): NoiseFn {
  return (x, y) => {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
      value += base(x * frequency, y * frequency) * amplitude;
      maxAmp += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return value / maxAmp;
  };
}

export function ridged(base: NoiseFn, octaves = 4, lacunarity = 2, gain = 0.5): NoiseFn {
  return (x, y) => {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
      const n = 1 - Math.abs(base(x * frequency, y * frequency));
      value += n * n * amplitude;
      maxAmp += amplitude;
      amplitude *= gain;
      frequency *= lacunarity;
    }
    return value / maxAmp;
  };
}

export function turbulence(base: NoiseFn, octaves = 4): NoiseFn {
  return (x, y) => {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
      value += Math.abs(base(x * frequency, y * frequency)) * amplitude;
      maxAmp += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / maxAmp;
  };
}

export function warp(base: NoiseFn, warpFn: NoiseFn, amount = 1): NoiseFn {
  return (x, y) => {
    const dx = warpFn(x, y) * amount;
    const dy = warpFn(x + 5.2, y + 1.3) * amount;
    return base(x + dx, y + dy);
  };
}

export function blend(a: NoiseFn, b: NoiseFn, t: number): NoiseFn {
  return (x, y) => a(x, y) * (1 - t) + b(x, y) * t;
}

export function remap(fn: NoiseFn, inMin: number, inMax: number, outMin: number, outMax: number): NoiseFn {
  return (x, y) => {
    const v = fn(x, y);
    const t = (v - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
  };
}

export function clampNoise(fn: NoiseFn, min: number, max: number): NoiseFn {
  return (x, y) => Math.min(max, Math.max(min, fn(x, y)));
}

export function threshold(fn: NoiseFn, t: number): NoiseFn {
  return (x, y) => fn(x, y) > t ? 1 : 0;
}
