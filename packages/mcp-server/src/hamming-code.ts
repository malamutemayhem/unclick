export class HammingCode {
  static encode(data: number[]): number[] {
    const m = data.length;
    let r = 0;
    while ((1 << r) < m + r + 1) r++;

    const encoded = new Array(m + r).fill(0);
    let dataIdx = 0;
    for (let i = 0; i < m + r; i++) {
      if ((i + 1 & i) === 0) continue;
      encoded[i] = data[dataIdx++];
    }

    for (let i = 0; i < r; i++) {
      const parityPos = (1 << i) - 1;
      let parity = 0;
      for (let j = parityPos; j < encoded.length; j++) {
        if ((j + 1) & (1 << i)) parity ^= encoded[j];
      }
      encoded[parityPos] = parity;
    }

    return encoded;
  }

  static decode(encoded: number[]): { data: number[]; errorPosition: number } {
    const n = encoded.length;
    let r = 0;
    while ((1 << r) < n + 1) r++;

    let syndrome = 0;
    for (let i = 0; i < r; i++) {
      let parity = 0;
      for (let j = 0; j < n; j++) {
        if ((j + 1) & (1 << i)) parity ^= encoded[j];
      }
      if (parity) syndrome |= (1 << i);
    }

    const corrected = [...encoded];
    if (syndrome > 0 && syndrome <= n) {
      corrected[syndrome - 1] ^= 1;
    }

    const data: number[] = [];
    for (let i = 0; i < n; i++) {
      if ((i + 1 & i) !== 0) data.push(corrected[i]);
    }

    return { data, errorPosition: syndrome };
  }

  static hammingDistance(a: number[], b: number[]): number {
    let dist = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) dist++;
    }
    return dist + Math.abs(a.length - b.length);
  }

  static parityCheck(encoded: number[]): boolean {
    const { errorPosition } = this.decode(encoded);
    return errorPosition === 0;
  }

  static minDistance(): number {
    return 3;
  }
}
