export class CombinationGen {
  static combinations<T>(arr: T[], k: number): T[][] {
    const result: T[][] = [];
    if (k > arr.length || k < 0) return result;
    const combo: T[] = [];
    const gen = (start: number): void => {
      if (combo.length === k) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        gen(i + 1);
        combo.pop();
      }
    };
    gen(0);
    return result;
  }

  static permutations<T>(arr: T[]): T[][] {
    const result: T[][] = [];
    if (arr.length === 0) return [[]];
    const perm = (items: T[], current: T[]): void => {
      if (items.length === 0) {
        result.push([...current]);
        return;
      }
      for (let i = 0; i < items.length; i++) {
        current.push(items[i]);
        perm([...items.slice(0, i), ...items.slice(i + 1)], current);
        current.pop();
      }
    };
    perm(arr, []);
    return result;
  }

  static powerSet<T>(arr: T[]): T[][] {
    const result: T[][] = [[]];
    for (const item of arr) {
      const len = result.length;
      for (let i = 0; i < len; i++) {
        result.push([...result[i], item]);
      }
    }
    return result;
  }

  static nCr(n: number, r: number): number {
    if (r > n || r < 0) return 0;
    if (r === 0 || r === n) return 1;
    let result = 1;
    for (let i = 0; i < r; i++) {
      result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
  }

  static nPr(n: number, r: number): number {
    if (r > n || r < 0) return 0;
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= n - i;
    }
    return result;
  }

  static cartesianProduct<T>(...arrays: T[][]): T[][] {
    return arrays.reduce<T[][]>(
      (acc, arr) => acc.flatMap((combo) => arr.map((item) => [...combo, item])),
      [[]]
    );
  }

  static derangements(n: number): number {
    if (n === 0) return 1;
    if (n === 1) return 0;
    let a = 1;
    let b = 0;
    for (let i = 2; i <= n; i++) {
      const c = (i - 1) * (a + b);
      a = b;
      b = c;
    }
    return b;
  }
}
