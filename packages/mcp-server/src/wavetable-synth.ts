export type WaveShape = "sine" | "square" | "triangle" | "sawtooth" | "custom";

export class Wavetable {
  readonly samples: Float64Array;
  readonly size: number;

  constructor(size = 2048) {
    this.size = size;
    this.samples = new Float64Array(size);
  }

  static sine(size = 2048): Wavetable {
    const wt = new Wavetable(size);
    for (let i = 0; i < size; i++) {
      wt.samples[i] = Math.sin((2 * Math.PI * i) / size);
    }
    return wt;
  }

  static square(size = 2048): Wavetable {
    const wt = new Wavetable(size);
    for (let i = 0; i < size; i++) {
      wt.samples[i] = i < size / 2 ? 1 : -1;
    }
    return wt;
  }

  static triangle(size = 2048): Wavetable {
    const wt = new Wavetable(size);
    for (let i = 0; i < size; i++) {
      const phase = i / size;
      wt.samples[i] = phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase;
    }
    return wt;
  }

  static sawtooth(size = 2048): Wavetable {
    const wt = new Wavetable(size);
    for (let i = 0; i < size; i++) {
      wt.samples[i] = 2 * (i / size) - 1;
    }
    return wt;
  }

  static fromHarmonics(harmonics: number[], size = 2048): Wavetable {
    const wt = new Wavetable(size);
    for (let i = 0; i < size; i++) {
      let sum = 0;
      for (let h = 0; h < harmonics.length; h++) {
        sum += harmonics[h] * Math.sin((2 * Math.PI * (h + 1) * i) / size);
      }
      wt.samples[i] = sum;
    }
    return wt;
  }

  sample(phase: number): number {
    const p = ((phase % 1) + 1) % 1;
    const pos = p * this.size;
    const i0 = Math.floor(pos) % this.size;
    const i1 = (i0 + 1) % this.size;
    const frac = pos - Math.floor(pos);
    return this.samples[i0] * (1 - frac) + this.samples[i1] * frac;
  }

  normalize(): void {
    let max = 0;
    for (let i = 0; i < this.size; i++) {
      const abs = Math.abs(this.samples[i]);
      if (abs > max) max = abs;
    }
    if (max > 0) {
      for (let i = 0; i < this.size; i++) {
        this.samples[i] /= max;
      }
    }
  }
}

export class WavetableOscillator {
  private wavetable: Wavetable;
  private phase = 0;
  private frequency: number;
  private sampleRate: number;
  private amplitude = 1;

  constructor(wavetable: Wavetable, frequency = 440, sampleRate = 44100) {
    this.wavetable = wavetable;
    this.frequency = frequency;
    this.sampleRate = sampleRate;
  }

  setFrequency(freq: number): void {
    this.frequency = freq;
  }

  setAmplitude(amp: number): void {
    this.amplitude = amp;
  }

  tick(): number {
    const value = this.wavetable.sample(this.phase) * this.amplitude;
    this.phase += this.frequency / this.sampleRate;
    if (this.phase >= 1) this.phase -= Math.floor(this.phase);
    return value;
  }

  generate(numSamples: number): Float64Array {
    const output = new Float64Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
      output[i] = this.tick();
    }
    return output;
  }

  reset(): void {
    this.phase = 0;
  }

  getPhase(): number {
    return this.phase;
  }
}

export function mixWavetables(a: Wavetable, b: Wavetable, mix: number): Wavetable {
  const size = Math.max(a.size, b.size);
  const result = new Wavetable(size);
  for (let i = 0; i < size; i++) {
    const pa = i / size;
    result.samples[i] = a.sample(pa) * (1 - mix) + b.sample(pa) * mix;
  }
  return result;
}
