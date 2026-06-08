export function* permutations<T>(items: T[]): Generator<T[]> {
  if (items.length <= 1) {
    yield [...items];
    return;
  }
  for (let i = 0; i < items.length; i++) {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)];
    for (const perm of permutations(rest)) {
      yield [items[i], ...perm];
    }
  }
}

export function* combinations<T>(items: T[], k: number): Generator<T[]> {
  if (k === 0) {
    yield [];
    return;
  }
  if (k > items.length) return;
  for (let i = 0; i <= items.length - k; i++) {
    for (const combo of combinations(items.slice(i + 1), k - 1)) {
      yield [items[i], ...combo];
    }
  }
}

export function* powerSet<T>(items: T[]): Generator<T[]> {
  const n = items.length;
  const total = 1 << n;
  for (let mask = 0; mask < total; mask++) {
    const subset: T[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(items[i]);
    }
    yield subset;
  }
}

export function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function countPermutations(n: number, r?: number): number {
  const take = r ?? n;
  return factorial(n) / factorial(n - take);
}

export function countCombinations(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function collect<T>(gen: Generator<T[]>): T[][] {
  return [...gen];
}
