export interface ArrayDiff<T> {
  added: T[];
  removed: T[];
  unchanged: T[];
}

export function diffArrays<T>(
  before: T[],
  after: T[],
  key?: (item: T) => unknown
): ArrayDiff<T> {
  const getKey = key ?? ((item: T) => item);
  const beforeKeys = new Set(before.map(getKey));
  const afterKeys = new Set(after.map(getKey));

  return {
    added: after.filter((item) => !beforeKeys.has(getKey(item))),
    removed: before.filter((item) => !afterKeys.has(getKey(item))),
    unchanged: after.filter((item) => beforeKeys.has(getKey(item))),
  };
}

export function intersection<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => set.has(item));
}

export function union<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])];
}

export function difference<T>(a: T[], b: T[]): T[] {
  const set = new Set(b);
  return a.filter((item) => !set.has(item));
}

export function symmetricDifference<T>(a: T[], b: T[]): T[] {
  const setA = new Set(a);
  const setB = new Set(b);
  return [
    ...a.filter((item) => !setB.has(item)),
    ...b.filter((item) => !setA.has(item)),
  ];
}
