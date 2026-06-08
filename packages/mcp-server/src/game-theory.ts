export interface PayoffMatrix {
  players: [string, string];
  strategies: [string[], string[]];
  payoffs: Array<Array<[number, number]>>;
}

export interface NashEquilibrium {
  strategy1: string;
  strategy2: string;
  payoff1: number;
  payoff2: number;
}

export class GameTheory {
  static findNashEquilibria(matrix: PayoffMatrix): NashEquilibrium[] {
    const equilibria: NashEquilibrium[] = [];
    const rows = matrix.strategies[0].length;
    const cols = matrix.strategies[1].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const isBestForP1 = GameTheory.isBestResponseP1(matrix, i, j);
        const isBestForP2 = GameTheory.isBestResponseP2(matrix, i, j);
        if (isBestForP1 && isBestForP2) {
          equilibria.push({
            strategy1: matrix.strategies[0][i],
            strategy2: matrix.strategies[1][j],
            payoff1: matrix.payoffs[i][j][0],
            payoff2: matrix.payoffs[i][j][1],
          });
        }
      }
    }
    return equilibria;
  }

  static dominantStrategy(matrix: PayoffMatrix, player: 0 | 1): string | null {
    const strategies = matrix.strategies[player];
    for (let s = 0; s < strategies.length; s++) {
      let isDominant = true;
      for (let other = 0; other < strategies.length; other++) {
        if (s === other) continue;
        if (!GameTheory.dominates(matrix, player, s, other)) {
          isDominant = false;
          break;
        }
      }
      if (isDominant) return strategies[s];
    }
    return null;
  }

  static prisonersDilemma(cooperateCooperate: number, cooperateDefect: number, defectCooperate: number, defectDefect: number): PayoffMatrix {
    return {
      players: ["Player 1", "Player 2"],
      strategies: [["Cooperate", "Defect"], ["Cooperate", "Defect"]],
      payoffs: [
        [[cooperateCooperate, cooperateCooperate], [cooperateDefect, defectCooperate]],
        [[defectCooperate, cooperateDefect], [defectDefect, defectDefect]],
      ],
    };
  }

  static paretoOptimal(matrix: PayoffMatrix): Array<[number, number]> {
    const optimal: Array<[number, number]> = [];
    const rows = matrix.strategies[0].length;
    const cols = matrix.strategies[1].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let isPareto = true;
        for (let ii = 0; ii < rows && isPareto; ii++) {
          for (let jj = 0; jj < cols && isPareto; jj++) {
            if (ii === i && jj === j) continue;
            const [p1, p2] = matrix.payoffs[i][j];
            const [q1, q2] = matrix.payoffs[ii][jj];
            if (q1 >= p1 && q2 >= p2 && (q1 > p1 || q2 > p2)) {
              isPareto = false;
            }
          }
        }
        if (isPareto) optimal.push([i, j]);
      }
    }
    return optimal;
  }

  static maximin(matrix: PayoffMatrix, player: 0 | 1): { strategy: string; value: number } {
    const strategies = matrix.strategies[player];
    let bestMin = -Infinity;
    let bestStrategy = 0;

    for (let s = 0; s < strategies.length; s++) {
      let minPayoff = Infinity;
      if (player === 0) {
        for (let j = 0; j < matrix.strategies[1].length; j++) {
          minPayoff = Math.min(minPayoff, matrix.payoffs[s][j][0]);
        }
      } else {
        for (let i = 0; i < matrix.strategies[0].length; i++) {
          minPayoff = Math.min(minPayoff, matrix.payoffs[i][s][1]);
        }
      }
      if (minPayoff > bestMin) {
        bestMin = minPayoff;
        bestStrategy = s;
      }
    }

    return { strategy: strategies[bestStrategy], value: bestMin };
  }

  static socialWelfare(matrix: PayoffMatrix, row: number, col: number): number {
    const [p1, p2] = matrix.payoffs[row][col];
    return p1 + p2;
  }

  private static isBestResponseP1(matrix: PayoffMatrix, row: number, col: number): boolean {
    const payoff = matrix.payoffs[row][col][0];
    for (let i = 0; i < matrix.strategies[0].length; i++) {
      if (matrix.payoffs[i][col][0] > payoff) return false;
    }
    return true;
  }

  private static isBestResponseP2(matrix: PayoffMatrix, row: number, col: number): boolean {
    const payoff = matrix.payoffs[row][col][1];
    for (let j = 0; j < matrix.strategies[1].length; j++) {
      if (matrix.payoffs[row][j][1] > payoff) return false;
    }
    return true;
  }

  private static dominates(matrix: PayoffMatrix, player: 0 | 1, s1: number, s2: number): boolean {
    if (player === 0) {
      for (let j = 0; j < matrix.strategies[1].length; j++) {
        if (matrix.payoffs[s1][j][0] <= matrix.payoffs[s2][j][0]) return false;
      }
    } else {
      for (let i = 0; i < matrix.strategies[0].length; i++) {
        if (matrix.payoffs[i][s1][1] <= matrix.payoffs[i][s2][1]) return false;
      }
    }
    return true;
  }
}
