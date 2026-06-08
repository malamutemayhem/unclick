export interface WeightedItem<T> {
  item: T;
  weight: number;
}

export function weightedRandom<T>(items: WeightedItem<T>[]): T | undefined {
  if (items.length === 0) return undefined;
  const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
  let random = Math.random() * totalWeight;
  for (const { item, weight } of items) {
    random -= weight;
    if (random <= 0) return item;
  }
  return items[items.length - 1].item;
}

export function weightedSample<T>(items: WeightedItem<T>[], count: number): T[] {
  const result: T[] = [];
  const remaining = items.map((i) => ({ ...i }));
  for (let i = 0; i < count && remaining.length > 0; i++) {
    const totalWeight = remaining.reduce((sum, r) => sum + r.weight, 0);
    let random = Math.random() * totalWeight;
    for (let j = 0; j < remaining.length; j++) {
      random -= remaining[j].weight;
      if (random <= 0) {
        result.push(remaining[j].item);
        remaining.splice(j, 1);
        break;
      }
    }
  }
  return result;
}

export function normalizeWeights<T>(items: WeightedItem<T>[]): WeightedItem<T>[] {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  if (total === 0) return items.map((i) => ({ ...i, weight: 0 }));
  return items.map((i) => ({ item: i.item, weight: i.weight / total }));
}

export function reservoirSample<T>(items: T[], k: number): T[] {
  if (k >= items.length) return [...items];
  const reservoir = items.slice(0, k);
  for (let i = k; i < items.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j < k) reservoir[j] = items[i];
  }
  return reservoir;
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
