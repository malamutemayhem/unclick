export type FlourType = "bread" | "whole_wheat" | "rye" | "spelt" | "einkorn" | "ap";

export function starterRatio(flourG: number, waterG: number): string {
  const ratio = flourG / waterG;
  if (ratio > 1.2) return "stiff";
  if (ratio > 0.8) return "standard";
  return "liquid";
}

export function starterFeedAmount(starterG: number, ratio: number = 1): { flour: number; water: number } {
  return {
    flour: Math.round(starterG * ratio),
    water: Math.round(starterG * ratio),
  };
}

export function levainAmount(totalFlourG: number, percentage: number = 20): number {
  return Math.round(totalFlourG * percentage / 100);
}

export function hydration(waterG: number, flourG: number): number {
  return parseFloat((waterG / flourG * 100).toFixed(1));
}

export function totalDoughWeight(flourG: number, waterG: number, saltG: number, levainG: number): number {
  return flourG + waterG + saltG + levainG;
}

export function saltAmount(flourG: number, percentage: number = 2): number {
  return parseFloat((flourG * percentage / 100).toFixed(0));
}

export function bulkFermentHours(tempC: number): number {
  if (tempC >= 28) return 3;
  if (tempC >= 24) return 4;
  if (tempC >= 21) return 5;
  if (tempC >= 18) return 7;
  return 10;
}

export function proofHours(tempC: number, retard: boolean): number {
  if (retard) return 12;
  if (tempC >= 24) return 2;
  if (tempC >= 21) return 3;
  return 4;
}

export function foldInterval(tempC: number): number {
  return tempC >= 24 ? 30 : 45;
}

export function foldCount(hydrationPercent: number): number {
  if (hydrationPercent >= 80) return 4;
  if (hydrationPercent >= 70) return 3;
  return 2;
}

export function ovenTempC(flourType: FlourType): number {
  const temps: Record<FlourType, number> = {
    bread: 250, whole_wheat: 240, rye: 230, spelt: 240, einkorn: 230, ap: 245,
  };
  return temps[flourType];
}

export function bakeMinutes(loafWeightG: number): number {
  if (loafWeightG < 500) return 30;
  if (loafWeightG < 800) return 40;
  return 50;
}

export function steamDuration(): number {
  return 20;
}

export function internalTemp(): number {
  return 96;
}

export function flourTypes(): FlourType[] {
  return ["bread", "whole_wheat", "rye", "spelt", "einkorn", "ap"];
}
