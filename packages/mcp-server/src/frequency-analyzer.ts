export class FrequencyAnalyzer {
  static dft(signal: number[]): Array<{ real: number; imag: number; magnitude: number; phase: number }> {
    const N = signal.length;
    const result: Array<{ real: number; imag: number; magnitude: number; phase: number }> = [];

    for (let k = 0; k < N; k++) {
      let real = 0;
      let imag = 0;
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += signal[n] * Math.cos(angle);
        imag -= signal[n] * Math.sin(angle);
      }
      const magnitude = Math.sqrt(real * real + imag * imag);
      const phase = Math.atan2(imag, real);
      result.push({ real, imag, magnitude, phase });
    }

    return result;
  }

  static inverseDft(spectrum: Array<{ real: number; imag: number }>): number[] {
    const N = spectrum.length;
    const signal: number[] = [];

    for (let n = 0; n < N; n++) {
      let sum = 0;
      for (let k = 0; k < N; k++) {
        const angle = (2 * Math.PI * k * n) / N;
        sum += spectrum[k].real * Math.cos(angle) - spectrum[k].imag * Math.sin(angle);
      }
      signal.push(sum / N);
    }

    return signal;
  }

  static magnitudeSpectrum(signal: number[]): number[] {
    return FrequencyAnalyzer.dft(signal).map((b) => b.magnitude);
  }

  static powerSpectrum(signal: number[]): number[] {
    return FrequencyAnalyzer.dft(signal).map((b) => b.magnitude * b.magnitude);
  }

  static dominantFrequency(signal: number[], sampleRate: number): number {
    const spectrum = FrequencyAnalyzer.magnitudeSpectrum(signal);
    const halfN = Math.floor(signal.length / 2);
    let maxIdx = 0;
    let maxMag = 0;
    for (let i = 1; i < halfN; i++) {
      if (spectrum[i] > maxMag) {
        maxMag = spectrum[i];
        maxIdx = i;
      }
    }
    return (maxIdx * sampleRate) / signal.length;
  }

  static spectralCentroid(signal: number[], sampleRate: number): number {
    const spectrum = FrequencyAnalyzer.magnitudeSpectrum(signal);
    const halfN = Math.floor(signal.length / 2);
    let weightedSum = 0;
    let totalMag = 0;
    for (let i = 0; i < halfN; i++) {
      const freq = (i * sampleRate) / signal.length;
      weightedSum += freq * spectrum[i];
      totalMag += spectrum[i];
    }
    return totalMag > 0 ? weightedSum / totalMag : 0;
  }

  static bandwidth(signal: number[], sampleRate: number): number {
    const centroid = FrequencyAnalyzer.spectralCentroid(signal, sampleRate);
    const spectrum = FrequencyAnalyzer.magnitudeSpectrum(signal);
    const halfN = Math.floor(signal.length / 2);
    let weightedSum = 0;
    let totalMag = 0;
    for (let i = 0; i < halfN; i++) {
      const freq = (i * sampleRate) / signal.length;
      weightedSum += (freq - centroid) ** 2 * spectrum[i];
      totalMag += spectrum[i];
    }
    return totalMag > 0 ? Math.sqrt(weightedSum / totalMag) : 0;
  }

  static noteToFrequency(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  static frequencyToNote(freq: number): number {
    return Math.round(12 * Math.log2(freq / 440) + 69);
  }
}
