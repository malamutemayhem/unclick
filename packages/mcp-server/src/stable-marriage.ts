export class StableMarriage {
  static galeShapley(
    menPrefs: number[][],
    womenPrefs: number[][]
  ): { manToWoman: number[]; womanToMan: number[] } {
    const n = menPrefs.length;
    const manToWoman = new Array(n).fill(-1);
    const womanToMan = new Array(n).fill(-1);
    const menNext = new Array(n).fill(0);
    const womenRank: number[][] = Array.from({ length: n }, () => new Array(n));

    for (let w = 0; w < n; w++) {
      for (let rank = 0; rank < n; rank++) {
        womenRank[w][womenPrefs[w][rank]] = rank;
      }
    }

    const freeMen: number[] = Array.from({ length: n }, (_, i) => i);

    while (freeMen.length > 0) {
      const m = freeMen.shift()!;
      const w = menPrefs[m][menNext[m]];
      menNext[m]++;

      if (womanToMan[w] === -1) {
        manToWoman[m] = w;
        womanToMan[w] = m;
      } else {
        const current = womanToMan[w];
        if (womenRank[w][m] < womenRank[w][current]) {
          manToWoman[m] = w;
          womanToMan[w] = m;
          manToWoman[current] = -1;
          freeMen.push(current);
        } else {
          freeMen.push(m);
        }
      }
    }

    return { manToWoman, womanToMan };
  }

  static isStable(
    manToWoman: number[],
    menPrefs: number[][],
    womenPrefs: number[][]
  ): boolean {
    const n = menPrefs.length;
    const womanToMan = new Array(n).fill(-1);
    for (let m = 0; m < n; m++) womanToMan[manToWoman[m]] = m;

    const womenRank: number[][] = Array.from({ length: n }, () => new Array(n));
    for (let w = 0; w < n; w++) {
      for (let rank = 0; rank < n; rank++) {
        womenRank[w][womenPrefs[w][rank]] = rank;
      }
    }

    const menRank: number[][] = Array.from({ length: n }, () => new Array(n));
    for (let m = 0; m < n; m++) {
      for (let rank = 0; rank < n; rank++) {
        menRank[m][menPrefs[m][rank]] = rank;
      }
    }

    for (let m = 0; m < n; m++) {
      const w = manToWoman[m];
      for (const wp of menPrefs[m]) {
        if (wp === w) break;
        const mp = womanToMan[wp];
        if (womenRank[wp][m] < womenRank[wp][mp]) {
          return false;
        }
      }
    }
    return true;
  }
}
