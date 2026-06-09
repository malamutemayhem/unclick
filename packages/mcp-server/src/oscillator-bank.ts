export interface OscillatorConfig {
  frequency: number;
  amplitude: number;
  phase: number;
  waveform: "sine" | "square" | "triangle" | "sawtooth";
}

export class Oscillator {
  frequency: number;
  amplitude: number;
  private phase: number;
  private waveform: OscillatorConfig["waveform"];
  private sampleRate: number;

  constructor(config: Partial<OscillatorConfig> = {}, sampleRate = 44100) {
    this.frequency = config.frequency ?? 440;
    this.amplitude = config.amplitude ?? 1;
    this.phase = config.phase ?? 0;
    this.waveform = config.waveform ?? "sine";
    this.sampleRate = sampleRate;
  }

  tick(): number {
    const value = this.sampleWave(this.phase) * this.amplitude;
    this.phase += this.frequency / this.sampleRate;
    if (this.phase >= 1) this.phase -= Math.floor(this.phase);
    return value;
  }

  private sampleWave(phase: number): number {
    const p = ((phase % 1) + 1) % 1;
    switch (this.waveform) {
      case "sine": return Math.sin(2 * Math.PI * p);
      case "square": return p < 0.5 ? 1 : -1;
      case "triangle": return p < 0.5 ? 4 * p - 1 : 3 - 4 * p;
      case "sawtooth": return 2 * p - 1;
    }
  }

  generate(samples: number): Float64Array {
    const out = new Float64Array(samples);
    for (let i = 0; i < samples; i++) out[i] = this.tick();
    return out;
  }

  reset(): void {
    this.phase = 0;
  }
}

export class OscillatorBank {
  private oscillators: Oscillator[] = [];
  private sampleRate: number;

  constructor(sampleRate = 44100) {
    this.sampleRate = sampleRate;
  }

  add(config: Partial<OscillatorConfig> = {}): number {
    const osc = new Oscillator(config, this.sampleRate);
    this.oscillators.push(osc);
    return this.oscillators.length - 1;
  }

  remove(index: number): void {
    this.oscillators.splice(index, 1);
  }

  get(index: number): Oscillator {
    return this.oscillators[index];
  }

  get count(): number {
    return this.oscillators.length;
  }

  tick(): number {
    let sum = 0;
    for (const osc of this.oscillators) {
      sum += osc.tick();
    }
    return this.oscillators.length > 0 ? sum / this.oscillators.length : 0;
  }

  tickRaw(): number {
    let sum = 0;
    for (const osc of this.oscillators) {
      sum += osc.tick();
    }
    return sum;
  }

  generate(samples: number): Float64Array {
    const out = new Float64Array(samples);
    for (let i = 0; i < samples; i++) out[i] = this.tick();
    return out;
  }

  reset(): void {
    for (const osc of this.oscillators) osc.reset();
  }

  setAllFrequencies(freq: number): void {
    for (const osc of this.oscillators) osc.frequency = freq;
  }

  setAllAmplitudes(amp: number): void {
    for (const osc of this.oscillators) osc.amplitude = amp;
  }

  detune(cents: number): void {
    for (const osc of this.oscillators) {
      osc.frequency *= Math.pow(2, cents / 1200);
    }
  }
}

export function createHarmonicSeries(fundamental: number, count: number, sampleRate = 44100): OscillatorBank {
  const bank = new OscillatorBank(sampleRate);
  for (let i = 1; i <= count; i++) {
    bank.add({ frequency: fundamental * i, amplitude: 1 / i, waveform: "sine" });
  }
  return bank;
}

export function createChord(frequencies: number[], sampleRate = 44100): OscillatorBank {
  const bank = new OscillatorBank(sampleRate);
  for (const freq of frequencies) {
    bank.add({ frequency: freq, amplitude: 1, waveform: "sine" });
  }
  return bank;
}

export function midiToFrequency(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export function frequencyToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}
