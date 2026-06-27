export function binarySearch<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  const cmp = compareFn || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const c = cmp(arr[mid], target);
    if (c === 0) return mid;
    if (c < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

export function lowerBound<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  const cmp = compareFn || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (cmp(arr[mid], target) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function upperBound<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  const cmp = compareFn || ((a: T, b: T) => (a as unknown as number) - (b as unknown as number));
  let lo = 0;
  let hi = arr.length;

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (cmp(arr[mid], target) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function equalRange<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): [number, number] {
  return [lowerBound(arr, target, compareFn), upperBound(arr, target, compareFn)];
}

export function insertionIndex<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  return lowerBound(arr, target, compareFn);
}

export function binarySearchBy<T, K>(
  arr: T[],
  target: K,
  keyFn: (item: T) => K,
  compareFn?: (a: K, b: K) => number,
): number {
  const cmp = compareFn || ((a: K, b: K) => (a as unknown as number) - (b as unknown as number));
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const c = cmp(keyFn(arr[mid]), target);
    if (c === 0) return mid;
    if (c < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
