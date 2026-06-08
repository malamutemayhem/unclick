export class Combinatorics {
  static factorial(n: number): number {
    if (n < 0) throw new Error("Negative factorial undefined");
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  static permutations(n: number, r: number): number {
    if (r > n) return 0;
    let result = 1;
    for (let i = n; i > n - r; i--) result *= i;
    return result;
  }

  static combinations(n: number, r: number): number {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    r = Math.min(r, n - r);
    let result = 1;
    for (let i = 0; i < r; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.round(result);
  }

  static permutationsList<T>(items: T[]): T[][] {
    if (items.length <= 1) return [items.slice()];
    const result: T[][] = [];
    for (let i = 0; i < items.length; i++) {
      const rest = [...items.slice(0, i), ...items.slice(i + 1)];
      for (const perm of Combinatorics.permutationsList(rest)) {
        result.push([items[i], ...perm]);
      }
    }
    return result;
  }

  static combinationsList<T>(items: T[], r: number): T[][] {
    if (r === 0) return [[]];
    if (r > items.length) return [];
    const result: T[][] = [];
    for (let i = 0; i <= items.length - r; i++) {
      const rest = items.slice(i + 1);
      for (const combo of Combinatorics.combinationsList(rest, r - 1)) {
        result.push([items[i], ...combo]);
      }
    }
    return result;
  }

  static powerSet<T>(items: T[]): T[][] {
    const result: T[][] = [[]];
    for (const item of items) {
      const len = result.length;
      for (let i = 0; i < len; i++) {
        result.push([...result[i], item]);
      }
    }
    return result;
  }

  static derangements(n: number): number {
    if (n === 0) return 1;
    if (n === 1) return 0;
    let prev2 = 1;
    let prev1 = 0;
    for (let i = 2; i <= n; i++) {
      const current = (i - 1) * (prev1 + prev2);
      prev2 = prev1;
      prev1 = current;
    }
    return prev1;
  }

  static catalan(n: number): number {
    return Combinatorics.combinations(2 * n, n) / (n + 1);
  }

  static stirlingSecond(n: number, k: number): number {
    if (n === 0 && k === 0) return 1;
    if (n === 0 || k === 0) return 0;
    if (k === 1 || k === n) return 1;
    return k * Combinatorics.stirlingSecond(n - 1, k) + Combinatorics.stirlingSecond(n - 1, k - 1);
  }

  static bell(n: number): number {
    if (n === 0) return 1;
    const triangle: number[][] = [[1]];
    for (let i = 1; i <= n; i++) {
      const row = [triangle[i - 1][triangle[i - 1].length - 1]];
      for (let j = 1; j <= i; j++) {
        row.push(row[j - 1] + triangle[i - 1][j - 1]);
      }
      triangle.push(row);
    }
    return triangle[n][0];
  }

  static multinomial(...groups: number[]): number {
    const total = groups.reduce((s, g) => s + g, 0);
    let result = Combinatorics.factorial(total);
    for (const g of groups) {
      result /= Combinatorics.factorial(g);
    }
    return Math.round(result);
  }
}
