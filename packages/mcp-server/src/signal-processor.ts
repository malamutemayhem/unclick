export class SignalProcessor {
  static movingAverage(data: number[], windowSize: number): number[] {
    if (windowSize <= 0 || data.length === 0) return [];
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - windowSize + 1);
      let sum = 0;
      for (let j = start; j <= i; j++) sum += data[j];
      result.push(sum / (i - start + 1));
    }
    return result;
  }

  static exponentialMovingAverage(data: number[], alpha: number): number[] {
    if (data.length === 0) return [];
    const result: number[] = [data[0]];
    for (let i = 1; i < data.length; i++) {
      result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
    }
    return result;
  }

  static lowPassFilter(data: number[], cutoff: number): number[] {
    const alpha = cutoff / (cutoff + 1);
    return SignalProcessor.exponentialMovingAverage(data, alpha);
  }

  static highPassFilter(data: number[], cutoff: number): number[] {
    const low = SignalProcessor.lowPassFilter(data, cutoff);
    return data.map((v, i) => v - low[i]);
  }

  static normalize(data: number[]): number[] {
    if (data.length === 0) return [];
    let min = data[0];
    let max = data[0];
    for (const v of data) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
    if (min === max) return data.map(() => 0.5);
    return data.map((v) => (v - min) / (max - min));
  }

  static peakDetection(data: number[], threshold: number): number[] {
    const peaks: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] > data[i - 1] && data[i] > data[i + 1] && data[i] >= threshold) {
        peaks.push(i);
      }
    }
    return peaks;
  }

  static zeroCrossings(data: number[]): number[] {
    const crossings: number[] = [];
    for (let i = 1; i < data.length; i++) {
      if ((data[i - 1] >= 0 && data[i] < 0) || (data[i - 1] < 0 && data[i] >= 0)) {
        crossings.push(i);
      }
    }
    return crossings;
  }

  static convolve(signal: number[], kernel: number[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < signal.length + kernel.length - 1; i++) {
      let sum = 0;
      for (let j = 0; j < kernel.length; j++) {
        const si = i - j;
        if (si >= 0 && si < signal.length) {
          sum += signal[si] * kernel[j];
        }
      }
      result.push(sum);
    }
    return result;
  }

  static crossCorrelation(a: number[], b: number[]): number[] {
    const result: number[] = [];
    for (let lag = -(b.length - 1); lag < a.length; lag++) {
      let sum = 0;
      for (let i = 0; i < b.length; i++) {
        const ai = lag + i;
        if (ai >= 0 && ai < a.length) {
          sum += a[ai] * b[i];
        }
      }
      result.push(sum);
    }
    return result;
  }

  static rms(data: number[]): number {
    if (data.length === 0) return 0;
    const sumSq = data.reduce((s, v) => s + v * v, 0);
    return Math.sqrt(sumSq / data.length);
  }

  static energy(data: number[]): number {
    return data.reduce((s, v) => s + v * v, 0);
  }

  static autocorrelation(data: number[], maxLag: number): number[] {
    const result: number[] = [];
    for (let lag = 0; lag <= Math.min(maxLag, data.length - 1); lag++) {
      let sum = 0;
      for (let i = 0; i < data.length - lag; i++) {
        sum += data[i] * data[i + lag];
      }
      result.push(sum);
    }
    return result;
  }

  static downsample(data: number[], factor: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < data.length; i += factor) {
      result.push(data[i]);
    }
    return result;
  }

  static upsample(data: number[], factor: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
      for (let j = 1; j < factor && i < data.length - 1; j++) {
        const t = j / factor;
        result.push(data[i] * (1 - t) + data[i + 1] * t);
      }
    }
    return result;
  }
}
