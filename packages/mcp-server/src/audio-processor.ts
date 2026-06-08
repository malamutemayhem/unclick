export class AudioProcessor {
  static normalize(signal: number[]): number[] {
    const maxAbs = Math.max(...signal.map(Math.abs));
    if (maxAbs === 0) return signal;
    return signal.map(v => Math.round((v / maxAbs) * 10000) / 10000);
  }

  static rms(signal: number[]): number {
    const sum = signal.reduce((s, v) => s + v * v, 0);
    return Math.round(Math.sqrt(sum / signal.length) * 10000) / 10000;
  }

  static dbFromAmplitude(amplitude: number): number {
    if (amplitude <= 0) return -Infinity;
    return Math.round(20 * Math.log10(amplitude) * 10000) / 10000;
  }

  static amplitudeFromDb(db: number): number {
    return Math.round(Math.pow(10, db / 20) * 10000) / 10000;
  }

  static zeroCrossingRate(signal: number[]): number {
    let crossings = 0;
    for (let i = 1; i < signal.length; i++) {
      if ((signal[i] >= 0 && signal[i - 1] < 0) || (signal[i] < 0 && signal[i - 1] >= 0)) {
        crossings++;
      }
    }
    return Math.round((crossings / (signal.length - 1)) * 10000) / 10000;
  }

  static energy(signal: number[]): number {
    return Math.round(signal.reduce((s, v) => s + v * v, 0) * 10000) / 10000;
  }

  static envelope(signal: number[], windowSize: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < signal.length; i++) {
      const start = Math.max(0, i - Math.floor(windowSize / 2));
      const end = Math.min(signal.length, i + Math.ceil(windowSize / 2));
      let max = 0;
      for (let j = start; j < end; j++) {
        max = Math.max(max, Math.abs(signal[j]));
      }
      result.push(Math.round(max * 10000) / 10000);
    }
    return result;
  }

  static fadeIn(signal: number[], samples: number): number[] {
    return signal.map((v, i) => {
      if (i >= samples) return v;
      return Math.round(v * (i / samples) * 10000) / 10000;
    });
  }

  static fadeOut(signal: number[], samples: number): number[] {
    const start = signal.length - samples;
    return signal.map((v, i) => {
      if (i < start) return v;
      return Math.round(v * ((signal.length - 1 - i) / samples) * 10000) / 10000;
    });
  }

  static mix(signals: number[][], weights?: number[]): number[] {
    const len = Math.max(...signals.map(s => s.length));
    const w = weights || signals.map(() => 1 / signals.length);
    const result = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
      for (let s = 0; s < signals.length; s++) {
        result[i] += (signals[s][i] || 0) * w[s];
      }
      result[i] = Math.round(result[i] * 10000) / 10000;
    }
    return result;
  }

  static clip(signal: number[], threshold = 1): number[] {
    return signal.map(v => Math.max(-threshold, Math.min(threshold, v)));
  }

  static autocorrelation(signal: number[]): number[] {
    const n = signal.length;
    const result: number[] = [];
    for (let lag = 0; lag < n; lag++) {
      let sum = 0;
      for (let i = 0; i < n - lag; i++) {
        sum += signal[i] * signal[i + lag];
      }
      result.push(Math.round((sum / n) * 10000) / 10000);
    }
    return result;
  }
}
