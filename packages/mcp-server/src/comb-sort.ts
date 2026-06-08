export class CombSort {
  static sort(arr: number[]): number[] {
    const result = [...arr];
    let gap = result.length;
    const shrink = 1.3;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }
      for (let i = 0; i + gap < result.length; i++) {
        if (result[i] > result[i + gap]) {
          [result[i], result[i + gap]] = [result[i + gap], result[i]];
          sorted = false;
        }
      }
    }
    return result;
  }

  static sortDescending(arr: number[]): number[] {
    return CombSort.sort(arr).reverse();
  }

  static sortBy<T>(arr: T[], keyFn: (item: T) => number): T[] {
    const result = [...arr];
    let gap = result.length;
    const shrink = 1.3;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }
      for (let i = 0; i + gap < result.length; i++) {
        if (keyFn(result[i]) > keyFn(result[i + gap])) {
          [result[i], result[i + gap]] = [result[i + gap], result[i]];
          sorted = false;
        }
      }
    }
    return result;
  }

  static isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  static sortStrings(arr: string[]): string[] {
    const result = [...arr];
    let gap = result.length;
    const shrink = 1.3;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }
      for (let i = 0; i + gap < result.length; i++) {
        if (result[i] > result[i + gap]) {
          [result[i], result[i + gap]] = [result[i + gap], result[i]];
          sorted = false;
        }
      }
    }
    return result;
  }
}
