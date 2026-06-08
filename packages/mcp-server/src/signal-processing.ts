export function dft(signal: number[]): { real: number[]; imag: number[] } {
  const N = signal.length;
  const real = new Array(N).fill(0);
  const imag = new Array(N).fill(0);

  for (let k = 0; k < N; k++) {
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      real[k] += signal[n] * Math.cos(angle);
      imag[k] -= signal[n] * Math.sin(angle);
    }
  }

  return { real, imag };
}

export function idft(real: number[], imag: number[]): number[] {
  const N = real.length;
  const signal = new Array(N).fill(0);

  for (let n = 0; n < N; n++) {
    for (let k = 0; k < N; k++) {
      const angle = (2 * Math.PI * k * n) / N;
      signal[n] += real[k] * Math.cos(angle) - imag[k] * Math.sin(angle);
    }
    signal[n] /= N;
  }

  return signal;
}

export function magnitude(real: number[], imag: number[]): number[] {
  return real.map((r, i) => Math.sqrt(r * r + imag[i] * imag[i]));
}

export function phase(real: number[], imag: number[]): number[] {
  return real.map((r, i) => Math.atan2(imag[i], r));
}

export function convolve(signal: number[], kernel: number[]): number[] {
  const result = new Array(signal.length + kernel.length - 1).fill(0);
  for (let i = 0; i < signal.length; i++) {
    for (let j = 0; j < kernel.length; j++) {
      result[i + j] += signal[i] * kernel[j];
    }
  }
  return result;
}

export function crossCorrelate(a: number[], b: number[]): number[] {
  const reversed = [...b].reverse();
  return convolve(a, reversed);
}

export function movingAverage(signal: number[], windowSize: number): number[] {
  if (windowSize <= 0 || windowSize > signal.length) return [...signal];
  const result: number[] = [];
  let sum = 0;
  for (let i = 0; i < windowSize; i++) sum += signal[i];
  result.push(sum / windowSize);
  for (let i = windowSize; i < signal.length; i++) {
    sum += signal[i] - signal[i - windowSize];
    result.push(sum / windowSize);
  }
  return result;
}

export function lowPassFilter(signal: number[], cutoffRatio: number): number[] {
  const { real, imag } = dft(signal);
  const N = signal.length;
  const cutoff = Math.floor(N * cutoffRatio);

  for (let k = cutoff; k < N - cutoff; k++) {
    real[k] = 0;
    imag[k] = 0;
  }

  return idft(real, imag);
}

export function generateSine(frequency: number, sampleRate: number, duration: number): number[] {
  const samples = Math.floor(sampleRate * duration);
  return Array.from({ length: samples }, (_, i) =>
    Math.sin(2 * Math.PI * frequency * i / sampleRate),
  );
}

export function rms(signal: number[]): number {
  if (signal.length === 0) return 0;
  const sumSquares = signal.reduce((s, v) => s + v * v, 0);
  return Math.sqrt(sumSquares / signal.length);
}

export function zeroCrossings(signal: number[]): number {
  let count = 0;
  for (let i = 1; i < signal.length; i++) {
    if ((signal[i - 1] >= 0 && signal[i] < 0) || (signal[i - 1] < 0 && signal[i] >= 0)) {
      count++;
    }
  }
  return count;
}
