export interface WaveState {
  width: number;
  current: Float64Array;
  previous: Float64Array;
  damping: number;
  speed: number;
}

export function createWave(width: number, damping = 0.99, speed = 1): WaveState {
  return {
    width,
    current: new Float64Array(width),
    previous: new Float64Array(width),
    damping,
    speed,
  };
}

export function disturb(state: WaveState, position: number, amplitude: number): void {
  if (position >= 0 && position < state.width) {
    state.current[position] += amplitude;
  }
}

export function gaussianPulse(state: WaveState, center: number, amplitude: number, sigma: number): void {
  for (let i = 0; i < state.width; i++) {
    state.current[i] += amplitude * Math.exp(-((i - center) ** 2) / (2 * sigma * sigma));
  }
}

export function step(state: WaveState): void {
  const next = new Float64Array(state.width);
  const c2 = state.speed * state.speed;

  for (let i = 1; i < state.width - 1; i++) {
    next[i] = 2 * state.current[i] - state.previous[i] +
      c2 * (state.current[i + 1] - 2 * state.current[i] + state.current[i - 1]);
    next[i] *= state.damping;
  }

  state.previous = state.current;
  state.current = next;
}

export function stepN(state: WaveState, n: number): void {
  for (let i = 0; i < n; i++) step(state);
}

export function getAmplitude(state: WaveState, position: number): number {
  if (position < 0 || position >= state.width) return 0;
  return state.current[position];
}

export function getEnergy(state: WaveState): number {
  let energy = 0;
  for (let i = 0; i < state.width; i++) {
    energy += state.current[i] ** 2;
  }
  return energy;
}

export function getMaxAmplitude(state: WaveState): number {
  let max = 0;
  for (let i = 0; i < state.width; i++) {
    const abs = Math.abs(state.current[i]);
    if (abs > max) max = abs;
  }
  return max;
}

export function toAscii(state: WaveState, height = 10): string {
  const max = getMaxAmplitude(state) || 1;
  const lines: string[] = [];

  for (let y = height - 1; y >= 0; y--) {
    let line = "";
    const threshold = ((y / (height - 1)) * 2 - 1) * max;
    for (let x = 0; x < state.width; x++) {
      line += state.current[x] >= threshold ? "#" : ".";
    }
    lines.push(line);
  }

  return lines.join("\n");
}

export function standingWave(state: WaveState, mode: number, amplitude: number): void {
  for (let i = 0; i < state.width; i++) {
    state.current[i] = amplitude * Math.sin((mode * Math.PI * i) / (state.width - 1));
  }
}

export function superpose(a: WaveState, b: WaveState): WaveState {
  const width = Math.min(a.width, b.width);
  const result = createWave(width, a.damping, a.speed);
  for (let i = 0; i < width; i++) {
    result.current[i] = a.current[i] + b.current[i];
  }
  return result;
}
