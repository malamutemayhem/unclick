export class FFTRadix2 {
  static fft(real: number[], imag: number[]): { real: number[]; imag: number[] } {
    const n = real.length;
    if (n === 1) return { real: [...real], imag: [...imag] };

    const re = [...real];
    const im = [...imag];
    this.bitReversePermute(re, im);
    this.transform(re, im, false);
    return { real: re, imag: im };
  }

  static ifft(real: number[], imag: number[]): { real: number[]; imag: number[] } {
    const n = real.length;
    const re = [...real];
    const im = [...imag];
    this.bitReversePermute(re, im);
    this.transform(re, im, true);
    for (let i = 0; i < n; i++) { re[i] /= n; im[i] /= n; }
    return { real: re, imag: im };
  }

  private static bitReversePermute(re: number[], im: number[]): void {
    const n = re.length;
    let j = 0;
    for (let i = 1; i < n; i++) {
      let bit = n >> 1;
      while (j & bit) { j ^= bit; bit >>= 1; }
      j ^= bit;
      if (i < j) {
        [re[i], re[j]] = [re[j], re[i]];
        [im[i], im[j]] = [im[j], im[i]];
      }
    }
  }

  private static transform(re: number[], im: number[], inverse: boolean): void {
    const n = re.length;
    for (let len = 2; len <= n; len *= 2) {
      const angle = (2 * Math.PI / len) * (inverse ? -1 : 1);
      const wRe = Math.cos(angle);
      const wIm = Math.sin(angle);
      for (let i = 0; i < n; i += len) {
        let curRe = 1;
        let curIm = 0;
        for (let j = 0; j < len / 2; j++) {
          const u = i + j;
          const v = i + j + len / 2;
          const tRe = curRe * re[v] - curIm * im[v];
          const tIm = curRe * im[v] + curIm * re[v];
          re[v] = re[u] - tRe;
          im[v] = im[u] - tIm;
          re[u] += tRe;
          im[u] += tIm;
          const newCurRe = curRe * wRe - curIm * wIm;
          curIm = curRe * wIm + curIm * wRe;
          curRe = newCurRe;
        }
      }
    }
  }

  static magnitude(real: number[], imag: number[]): number[] {
    return real.map((r, i) => Math.sqrt(r * r + imag[i] * imag[i]));
  }

  static powerSpectrum(real: number[], imag: number[]): number[] {
    return real.map((r, i) => r * r + imag[i] * imag[i]);
  }

  static nextPowerOf2(n: number): number {
    let p = 1;
    while (p < n) p <<= 1;
    return p;
  }
}
