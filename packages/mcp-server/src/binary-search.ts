export function binarySearch<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  const cmp = compare ?? defaultCompare;
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const c = cmp(arr[mid], target);
    if (c === 0) return mid;
    if (c < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

export function lowerBound<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  const cmp = compare ?? defaultCompare;
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cmp(arr[mid], target) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function upperBound<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  const cmp = compare ?? defaultCompare;
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cmp(arr[mid], target) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function equalRange<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): [number, number] {
  return [lowerBound(arr, target, compare), upperBound(arr, target, compare)];
}

export function insertionPoint<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  return lowerBound(arr, target, compare);
}

function defaultCompare(a: unknown, b: unknown): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
