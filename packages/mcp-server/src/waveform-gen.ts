export type WaveType = "sine" | "square" | "sawtooth" | "triangle" | "noise";

export class WaveformGenerator {
  static generate(type: WaveType, frequency: number, sampleRate: number, duration: number, amplitude = 1): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result = new Array<number>(samples);

    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      result[i] = amplitude * WaveformGenerator.sample(type, frequency, t);
    }

    return result;
  }

  static sample(type: WaveType, frequency: number, t: number): number {
    const phase = frequency * t;
    switch (type) {
      case "sine":
        return Math.sin(2 * Math.PI * phase);
      case "square":
        return Math.sin(2 * Math.PI * phase) >= 0 ? 1 : -1;
      case "sawtooth":
        return 2 * (phase - Math.floor(phase + 0.5));
      case "triangle": {
        const p = phase - Math.floor(phase);
        return 4 * Math.abs(p - 0.5) - 1;
      }
      case "noise":
        return Math.random() * 2 - 1;
    }
  }

  static mix(signals: number[][], weights?: number[]): number[] {
    const maxLen = Math.max(...signals.map((s) => s.length));
    const result = new Array<number>(maxLen).fill(0);
    const w = weights || signals.map(() => 1 / signals.length);

    for (let i = 0; i < maxLen; i++) {
      for (let s = 0; s < signals.length; s++) {
        if (i < signals[s].length) {
          result[i] += signals[s][i] * w[s];
        }
      }
    }
    return result;
  }

  static applyGain(signal: number[], gain: number): number[] {
    return signal.map((s) => s * gain);
  }

  static normalize(signal: number[]): number[] {
    const max = Math.max(...signal.map(Math.abs));
    if (max === 0) return [...signal];
    return signal.map((s) => s / max);
  }

  static rms(signal: number[]): number {
    if (signal.length === 0) return 0;
    const sum = signal.reduce((s, v) => s + v * v, 0);
    return Math.sqrt(sum / signal.length);
  }

  static peak(signal: number[]): number {
    if (signal.length === 0) return 0;
    return Math.max(...signal.map(Math.abs));
  }

  static zeroCrossings(signal: number[]): number {
    let count = 0;
    for (let i = 1; i < signal.length; i++) {
      if ((signal[i - 1] >= 0 && signal[i] < 0) || (signal[i - 1] < 0 && signal[i] >= 0)) {
        count++;
      }
    }
    return count;
  }

  static fadeIn(signal: number[], samples: number): number[] {
    const result = [...signal];
    for (let i = 0; i < Math.min(samples, result.length); i++) {
      result[i] *= i / samples;
    }
    return result;
  }

  static fadeOut(signal: number[], samples: number): number[] {
    const result = [...signal];
    const start = result.length - samples;
    for (let i = Math.max(start, 0); i < result.length; i++) {
      result[i] *= (result.length - i) / samples;
    }
    return result;
  }
}
