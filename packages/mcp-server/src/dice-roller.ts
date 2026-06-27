export interface DiceResult {
  rolls: number[];
  total: number;
  min: number;
  max: number;
  average: number;
}

export class DiceRoller {
  static roll(sides: number, count = 1): DiceResult {
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return DiceRoller.summarize(rolls);
  }

  static parse(notation: string): DiceResult {
    const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) throw new Error("Invalid dice notation");
    const count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const modifier = match[3] ? parseInt(match[3], 10) : 0;
    const result = DiceRoller.roll(sides, count);
    if (modifier !== 0) {
      result.total += modifier;
    }
    return result;
  }

  static probability(sides: number, target: number, count = 1): number {
    if (count === 1) {
      if (target < 1 || target > sides) return 0;
      return Math.round((1 / sides) * 10000) / 10000;
    }
    const minSum = count;
    const maxSum = count * sides;
    if (target < minSum || target > maxSum) return 0;
    const ways = DiceRoller.countWays(count, sides, target);
    const total = Math.pow(sides, count);
    return Math.round((ways / total) * 10000) / 10000;
  }

  static expectedValue(sides: number, count = 1): number {
    return Math.round(count * (sides + 1) / 2 * 10000) / 10000;
  }

  static distribution(sides: number, count = 1): { value: number; probability: number }[] {
    const minSum = count;
    const maxSum = count * sides;
    const total = Math.pow(sides, count);
    const dist: { value: number; probability: number }[] = [];
    for (let v = minSum; v <= maxSum; v++) {
      const ways = DiceRoller.countWays(count, sides, v);
      dist.push({ value: v, probability: Math.round((ways / total) * 10000) / 10000 });
    }
    return dist;
  }

  static advantage(sides: number): DiceResult {
    const a = Math.floor(Math.random() * sides) + 1;
    const b = Math.floor(Math.random() * sides) + 1;
    const kept = Math.max(a, b);
    return { rolls: [a, b], total: kept, min: Math.min(a, b), max: kept, average: kept };
  }

  static disadvantage(sides: number): DiceResult {
    const a = Math.floor(Math.random() * sides) + 1;
    const b = Math.floor(Math.random() * sides) + 1;
    const kept = Math.min(a, b);
    return { rolls: [a, b], total: kept, min: kept, max: Math.max(a, b), average: kept };
  }

  static dropLowest(sides: number, count: number, drop = 1): DiceResult {
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    const sorted = [...rolls].sort((a, b) => a - b);
    const kept = sorted.slice(drop);
    const total = kept.reduce((s, v) => s + v, 0);
    return {
      rolls,
      total,
      min: Math.min(...kept),
      max: Math.max(...kept),
      average: Math.round((total / kept.length) * 10000) / 10000,
    };
  }

  static exploding(sides: number, count = 1): DiceResult {
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      let val = Math.floor(Math.random() * sides) + 1;
      rolls.push(val);
      while (val === sides) {
        val = Math.floor(Math.random() * sides) + 1;
        rolls.push(val);
      }
    }
    return DiceRoller.summarize(rolls);
  }

  private static summarize(rolls: number[]): DiceResult {
    const total = rolls.reduce((s, v) => s + v, 0);
    return {
      rolls,
      total,
      min: Math.min(...rolls),
      max: Math.max(...rolls),
      average: Math.round((total / rolls.length) * 10000) / 10000,
    };
  }

  private static countWays(dice: number, sides: number, target: number): number {
    let ways = 0;
    const maxK = Math.floor((target - dice) / sides);
    for (let k = 0; k <= Math.min(maxK, dice); k++) {
      const sign = k % 2 === 0 ? 1 : -1;
      const coeff = DiceRoller.choose(dice, k);
      const inner = DiceRoller.choose(target - k * sides - 1, dice - 1);
      ways += sign * coeff * inner;
    }
    return ways;
  }

  private static choose(n: number, k: number): number {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.round(result);
  }
}
