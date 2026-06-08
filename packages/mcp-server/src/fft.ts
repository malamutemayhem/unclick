export interface FrequencyBin {
  frequency: number;
  magnitude: number;
  phase: number;
}

export class FFT {
  static transform(signal: number[]): { real: number[]; imag: number[] } {
    const n = signal.length;
    const real = new Array(n).fill(0);
    const imag = new Array(n).fill(0);
    for (let k = 0; k < n; k++) {
      for (let t = 0; t < n; t++) {
        const angle = (2 * Math.PI * k * t) / n;
        real[k] += signal[t] * Math.cos(angle);
        imag[k] -= signal[t] * Math.sin(angle);
      }
      real[k] = Math.round(real[k] * 10000) / 10000;
      imag[k] = Math.round(imag[k] * 10000) / 10000;
    }
    return { real, imag };
  }

  static inverse(real: number[], imag: number[]): number[] {
    const n = real.length;
    const result = new Array(n).fill(0);
    for (let t = 0; t < n; t++) {
      for (let k = 0; k < n; k++) {
        const angle = (2 * Math.PI * k * t) / n;
        result[t] += real[k] * Math.cos(angle) - imag[k] * Math.sin(angle);
      }
      result[t] = Math.round((result[t] / n) * 10000) / 10000;
    }
    return result;
  }

  static magnitudeSpectrum(signal: number[]): number[] {
    const { real, imag } = FFT.transform(signal);
    return real.map((r, i) =>
      Math.round(Math.sqrt(r * r + imag[i] * imag[i]) * 10000) / 10000,
    );
  }

  static powerSpectrum(signal: number[]): number[] {
    const { real, imag } = FFT.transform(signal);
    return real.map((r, i) =>
      Math.round((r * r + imag[i] * imag[i]) * 10000) / 10000,
    );
  }

  static frequencyBins(signal: number[], sampleRate: number): FrequencyBin[] {
    const { real, imag } = FFT.transform(signal);
    const n = signal.length;
    const bins: FrequencyBin[] = [];
    for (let k = 0; k < Math.floor(n / 2) + 1; k++) {
      bins.push({
        frequency: Math.round((k * sampleRate / n) * 10000) / 10000,
        magnitude: Math.round(Math.sqrt(real[k] * real[k] + imag[k] * imag[k]) * 10000) / 10000,
        phase: Math.round(Math.atan2(imag[k], real[k]) * 10000) / 10000,
      });
    }
    return bins;
  }

  static dominantFrequency(signal: number[], sampleRate: number): number {
    const bins = FFT.frequencyBins(signal, sampleRate);
    const nonDC = bins.slice(1);
    if (nonDC.length === 0) return 0;
    let maxMag = 0;
    let maxFreq = 0;
    for (const bin of nonDC) {
      if (bin.magnitude > maxMag) {
        maxMag = bin.magnitude;
        maxFreq = bin.frequency;
      }
    }
    return maxFreq;
  }

  static spectralCentroid(signal: number[], sampleRate: number): number {
    const bins = FFT.frequencyBins(signal, sampleRate);
    let weightedSum = 0;
    let totalMag = 0;
    for (const bin of bins) {
      weightedSum += bin.frequency * bin.magnitude;
      totalMag += bin.magnitude;
    }
    return totalMag === 0 ? 0 : Math.round((weightedSum / totalMag) * 10000) / 10000;
  }
}
