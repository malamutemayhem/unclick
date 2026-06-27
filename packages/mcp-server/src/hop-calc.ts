export type HopUse = "bittering" | "flavor" | "aroma" | "dry_hop" | "first_wort";

export function ibuContribution(alphaAcidPercent: number, weightG: number, volumeL: number, boilMinutes: number): number {
  if (volumeL <= 0) return 0;
  const utilization = 1.65 * Math.pow(0.000125, 0.004 * 12) * (1 - Math.exp(-0.04 * boilMinutes)) / 4.15;
  return parseFloat((alphaAcidPercent * weightG * utilization * 10 / volumeL).toFixed(1));
}

export function boilTimeMinutes(use: HopUse): number {
  const times: Record<HopUse, number> = {
    bittering: 60, flavor: 15, aroma: 5, dry_hop: 0, first_wort: 60,
  };
  return times[use];
}

export function dryHopDays(intensity: "light" | "medium" | "heavy"): number {
  const days: Record<string, number> = { light: 3, medium: 5, heavy: 7 };
  return days[intensity];
}

export function storageLifeMonths(form: "whole" | "pellet" | "extract"): number {
  const months: Record<string, number> = { whole: 6, pellet: 12, extract: 24 };
  return months[form];
}

export function alphaAcidDecayPercent(monthsStored: number, temperatureC: number): number {
  const decayRate = 0.02 * (1 + temperatureC / 20);
  return parseFloat(Math.min(100, monthsStored * decayRate * 100).toFixed(1));
}

export function hopStandMinutes(use: HopUse): number {
  const mins: Record<HopUse, number> = {
    bittering: 0, flavor: 20, aroma: 30, dry_hop: 0, first_wort: 0,
  };
  return mins[use];
}

export function aromaOilMlPer100g(variety: "noble" | "american" | "english"): number {
  const oils: Record<string, number> = { noble: 1.0, american: 2.5, english: 0.8 };
  return oils[variety];
}

export function pelletEquivalentG(wholeHopG: number): number {
  return parseFloat((wholeHopG * 0.9).toFixed(1));
}

export function trubLossLiters(hopWeightG: number): number {
  return parseFloat((hopWeightG * 0.01).toFixed(2));
}

export function hopUses(): HopUse[] {
  return ["bittering", "flavor", "aroma", "dry_hop", "first_wort"];
}
