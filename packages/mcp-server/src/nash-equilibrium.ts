export interface PayoffMatrix {
  rows: number;
  cols: number;
  playerA: number[][];
  playerB: number[][];
}

export interface NashResult {
  pureEquilibria: [number, number][];
  dominantStrategyA: number | null;
  dominantStrategyB: number | null;
}

export class NashEquilibrium {
  static findPureNash(matrix: PayoffMatrix): [number, number][] {
    const equilibria: [number, number][] = [];

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let isBestA = true;
        for (let ii = 0; ii < matrix.rows; ii++) {
          if (matrix.playerA[ii][j] > matrix.playerA[i][j]) {
            isBestA = false;
            break;
          }
        }

        let isBestB = true;
        for (let jj = 0; jj < matrix.cols; jj++) {
          if (matrix.playerB[i][jj] > matrix.playerB[i][j]) {
            isBestB = false;
            break;
          }
        }

        if (isBestA && isBestB) {
          equilibria.push([i, j]);
        }
      }
    }

    return equilibria;
  }

  static findDominantStrategy(payoffs: number[][]): number | null {
    const n = payoffs.length;
    if (n === 0) return null;
    const m = payoffs[0].length;

    for (let i = 0; i < n; i++) {
      let dominant = true;
      for (let ii = 0; ii < n; ii++) {
        if (ii === i) continue;
        for (let j = 0; j < m; j++) {
          if (payoffs[ii][j] > payoffs[i][j]) {
            dominant = false;
            break;
          }
        }
        if (!dominant) break;
      }
      if (dominant) return i;
    }
    return null;
  }

  static analyze(matrix: PayoffMatrix): NashResult {
    return {
      pureEquilibria: this.findPureNash(matrix),
      dominantStrategyA: this.findDominantStrategy(matrix.playerA),
      dominantStrategyB: this.findDominantStrategy(this.transpose(matrix.playerB)),
    };
  }

  private static transpose(m: number[][]): number[][] {
    if (m.length === 0) return [];
    return m[0].map((_, j) => m.map((row) => row[j]));
  }

  static mixedNash2x2(a: number[][]): [number, number] | null {
    if (a.length !== 2 || a[0].length !== 2) return null;
    const denom = a[0][0] - a[0][1] - a[1][0] + a[1][1];
    if (Math.abs(denom) < 1e-10) return null;
    const p = (a[1][1] - a[0][1]) / denom;
    const q = (a[1][1] - a[1][0]) / denom;
    if (p < 0 || p > 1 || q < 0 || q > 1) return null;
    return [p, q];
  }

  static paretoOptimal(matrix: PayoffMatrix): [number, number][] {
    const outcomes: [number, number, number, number][] = [];
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        outcomes.push([i, j, matrix.playerA[i][j], matrix.playerB[i][j]]);
      }
    }

    return outcomes
      .filter(([, , a1, b1]) => {
        return !outcomes.some(([, , a2, b2]) =>
          (a2 > a1 && b2 >= b1) || (a2 >= a1 && b2 > b1)
        );
      })
      .map(([i, j]) => [i, j] as [number, number]);
  }
}
