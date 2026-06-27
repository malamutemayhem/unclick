export interface DiceResult {
  min: number;
  max: number;
  expected: number;
  variance: number;
  distribution: Map<number, number>;
}

export interface RollResult {
  rolls: number[];
  total: number;
  kept: number[];
}

export function singleDie(sides: number): DiceResult {
  const distribution = new Map<number, number>();
  const prob = 1 / sides;
  for (let i = 1; i <= sides; i++) {
    distribution.set(i, prob);
  }
  const expected = (sides + 1) / 2;
  const variance = (sides * sides - 1) / 12;
  return { min: 1, max: sides, expected, variance, distribution };
}

export function multipleDice(count: number, sides: number): DiceResult {
  let dist = new Map<number, number>();
  dist.set(0, 1);
  for (let d = 0; d < count; d++) {
    const next = new Map<number, number>();
    for (const [sum, prob] of dist) {
      for (let face = 1; face <= sides; face++) {
        const key = sum + face;
        next.set(key, (next.get(key) ?? 0) + prob / sides);
      }
    }
    dist = next;
  }
  const min = count;
  const max = count * sides;
  const expected = count * (sides + 1) / 2;
  const variance = count * (sides * sides - 1) / 12;
  return { min, max, expected, variance, distribution: dist };
}

export function probAtLeast(result: DiceResult, target: number): number {
  let total = 0;
  for (const [val, prob] of result.distribution) {
    if (val >= target) total += prob;
  }
  return total;
}

export function probAtMost(result: DiceResult, target: number): number {
  let total = 0;
  for (const [val, prob] of result.distribution) {
    if (val <= target) total += prob;
  }
  return total;
}

export function probExact(result: DiceResult, target: number): number {
  return result.distribution.get(target) ?? 0;
}

export function probBetween(result: DiceResult, lo: number, hi: number): number {
  let total = 0;
  for (const [val, prob] of result.distribution) {
    if (val >= lo && val <= hi) total += prob;
  }
  return total;
}

export function advantageD20(): DiceResult {
  const dist = new Map<number, number>();
  for (let i = 1; i <= 20; i++) {
    const prob = (2 * i - 1) / 400;
    dist.set(i, prob);
  }
  let expected = 0;
  for (const [val, prob] of dist) {
    expected += val * prob;
  }
  let variance = 0;
  for (const [val, prob] of dist) {
    variance += (val - expected) * (val - expected) * prob;
  }
  return { min: 1, max: 20, expected, variance, distribution: dist };
}

export function disadvantageD20(): DiceResult {
  const dist = new Map<number, number>();
  for (let i = 1; i <= 20; i++) {
    const prob = (2 * (20 - i) + 1) / 400;
    dist.set(i, prob);
  }
  let expected = 0;
  for (const [val, prob] of dist) {
    expected += val * prob;
  }
  let variance = 0;
  for (const [val, prob] of dist) {
    variance += (val - expected) * (val - expected) * prob;
  }
  return { min: 1, max: 20, expected, variance, distribution: dist };
}

export function dropLowest(count: number, sides: number, drop: number): DiceResult {
  const keep = count - drop;
  const combos = Math.pow(sides, count);
  const dist = new Map<number, number>();

  function generate(rolls: number[], depth: number): void {
    if (depth === count) {
      const sorted = [...rolls].sort((a, b) => b - a);
      const kept = sorted.slice(0, keep);
      const sum = kept.reduce((a, b) => a + b, 0);
      dist.set(sum, (dist.get(sum) ?? 0) + 1 / combos);
      return;
    }
    for (let face = 1; face <= sides; face++) {
      rolls.push(face);
      generate(rolls, depth + 1);
      rolls.pop();
    }
  }

  if (count <= 5 && sides <= 8) {
    generate([], 0);
  } else {
    const simple = multipleDice(keep, sides);
    return simple;
  }

  let expected = 0;
  let min = keep;
  let max = keep * sides;
  for (const [val, prob] of dist) {
    expected += val * prob;
  }
  let variance = 0;
  for (const [val, prob] of dist) {
    variance += (val - expected) * (val - expected) * prob;
  }
  return { min, max, expected, variance, distribution: dist };
}

export function explodingDice(sides: number, maxDepth = 3): DiceResult {
  const dist = new Map<number, number>();
  const base = 1 / sides;

  function expand(total: number, prob: number, depth: number): void {
    for (let face = 1; face <= sides; face++) {
      const p = prob * base;
      if (face === sides && depth < maxDepth) {
        expand(total + face, p, depth + 1);
      } else {
        const sum = total + face;
        dist.set(sum, (dist.get(sum) ?? 0) + p);
      }
    }
  }

  expand(0, 1, 1);

  let expected = 0;
  let max = 0;
  for (const [val, prob] of dist) {
    expected += val * prob;
    if (val > max) max = val;
  }
  let variance = 0;
  for (const [val, prob] of dist) {
    variance += (val - expected) * (val - expected) * prob;
  }
  return { min: 1, max, expected, variance, distribution: dist };
}

export function successCount(count: number, sides: number, threshold: number): DiceResult {
  const pSuccess = (sides - threshold + 1) / sides;
  const pFail = 1 - pSuccess;
  const dist = new Map<number, number>();
  for (let k = 0; k <= count; k++) {
    const prob = binomial(count, k) * Math.pow(pSuccess, k) * Math.pow(pFail, count - k);
    dist.set(k, prob);
  }
  const expected = count * pSuccess;
  const variance = count * pSuccess * pFail;
  return { min: 0, max: count, expected, variance, distribution: dist };
}

function binomial(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
}

export function parseDiceNotation(notation: string): { count: number; sides: number; modifier: number } {
  const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) return { count: 1, sides: 6, modifier: 0 };
  return {
    count: parseInt(match[1], 10),
    sides: parseInt(match[2], 10),
    modifier: match[3] ? parseInt(match[3], 10) : 0,
  };
}

export function diceExpected(notation: string): number {
  const { count, sides, modifier } = parseDiceNotation(notation);
  return count * (sides + 1) / 2 + modifier;
}

export function mode(result: DiceResult): number[] {
  let maxProb = 0;
  for (const [, prob] of result.distribution) {
    if (prob > maxProb) maxProb = prob;
  }
  const modes: number[] = [];
  for (const [val, prob] of result.distribution) {
    if (Math.abs(prob - maxProb) < 1e-12) modes.push(val);
  }
  return modes.sort((a, b) => a - b);
}

export function standardDeviation(result: DiceResult): number {
  return Math.sqrt(result.variance);
}
