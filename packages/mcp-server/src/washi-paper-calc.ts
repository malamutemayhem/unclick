export type WashiFiber = "kozo" | "mitsumata" | "gampi" | "hemp" | "bamboo";

export function fiberLengthMm(fiber: WashiFiber): number {
  const lengths: Record<WashiFiber, number> = {
    kozo: 12, mitsumata: 5, gampi: 4, hemp: 8, bamboo: 3,
  };
  return lengths[fiber];
}

export function cookingTimeHours(fiber: WashiFiber): number {
  const hours: Record<WashiFiber, number> = {
    kozo: 3, mitsumata: 2, gampi: 1.5, hemp: 4, bamboo: 5,
  };
  return hours[fiber];
}

export function beatingMinutes(fiber: WashiFiber): number {
  const mins: Record<WashiFiber, number> = {
    kozo: 30, mitsumata: 20, gampi: 15, hemp: 45, bamboo: 40,
  };
  return mins[fiber];
}

export function sheetThicknessMm(layers: number): number {
  return Math.round(layers * 0.08 * 100) / 100;
}

export function tensileStrength(fiber: WashiFiber): number {
  const strength: Record<WashiFiber, number> = {
    kozo: 5, mitsumata: 3, gampi: 4, hemp: 5, bamboo: 2,
  };
  return strength[fiber];
}

export function translucency(fiber: WashiFiber): number {
  const trans: Record<WashiFiber, number> = {
    kozo: 3, mitsumata: 4, gampi: 5, hemp: 2, bamboo: 2,
  };
  return trans[fiber];
}

export function archivalLifeYears(fiber: WashiFiber): number {
  const years: Record<WashiFiber, number> = {
    kozo: 1000, mitsumata: 800, gampi: 1000, hemp: 500, bamboo: 300,
  };
  return years[fiber];
}

export function dryingTimeHours(fiber: WashiFiber): number {
  const hours: Record<WashiFiber, number> = {
    kozo: 8, mitsumata: 6, gampi: 5, hemp: 10, bamboo: 7,
  };
  return hours[fiber];
}

export function costPerSheet(fiber: WashiFiber): number {
  const costs: Record<WashiFiber, number> = {
    kozo: 3, mitsumata: 5, gampi: 8, hemp: 2, bamboo: 1.5,
  };
  return costs[fiber];
}

export function washiFibers(): WashiFiber[] {
  return ["kozo", "mitsumata", "gampi", "hemp", "bamboo"];
}
