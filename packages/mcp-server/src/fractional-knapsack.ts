interface KnapsackItem {
  value: number;
  weight: number;
}

interface KnapsackResult {
  totalValue: number;
  totalWeight: number;
  fractions: number[];
}

export class FractionalKnapsack {
  static solve(items: KnapsackItem[], capacity: number): KnapsackResult {
    const indexed = items.map((item, i) => ({
      ...item,
      ratio: item.value / item.weight,
      index: i,
    }));
    indexed.sort((a, b) => b.ratio - a.ratio);

    const fractions = new Array(items.length).fill(0);
    let remaining = capacity;
    let totalValue = 0;
    let totalWeight = 0;

    for (const item of indexed) {
      if (remaining <= 0) break;
      const take = Math.min(item.weight, remaining);
      fractions[item.index] = take / item.weight;
      totalValue += (take / item.weight) * item.value;
      totalWeight += take;
      remaining -= take;
    }

    return { totalValue, totalWeight, fractions };
  }

  static density(items: KnapsackItem[]): { index: number; ratio: number }[] {
    return items
      .map((item, index) => ({ index, ratio: item.value / item.weight }))
      .sort((a, b) => b.ratio - a.ratio);
  }

  static upperBound(items: KnapsackItem[], capacity: number): number {
    return FractionalKnapsack.solve(items, capacity).totalValue;
  }
}
