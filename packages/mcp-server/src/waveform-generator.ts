export class WaveformGenerator {
  static sine(frequency: number, sampleRate: number, duration: number): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      result.push(Math.sin(2 * Math.PI * frequency * i / sampleRate));
    }
    return result;
  }

  static square(frequency: number, sampleRate: number, duration: number): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      const t = (frequency * i / sampleRate) % 1;
      result.push(t < 0.5 ? 1 : -1);
    }
    return result;
  }

  static sawtooth(frequency: number, sampleRate: number, duration: number): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      const t = (frequency * i / sampleRate) % 1;
      result.push(2 * t - 1);
    }
    return result;
  }

  static triangle(frequency: number, sampleRate: number, duration: number): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      const t = (frequency * i / sampleRate) % 1;
      result.push(t < 0.5 ? 4 * t - 1 : 3 - 4 * t);
    }
    return result;
  }

  static noise(sampleRate: number, duration: number): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      result.push(Math.random() * 2 - 1);
    }
    return result;
  }

  static pulse(frequency: number, sampleRate: number, duration: number, dutyCycle = 0.5): number[] {
    const samples = Math.floor(sampleRate * duration);
    const result: number[] = [];
    for (let i = 0; i < samples; i++) {
      const t = (frequency * i / sampleRate) % 1;
      result.push(t < dutyCycle ? 1 : -1);
    }
    return result;
  }

  static mix(signals: number[][], weights?: number[]): number[] {
    if (signals.length === 0) return [];
    const len = Math.max(...signals.map((s) => s.length));
    const w = weights ?? signals.map(() => 1 / signals.length);
    const result: number[] = [];
    for (let i = 0; i < len; i++) {
      let sum = 0;
      for (let s = 0; s < signals.length; s++) {
        sum += (signals[s][i] ?? 0) * (w[s] ?? 0);
      }
      result.push(sum);
    }
    return result;
  }

  static amplify(signal: number[], gain: number): number[] {
    return signal.map((s) => Math.max(-1, Math.min(1, s * gain)));
  }

  static fadeIn(signal: number[], duration: number, sampleRate: number): number[] {
    const fadeSamples = Math.floor(duration * sampleRate);
    return signal.map((s, i) => {
      if (i < fadeSamples) return s * (i / fadeSamples);
      return s;
    });
  }

  static fadeOut(signal: number[], duration: number, sampleRate: number): number[] {
    const fadeSamples = Math.floor(duration * sampleRate);
    const startFade = signal.length - fadeSamples;
    return signal.map((s, i) => {
      if (i >= startFade) return s * ((signal.length - i) / fadeSamples);
      return s;
    });
  }
}
