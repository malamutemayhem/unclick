export type WaxGrade = "cosmetic" | "filtered" | "raw" | "pharmaceutical" | "art";

export function meltingPointCelsius(grade: WaxGrade): number {
  const temps: Record<WaxGrade, number> = {
    cosmetic: 63, filtered: 62, raw: 64, pharmaceutical: 62, art: 65,
  };
  return temps[grade];
}

export function filteringPasses(grade: WaxGrade): number {
  const passes: Record<WaxGrade, number> = {
    cosmetic: 3, filtered: 2, raw: 0, pharmaceutical: 5, art: 1,
  };
  return passes[grade];
}

export function yieldPercentFromComb(): number {
  return 85;
}

export function renderingTempCelsius(): number {
  return 70;
}

export function purityPercent(grade: WaxGrade): number {
  const purity: Record<WaxGrade, number> = {
    cosmetic: 98, filtered: 95, raw: 80, pharmaceutical: 99.5, art: 90,
  };
  return purity[grade];
}

export function shelfLifeYears(grade: WaxGrade): number {
  const years: Record<WaxGrade, number> = {
    cosmetic: 5, filtered: 3, raw: 10, pharmaceutical: 2, art: 10,
  };
  return years[grade];
}

export function colorRating(grade: WaxGrade): string {
  const colors: Record<WaxGrade, string> = {
    cosmetic: "white", filtered: "light_yellow", raw: "dark_yellow",
    pharmaceutical: "white", art: "yellow",
  };
  return colors[grade];
}

export function scentIntensity(grade: WaxGrade): number {
  const ratings: Record<WaxGrade, number> = {
    cosmetic: 2, filtered: 3, raw: 5, pharmaceutical: 1, art: 4,
  };
  return ratings[grade];
}

export function costPerKg(grade: WaxGrade): number {
  const costs: Record<WaxGrade, number> = {
    cosmetic: 25, filtered: 15, raw: 8, pharmaceutical: 40, art: 12,
  };
  return costs[grade];
}

export function waxGrades(): WaxGrade[] {
  return ["cosmetic", "filtered", "raw", "pharmaceutical", "art"];
}
