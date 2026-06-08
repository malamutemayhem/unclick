export function chunk<T>(arr: T[], size: number): T[][] {
  if (size < 1) throw new Error("Chunk size must be at least 1");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function unique<T>(arr: T[], keyFn?: (item: T) => any): T[] {
  if (!keyFn) return [...new Set(arr)];
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function groupBy<T, K extends string | number>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of arr) {
    const key = keyFn(item);
    (result[key] ??= []).push(item);
  }
  return result;
}

export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  const len = Math.min(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < len; i++) result.push([a[i], b[i]]);
  return result;
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, cur) => acc.concat(cur), []);
}

export function partition<T>(arr: T[], pred: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of arr) (pred(item) ? pass : fail).push(item);
  return [pass, fail];
}

export function rotate<T>(arr: T[], n: number): T[] {
  if (arr.length === 0) return [];
  const offset = ((n % arr.length) + arr.length) % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

export function intersection<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => set.has(item));
}

export function difference<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => !set.has(item));
}
