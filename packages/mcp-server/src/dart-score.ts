export type DartRegion = "single" | "double" | "triple" | "outer_bull" | "inner_bull";
export type GameType = "501" | "301" | "cricket" | "around_the_clock" | "killer";

export function regionScore(number: number, region: DartRegion): number {
  if (region === "inner_bull") return 50;
  if (region === "outer_bull") return 25;
  if (region === "double") return number * 2;
  if (region === "triple") return number * 3;
  return number;
}

export function maxScore(): number {
  return 180;
}

export function averagePerDart(totalScore: number, dartsThrown: number): number {
  if (dartsThrown === 0) return 0;
  return parseFloat((totalScore / dartsThrown).toFixed(2));
}

export function averagePerVisit(totalScore: number, visits: number): number {
  if (visits === 0) return 0;
  return parseFloat((totalScore / visits).toFixed(1));
}

export function checkoutDouble(remaining: number): number | null {
  if (remaining < 2 || remaining > 40 || remaining % 2 !== 0) return null;
  return remaining / 2;
}

export function isCheckout(remaining: number): boolean {
  return remaining >= 2 && remaining <= 170 && remaining !== 169 && remaining !== 168 && remaining !== 166 && remaining !== 165 && remaining !== 163 && remaining !== 162 && remaining !== 159;
}

export function dartsForCheckout(remaining: number): number {
  if (remaining <= 40 && remaining % 2 === 0) return 1;
  if (remaining <= 60) return 2;
  if (remaining <= 170) return 3;
  return 0;
}

export function cricketMarks(region: DartRegion): number {
  if (region === "triple") return 3;
  if (region === "double") return 2;
  return 1;
}

export function legsToWin(format: "best_of" | "first_to", count: number): number {
  if (format === "first_to") return count;
  return Math.ceil(count / 2);
}

export function setsToWin(bestOfSets: number): number {
  return Math.ceil(bestOfSets / 2);
}

export function throwDistance(): number {
  return 2.37;
}

export function boardHeight(): number {
  return 1.73;
}

export function ratingFromAvg(averageScore: number): string {
  if (averageScore >= 100) return "professional";
  if (averageScore >= 70) return "advanced";
  if (averageScore >= 50) return "intermediate";
  if (averageScore >= 30) return "beginner";
  return "novice";
}

export function gameTypes(): GameType[] {
  return ["501", "301", "cricket", "around_the_clock", "killer"];
}
