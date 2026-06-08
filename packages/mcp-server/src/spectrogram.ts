export interface SpectrogramFrame {
  time: number;
  frequencies: number[];
  magnitudes: number[];
}

export class Spectrogram {
  static compute(
    signal: number[],
    windowSize: number,
    hopSize: number,
    sampleRate = 1,
  ): SpectrogramFrame[] {
    const frames: SpectrogramFrame[] = [];
    const numFreqs = Math.floor(windowSize / 2) + 1;

    for (let start = 0; start + windowSize <= signal.length; start += hopSize) {
      const windowed = Spectrogram.hannWindow(signal.slice(start, start + windowSize));
      const { magnitudes, frequencies } = Spectrogram.dftMagnitudes(windowed, sampleRate);

      frames.push({
        time: Math.round((start / sampleRate) * 10000) / 10000,
        frequencies: frequencies.slice(0, numFreqs),
        magnitudes: magnitudes.slice(0, numFreqs),
      });
    }

    return frames;
  }

  static melSpectrogram(
    signal: number[],
    windowSize: number,
    hopSize: number,
    sampleRate: number,
    numMels = 26,
  ): { times: number[]; melBands: number[][] } {
    const frames = Spectrogram.compute(signal, windowSize, hopSize, sampleRate);
    const maxFreq = sampleRate / 2;
    const melFilters = Spectrogram.melFilterBank(numMels, frames[0]?.frequencies.length || 0, maxFreq);

    const times = frames.map(f => f.time);
    const melBands = frames.map(frame => {
      return melFilters.map(filter => {
        let energy = 0;
        for (let i = 0; i < filter.length; i++) {
          energy += filter[i] * (frame.magnitudes[i] || 0) ** 2;
        }
        return Math.round(Math.log(Math.max(energy, 1e-10)) * 10000) / 10000;
      });
    });

    return { times, melBands };
  }

  static powerSpectralDensity(signal: number[], windowSize: number, sampleRate = 1): number[] {
    const numSegments = Math.floor(signal.length / windowSize);
    const numFreqs = Math.floor(windowSize / 2) + 1;
    const psd = new Array(numFreqs).fill(0);

    for (let seg = 0; seg < numSegments; seg++) {
      const start = seg * windowSize;
      const windowed = Spectrogram.hannWindow(signal.slice(start, start + windowSize));
      const { magnitudes } = Spectrogram.dftMagnitudes(windowed, sampleRate);
      for (let i = 0; i < numFreqs; i++) {
        psd[i] += magnitudes[i] ** 2;
      }
    }

    return psd.map(v => Math.round((v / numSegments) * 10000) / 10000);
  }

  static hannWindow(signal: number[]): number[] {
    const n = signal.length;
    return signal.map((v, i) => v * 0.5 * (1 - Math.cos(2 * Math.PI * i / (n - 1))));
  }

  private static dftMagnitudes(
    signal: number[],
    sampleRate: number,
  ): { magnitudes: number[]; frequencies: number[] } {
    const n = signal.length;
    const magnitudes: number[] = [];
    const frequencies: number[] = [];

    for (let k = 0; k <= n / 2; k++) {
      let re = 0, im = 0;
      for (let t = 0; t < n; t++) {
        const angle = (2 * Math.PI * k * t) / n;
        re += signal[t] * Math.cos(angle);
        im -= signal[t] * Math.sin(angle);
      }
      magnitudes.push(Math.round(Math.sqrt(re * re + im * im) * 10000) / 10000);
      frequencies.push(Math.round((k * sampleRate / n) * 10000) / 10000);
    }

    return { magnitudes, frequencies };
  }

  private static melFilterBank(numMels: number, numFreqs: number, maxFreq: number): number[][] {
    const melMax = 2595 * Math.log10(1 + maxFreq / 700);
    const melPoints = Array.from({ length: numMels + 2 }, (_, i) =>
      700 * (Math.pow(10, (melMax * i / (numMels + 1)) / 2595) - 1),
    );
    const freqBins = melPoints.map(f => Math.round(f / maxFreq * (numFreqs - 1)));

    const filters: number[][] = [];
    for (let m = 0; m < numMels; m++) {
      const filter = new Array(numFreqs).fill(0);
      for (let k = freqBins[m]; k < freqBins[m + 1]; k++) {
        if (k >= 0 && k < numFreqs) {
          filter[k] = (k - freqBins[m]) / (freqBins[m + 1] - freqBins[m] || 1);
        }
      }
      for (let k = freqBins[m + 1]; k < freqBins[m + 2]; k++) {
        if (k >= 0 && k < numFreqs) {
          filter[k] = (freqBins[m + 2] - k) / (freqBins[m + 2] - freqBins[m + 1] || 1);
        }
      }
      filters.push(filter);
    }
    return filters;
  }
}
