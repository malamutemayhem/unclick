export class Convolution {
  static convolve(signal: number[], kernel: number[]): number[] {
    const n = signal.length;
    const m = kernel.length;
    const result = new Array(n + m - 1).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        result[i + j] += signal[i] * kernel[j];
      }
    }
    return result.map(v => Math.round(v * 10000) / 10000);
  }

  static correlate(signal: number[], pattern: number[]): number[] {
    const reversed = [...pattern].reverse();
    return Convolution.convolve(signal, reversed);
  }

  static movingAverage(signal: number[], windowSize: number): number[] {
    const kernel = new Array(windowSize).fill(1 / windowSize);
    const full = Convolution.convolve(signal, kernel);
    const offset = Math.floor(windowSize / 2);
    return full.slice(offset, offset + signal.length);
  }

  static gaussianKernel(size: number, sigma?: number): number[] {
    const s = sigma ?? size / 6;
    const center = Math.floor(size / 2);
    const kernel: number[] = [];
    let sum = 0;
    for (let i = 0; i < size; i++) {
      const x = i - center;
      const val = Math.exp(-(x * x) / (2 * s * s));
      kernel.push(val);
      sum += val;
    }
    return kernel.map(v => Math.round((v / sum) * 10000) / 10000);
  }

  static smooth(signal: number[], sigma = 1): number[] {
    const size = Math.max(3, Math.ceil(sigma * 6) | 1);
    const kernel = Convolution.gaussianKernel(size, sigma);
    const full = Convolution.convolve(signal, kernel);
    const offset = Math.floor(size / 2);
    return full.slice(offset, offset + signal.length);
  }

  static edgeDetect(signal: number[]): number[] {
    const kernel = [-1, 0, 1];
    const full = Convolution.convolve(signal, kernel);
    return full.slice(1, 1 + signal.length);
  }

  static sharpen(signal: number[], amount = 1): number[] {
    const kernel = [-amount, 1 + 2 * amount, -amount];
    const full = Convolution.convolve(signal, kernel);
    return full.slice(1, 1 + signal.length);
  }

  static deconvolve(output: number[], kernel: number[]): number[] {
    const n = output.length - kernel.length + 1;
    if (n <= 0) return [];
    const result = new Array(n).fill(0);
    const work = [...output];
    for (let i = 0; i < n; i++) {
      if (kernel[0] === 0) {
        result[i] = 0;
        continue;
      }
      result[i] = Math.round((work[i] / kernel[0]) * 10000) / 10000;
      for (let j = 0; j < kernel.length; j++) {
        work[i + j] -= result[i] * kernel[j];
      }
    }
    return result;
  }
}
