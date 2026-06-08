export class WaveletTransform {
  static haarForward(signal: number[]): { approx: number[]; detail: number[] } {
    const n = signal.length;
    const half = Math.floor(n / 2);
    const approx: number[] = [];
    const detail: number[] = [];
    const sqrt2 = Math.SQRT2;
    for (let i = 0; i < half; i++) {
      approx.push((signal[2 * i] + signal[2 * i + 1]) / sqrt2);
      detail.push((signal[2 * i] - signal[2 * i + 1]) / sqrt2);
    }
    return { approx, detail };
  }

  static haarInverse(approx: number[], detail: number[]): number[] {
    const n = approx.length;
    const result: number[] = new Array(n * 2);
    const sqrt2 = Math.SQRT2;
    for (let i = 0; i < n; i++) {
      result[2 * i] = (approx[i] + detail[i]) / sqrt2;
      result[2 * i + 1] = (approx[i] - detail[i]) / sqrt2;
    }
    return result;
  }

  static multiLevel(signal: number[], levels: number): { coeffs: number[][]; final: number[] } {
    const coeffs: number[][] = [];
    let current = [...signal];
    for (let l = 0; l < levels; l++) {
      if (current.length < 2) break;
      const { approx, detail } = WaveletTransform.haarForward(current);
      coeffs.push(detail);
      current = approx;
    }
    return { coeffs, final: current };
  }

  static denoise(signal: number[], threshold: number): number[] {
    const { approx, detail } = WaveletTransform.haarForward(signal);
    const filtered = detail.map((d) => Math.abs(d) < threshold ? 0 : d);
    return WaveletTransform.haarInverse(approx, filtered);
  }

  static energy(coeffs: number[]): number {
    return coeffs.reduce((sum, c) => sum + c * c, 0);
  }

  static compress(signal: number[], keepRatio: number): number[] {
    const { approx, detail } = WaveletTransform.haarForward(signal);
    const sorted = [...detail].map(Math.abs).sort((a, b) => b - a);
    const keepCount = Math.ceil(sorted.length * keepRatio);
    const threshold = keepCount < sorted.length ? sorted[keepCount] : 0;
    const compressed = detail.map((d) => Math.abs(d) >= threshold ? d : 0);
    return WaveletTransform.haarInverse(approx, compressed);
  }
}
