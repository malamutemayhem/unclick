export interface KnapsackItem {
  name: string;
  weight: number;
  value: number;
}

export interface KnapsackResult {
  items: KnapsackItem[];
  totalWeight: number;
  totalValue: number;
  efficiency: number;
}

export class KnapsackSolver {
  static solve(items: KnapsackItem[], capacity: number): KnapsackResult {
    const n = items.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value,
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    const selected: KnapsackItem[] = [];
    let w = capacity;
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }

    const totalWeight = selected.reduce((s, item) => s + item.weight, 0);
    const totalValue = selected.reduce((s, item) => s + item.value, 0);

    return {
      items: selected.reverse(),
      totalWeight,
      totalValue,
      efficiency: capacity === 0 ? 0 : Math.round((totalWeight / capacity) * 1000) / 10,
    };
  }

  static greedy(items: KnapsackItem[], capacity: number): KnapsackResult {
    const sorted = [...items]
      .map((item) => ({ ...item, ratio: item.value / item.weight }))
      .sort((a, b) => b.ratio - a.ratio);

    const selected: KnapsackItem[] = [];
    let remaining = capacity;

    for (const item of sorted) {
      if (item.weight <= remaining) {
        selected.push({ name: item.name, weight: item.weight, value: item.value });
        remaining -= item.weight;
      }
    }

    const totalWeight = selected.reduce((s, item) => s + item.weight, 0);
    const totalValue = selected.reduce((s, item) => s + item.value, 0);

    return {
      items: selected,
      totalWeight,
      totalValue,
      efficiency: capacity === 0 ? 0 : Math.round((totalWeight / capacity) * 1000) / 10,
    };
  }

  static fractional(items: KnapsackItem[], capacity: number): { totalValue: number; selections: Array<{ item: KnapsackItem; fraction: number }> } {
    const sorted = [...items]
      .map((item, idx) => ({ ...item, idx, ratio: item.value / item.weight }))
      .sort((a, b) => b.ratio - a.ratio);

    const selections: Array<{ item: KnapsackItem; fraction: number }> = [];
    let remaining = capacity;
    let totalValue = 0;

    for (const item of sorted) {
      if (remaining <= 0) break;
      const fraction = Math.min(1, remaining / item.weight);
      selections.push({
        item: { name: item.name, weight: item.weight, value: item.value },
        fraction: Math.round(fraction * 1000) / 1000,
      });
      totalValue += item.value * fraction;
      remaining -= item.weight * fraction;
    }

    return { totalValue: Math.round(totalValue * 100) / 100, selections };
  }

  static valuePerWeight(items: KnapsackItem[]): Array<{ name: string; ratio: number }> {
    return items
      .map((item) => ({
        name: item.name,
        ratio: item.weight === 0 ? Infinity : Math.round((item.value / item.weight) * 100) / 100,
      }))
      .sort((a, b) => b.ratio - a.ratio);
  }
}
