export class AuctionAlgorithm {
  static solve(
    benefits: number[][],
    epsilon = 1
  ): { assignment: number[]; totalBenefit: number } {
    const n = benefits.length;
    const m = benefits[0].length;
    const prices = new Array(m).fill(0);
    const assignment = new Array(n).fill(-1);
    const objectOwner = new Array(m).fill(-1);

    let unassigned = Array.from({ length: n }, (_, i) => i);
    let maxIter = n * m * 10;

    while (unassigned.length > 0 && maxIter-- > 0) {
      const i = unassigned.shift()!;
      let bestJ = 0;
      let bestVal = benefits[i][0] - prices[0];
      let secondVal = -Infinity;

      for (let j = 1; j < m; j++) {
        const val = benefits[i][j] - prices[j];
        if (val > bestVal) {
          secondVal = bestVal;
          bestVal = val;
          bestJ = j;
        } else if (val > secondVal) {
          secondVal = val;
        }
      }

      if (secondVal === -Infinity) secondVal = bestVal - 1;

      const bid = bestVal - secondVal + epsilon;
      prices[bestJ] += bid;

      if (objectOwner[bestJ] !== -1) {
        const prev = objectOwner[bestJ];
        assignment[prev] = -1;
        unassigned.push(prev);
      }

      assignment[i] = bestJ;
      objectOwner[bestJ] = i;
    }

    let totalBenefit = 0;
    for (let i = 0; i < n; i++) {
      if (assignment[i] >= 0) {
        totalBenefit += benefits[i][assignment[i]];
      }
    }

    return { assignment, totalBenefit };
  }

  static isValidAssignment(assignment: number[], m: number): boolean {
    const used = new Set<number>();
    for (const j of assignment) {
      if (j < 0 || j >= m) return false;
      if (used.has(j)) return false;
      used.add(j);
    }
    return true;
  }
}
