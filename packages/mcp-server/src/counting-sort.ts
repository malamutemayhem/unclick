export class CountingSort {
  static sort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    for (const val of arr) {
      count[val - min]++;
    }
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }
    return output;
  }

  static sortDescending(arr: number[]): number[] {
    return CountingSort.sort(arr).reverse();
  }

  static sortBy<T>(arr: T[], keyFn: (item: T) => number): T[] {
    if (arr.length === 0) return [];
    const keys = arr.map(keyFn);
    const max = Math.max(...keys);
    const min = Math.min(...keys);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    for (const k of keys) {
      count[k - min]++;
    }
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[keys[i] - min] - 1] = arr[i];
      count[keys[i] - min]--;
    }
    return output;
  }

  static frequency(arr: number[]): Map<number, number> {
    const freq = new Map<number, number>();
    for (const val of arr) {
      freq.set(val, (freq.get(val) ?? 0) + 1);
    }
    return freq;
  }

  static mode(arr: number[]): number {
    const freq = CountingSort.frequency(arr);
    let maxCount = 0;
    let modeVal = arr[0];
    for (const [val, count] of freq) {
      if (count > maxCount) {
        maxCount = count;
        modeVal = val;
      }
    }
    return modeVal;
  }

  static rank(arr: number[]): number[] {
    const sorted = CountingSort.sort([...arr]);
    const rankMap = new Map<number, number>();
    let r = 1;
    for (const val of sorted) {
      if (!rankMap.has(val)) {
        rankMap.set(val, r);
      }
      r++;
    }
    return arr.map((v) => rankMap.get(v)!);
  }
}
