export class CatalanNumbers {
  static nth(n: number): number {
    if (n <= 1) return 1;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        dp[i] += dp[j] * dp[i - 1 - j];
      }
    }
    return dp[n];
  }

  static sequence(count: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      result.push(CatalanNumbers.nth(i));
    }
    return result;
  }

  static binomialFormula(n: number): number {
    let c = 1;
    for (let i = 0; i < n; i++) {
      c = c * 2 * (2 * i + 1) / (i + 2);
    }
    return Math.round(c);
  }

  static binaryTrees(n: number): number {
    return CatalanNumbers.nth(n);
  }

  static parenthesizations(n: number): number {
    return CatalanNumbers.nth(n);
  }

  static triangulations(n: number): number {
    if (n < 3) return n < 3 ? 1 : 0;
    return CatalanNumbers.nth(n - 2);
  }

  static monotonePaths(n: number): number {
    return CatalanNumbers.nth(n);
  }

  static dyckPaths(n: number): number {
    return CatalanNumbers.nth(n);
  }

  static generateParentheses(n: number): string[] {
    const result: string[] = [];
    const gen = (open: number, close: number, current: string): void => {
      if (current.length === 2 * n) {
        result.push(current);
        return;
      }
      if (open < n) gen(open + 1, close, current + "(");
      if (close < open) gen(open, close + 1, current + ")");
    };
    gen(0, 0, "");
    return result;
  }

  static isCatalan(n: number): boolean {
    if (n < 1) return false;
    for (let i = 0; i < 30; i++) {
      const c = CatalanNumbers.nth(i);
      if (c === n) return true;
      if (c > n) return false;
    }
    return false;
  }
}
