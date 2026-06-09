export type WheelType = "european" | "american" | "french";
export type BetType = "straight" | "split" | "street" | "corner" | "line" | "dozen" | "column" | "red_black" | "odd_even" | "high_low";

export function pockets(wheel: WheelType): number {
  const p: Record<WheelType, number> = { european: 37, american: 38, french: 37 };
  return p[wheel];
}

export function houseEdge(wheel: WheelType): number {
  const edges: Record<WheelType, number> = { european: 2.7, american: 5.26, french: 1.35 };
  return edges[wheel];
}

export function payout(bet: BetType): number {
  const payouts: Record<BetType, number> = {
    straight: 35, split: 17, street: 11, corner: 8, line: 5,
    dozen: 2, column: 2, red_black: 1, odd_even: 1, high_low: 1,
  };
  return payouts[bet];
}

export function probability(bet: BetType, wheel: WheelType): number {
  const spots: Record<BetType, number> = {
    straight: 1, split: 2, street: 3, corner: 4, line: 6,
    dozen: 12, column: 12, red_black: 18, odd_even: 18, high_low: 18,
  };
  return parseFloat((spots[bet] / pockets(wheel) * 100).toFixed(2));
}

export function expectedValue(betAmount: number, bet: BetType, wheel: WheelType): number {
  const prob = probability(bet, wheel) / 100;
  const pay = payout(bet);
  return parseFloat((betAmount * (prob * pay - (1 - prob))).toFixed(2));
}

export function kellyFraction(probability: number, odds: number): number {
  const p = probability / 100;
  const q = 1 - p;
  const fraction = (p * odds - q) / odds;
  return parseFloat(Math.max(0, fraction).toFixed(4));
}

export function spinsPerHour(dealerSpeed: "slow" | "normal" | "fast"): number {
  const spins: Record<string, number> = { slow: 25, normal: 35, fast: 50 };
  return spins[dealerSpeed];
}

export function expectedLoss(betAmount: number, spins: number, edgePct: number): number {
  return parseFloat((betAmount * spins * edgePct / 100).toFixed(2));
}

export function isRed(number: number): boolean {
  const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return reds.includes(number);
}

export function hotNumbers(spins: number[], count: number = 5): number[] {
  const freq = new Map<number, number>();
  for (const n of spins) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, count).map(e => e[0]);
}

export function wheelTypes(): WheelType[] {
  return ["european", "american", "french"];
}
