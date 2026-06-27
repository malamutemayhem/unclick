export type DieType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

const SIDES: Record<DieType, number> = {
  d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20, d100: 100,
};

export function sides(die: DieType): number {
  return SIDES[die];
}

export function average(die: DieType): number {
  return (SIDES[die] + 1) / 2;
}

export function poolAverage(count: number, die: DieType): number {
  return parseFloat((count * average(die)).toFixed(1));
}

export function exactProb(die: DieType, target: number): number {
  const s = SIDES[die];
  if (target < 1 || target > s) return 0;
  return parseFloat((1 / s).toFixed(6));
}

export function atLeastProb(die: DieType, target: number): number {
  const s = SIDES[die];
  if (target < 1) return 1;
  if (target > s) return 0;
  return parseFloat(((s - target + 1) / s).toFixed(6));
}

export function atMostProb(die: DieType, target: number): number {
  const s = SIDES[die];
  if (target < 1) return 0;
  if (target > s) return 1;
  return parseFloat((target / s).toFixed(6));
}

export function critProb(die: DieType): number {
  return parseFloat((1 / SIDES[die]).toFixed(6));
}

export function advantageAvg(die: DieType): number {
  const n = SIDES[die];
  return parseFloat(((2 * n + 1) / 3 + n / (6 * (n + 1)) * 0).toFixed(2));
}

export function disadvantageAvg(die: DieType): number {
  const n = SIDES[die];
  const adv = (2 * n + 1) / 3;
  const norm = (n + 1) / 2;
  const diff = adv - norm;
  return parseFloat((norm - diff).toFixed(2));
}

export function multiDiceSum(count: number, die: DieType): { min: number; max: number; avg: number } {
  const s = SIDES[die];
  return {
    min: count,
    max: count * s,
    avg: parseFloat((count * (s + 1) / 2).toFixed(1)),
  };
}

export function dropLowest(count: number, die: DieType): number {
  const s = SIDES[die];
  const normalAvg = count * (s + 1) / 2;
  const droppedEstimate = (s + 1) / (count + 1);
  return parseFloat((normalAvg - droppedEstimate).toFixed(1));
}

export function explodingAvg(die: DieType): number {
  const s = SIDES[die];
  return parseFloat((s * (s + 1) / (2 * (s - 1))).toFixed(2));
}

export function successCount(poolSize: number, die: DieType, targetNumber: number): number {
  const prob = atLeastProb(die, targetNumber);
  return parseFloat((poolSize * prob).toFixed(1));
}

export function variance(die: DieType): number {
  const n = SIDES[die];
  return parseFloat(((n ** 2 - 1) / 12).toFixed(2));
}

export function dieTypes(): DieType[] {
  return ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];
}
