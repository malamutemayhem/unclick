export interface FilterCoefficients {
  b: number[];
  a: number[];
}

export class FilterDesign {
  static lowPass(cutoff: number, sampleRate: number, order = 5): FilterCoefficients {
    const normalized = cutoff / (sampleRate / 2);
    const n = order;
    const b: number[] = [];
    const center = Math.floor(n / 2);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = i - center;
      if (x === 0) {
        b.push(normalized);
      } else {
        const sinc = Math.sin(Math.PI * normalized * x) / (Math.PI * x);
        const window = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (n - 1));
        b.push(sinc * window);
      }
      sum += b[b.length - 1];
    }
    return { b: b.map(v => Math.round((v / sum) * 10000) / 10000), a: [1] };
  }

  static highPass(cutoff: number, sampleRate: number, order = 5): FilterCoefficients {
    const lp = FilterDesign.lowPass(cutoff, sampleRate, order);
    const center = Math.floor(order / 2);
    const b = lp.b.map((v, i) => {
      const hp = i === center ? 1 - v : -v;
      return Math.round(hp * 10000) / 10000;
    });
    return { b, a: [1] };
  }

  static bandPass(lowCutoff: number, highCutoff: number, sampleRate: number, order = 5): FilterCoefficients {
    const lp = FilterDesign.lowPass(highCutoff, sampleRate, order);
    const hp = FilterDesign.highPass(lowCutoff, sampleRate, order);
    const b: number[] = [];
    for (let i = 0; i < order; i++) {
      let sum = 0;
      for (let j = 0; j <= i; j++) {
        sum += (lp.b[j] || 0) * (hp.b[i - j] || 0);
      }
      b.push(Math.round(sum * 10000) / 10000);
    }
    return { b, a: [1] };
  }

  static apply(signal: number[], coefficients: FilterCoefficients): number[] {
    const { b, a } = coefficients;
    const result = new Array(signal.length).fill(0);
    for (let i = 0; i < signal.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (i - j >= 0) result[i] += b[j] * signal[i - j];
      }
      for (let j = 1; j < a.length; j++) {
        if (i - j >= 0) result[i] -= a[j] * result[i - j];
      }
      result[i] = Math.round(result[i] * 10000) / 10000;
    }
    return result;
  }

  static frequencyResponse(coefficients: FilterCoefficients, numPoints = 64): { frequency: number; magnitude: number }[] {
    const { b, a } = coefficients;
    const response: { frequency: number; magnitude: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const w = (Math.PI * i) / numPoints;
      let numReal = 0, numImag = 0;
      for (let j = 0; j < b.length; j++) {
        numReal += b[j] * Math.cos(-w * j);
        numImag += b[j] * Math.sin(-w * j);
      }
      let denReal = 0, denImag = 0;
      for (let j = 0; j < a.length; j++) {
        denReal += a[j] * Math.cos(-w * j);
        denImag += a[j] * Math.sin(-w * j);
      }
      const numMag = Math.sqrt(numReal * numReal + numImag * numImag);
      const denMag = Math.sqrt(denReal * denReal + denImag * denImag);
      response.push({
        frequency: Math.round((w / Math.PI) * 10000) / 10000,
        magnitude: denMag === 0 ? 0 : Math.round((numMag / denMag) * 10000) / 10000,
      });
    }
    return response;
  }

  static movingAverage(order: number): FilterCoefficients {
    const val = Math.round((1 / order) * 10000) / 10000;
    return { b: new Array(order).fill(val), a: [1] };
  }

  static exponentialSmoothing(alpha: number): FilterCoefficients {
    return { b: [Math.round(alpha * 10000) / 10000], a: [1, Math.round(-(1 - alpha) * 10000) / 10000] };
  }
}
