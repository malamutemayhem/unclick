export type FatSource = "beef_suet" | "lamb_fat" | "pork_lard" | "duck_fat" | "bear_fat";

export function renderYieldPercent(source: FatSource): number {
  const yields: Record<FatSource, number> = {
    beef_suet: 85, lamb_fat: 75, pork_lard: 90, duck_fat: 80, bear_fat: 88,
  };
  return yields[source];
}

export function meltingPointCelsius(source: FatSource): number {
  const temps: Record<FatSource, number> = {
    beef_suet: 45, lamb_fat: 42, pork_lard: 36, duck_fat: 35, bear_fat: 32,
  };
  return temps[source];
}

export function renderTempCelsius(source: FatSource): number {
  const temps: Record<FatSource, number> = {
    beef_suet: 120, lamb_fat: 115, pork_lard: 110, duck_fat: 105, bear_fat: 100,
  };
  return temps[source];
}

export function renderTimeHoursPerKg(source: FatSource): number {
  const hours: Record<FatSource, number> = {
    beef_suet: 4, lamb_fat: 3.5, pork_lard: 3, duck_fat: 2, bear_fat: 3,
  };
  return hours[source];
}

export function filteringPasses(): number {
  return 2;
}

export function shelfLifeMonths(source: FatSource): number {
  const months: Record<FatSource, number> = {
    beef_suet: 12, lamb_fat: 8, pork_lard: 6, duck_fat: 6, bear_fat: 10,
  };
  return months[source];
}

export function scentStrength(source: FatSource): number {
  const scent: Record<FatSource, number> = {
    beef_suet: 3, lamb_fat: 4, pork_lard: 2, duck_fat: 3, bear_fat: 2,
  };
  return scent[source];
}

export function candleQuality(source: FatSource): number {
  const quality: Record<FatSource, number> = {
    beef_suet: 5, lamb_fat: 4, pork_lard: 2, duck_fat: 1, bear_fat: 3,
  };
  return quality[source];
}

export function costPerKg(source: FatSource): number {
  const costs: Record<FatSource, number> = {
    beef_suet: 3, lamb_fat: 4, pork_lard: 2, duck_fat: 8, bear_fat: 15,
  };
  return costs[source];
}

export function fatSources(): FatSource[] {
  return ["beef_suet", "lamb_fat", "pork_lard", "duck_fat", "bear_fat"];
}
