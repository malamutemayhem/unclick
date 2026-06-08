export function radixSortLSD(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];

  const negatives = arr.filter((x) => x < 0).map((x) => -x);
  const positives = arr.filter((x) => x >= 0);

  const sortPositives = (nums: number[]): number[] => {
    if (nums.length === 0) return [];
    let max = nums[0];
    for (const n of nums) if (n > max) max = n;

    let result = [...nums];
    for (let exp = 1; max / exp >= 1; exp *= 10) {
      result = countingSortByDigit(result, exp);
    }
    return result;
  };

  const sortedNeg = sortPositives(negatives).reverse().map((x) => -x);
  const sortedPos = sortPositives(positives);
  return [...sortedNeg, ...sortedPos];
}

function countingSortByDigit(arr: number[], exp: number): number[] {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  for (const num of arr) {
    const digit = Math.floor(num / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  return output;
}

export function radixSortMSD(arr: string[]): string[] {
  if (arr.length <= 1) return [...arr];
  return msdSort([...arr], 0);
}

function msdSort(arr: string[], d: number): string[] {
  if (arr.length <= 1) return arr;

  const buckets = new Map<number, string[]>();

  for (const s of arr) {
    const key = d < s.length ? s.charCodeAt(d) : -1;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(s);
  }

  const result: string[] = [];
  const sortedKeys = [...buckets.keys()].sort((a, b) => a - b);

  for (const key of sortedKeys) {
    const bucket = buckets.get(key)!;
    if (key === -1 || bucket.length === 1) {
      result.push(...bucket);
    } else {
      result.push(...msdSort(bucket, d + 1));
    }
  }

  return result;
}

export function countingSort(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];

  let min = arr[0];
  let max = arr[0];
  for (const n of arr) {
    if (n < min) min = n;
    if (n > max) max = n;
  }

  const range = max - min + 1;
  const count = new Array(range).fill(0);

  for (const n of arr) {
    count[n - min]++;
  }

  const result: number[] = [];
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i + min);
    }
  }

  return result;
}

export function bucketSort(arr: number[], bucketCount = 10): number[] {
  if (arr.length <= 1) return [...arr];

  let min = arr[0];
  let max = arr[0];
  for (const n of arr) {
    if (n < min) min = n;
    if (n > max) max = n;
  }

  if (min === max) return [...arr];

  const range = max - min;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (const n of arr) {
    const idx = Math.min(Math.floor(((n - min) / range) * (bucketCount - 1)), bucketCount - 1);
    buckets[idx].push(n);
  }

  const result: number[] = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    result.push(...bucket);
  }

  return result;
}
