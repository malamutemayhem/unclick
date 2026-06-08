export class ShannonEntropy {
  static entropy(data: string): number {
    if (data.length === 0) return 0;
    const freq = new Map<string, number>();
    for (const ch of data) freq.set(ch, (freq.get(ch) || 0) + 1);

    let h = 0;
    for (const count of freq.values()) {
      const p = count / data.length;
      if (p > 0) h -= p * Math.log2(p);
    }
    return h;
  }

  static entropyFromFrequencies(frequencies: number[]): number {
    const total = frequencies.reduce((s, f) => s + f, 0);
    if (total === 0) return 0;

    let h = 0;
    for (const f of frequencies) {
      if (f > 0) {
        const p = f / total;
        h -= p * Math.log2(p);
      }
    }
    return h;
  }

  static jointEntropy(dataA: string, dataB: string): number {
    if (dataA.length !== dataB.length || dataA.length === 0) return 0;
    const freq = new Map<string, number>();
    for (let i = 0; i < dataA.length; i++) {
      const pair = dataA[i] + "," + dataB[i];
      freq.set(pair, (freq.get(pair) || 0) + 1);
    }

    let h = 0;
    for (const count of freq.values()) {
      const p = count / dataA.length;
      if (p > 0) h -= p * Math.log2(p);
    }
    return h;
  }

  static mutualInformation(dataA: string, dataB: string): number {
    return this.entropy(dataA) + this.entropy(dataB) - this.jointEntropy(dataA, dataB);
  }

  static maxEntropy(alphabetSize: number): number {
    if (alphabetSize <= 0) return 0;
    return Math.log2(alphabetSize);
  }

  static redundancy(data: string): number {
    const freq = new Map<string, number>();
    for (const ch of data) freq.set(ch, (freq.get(ch) || 0) + 1);
    const maxH = this.maxEntropy(freq.size);
    if (maxH === 0) return 0;
    return 1 - this.entropy(data) / maxH;
  }

  static crossEntropy(data: string, modelFreqs: Map<string, number>): number {
    if (data.length === 0) return 0;
    const total = [...modelFreqs.values()].reduce((s, v) => s + v, 0);
    const freq = new Map<string, number>();
    for (const ch of data) freq.set(ch, (freq.get(ch) || 0) + 1);

    let h = 0;
    for (const [ch, count] of freq) {
      const p = count / data.length;
      const q = (modelFreqs.get(ch) || 0) / total;
      if (q > 0) h -= p * Math.log2(q);
    }
    return h;
  }
}
