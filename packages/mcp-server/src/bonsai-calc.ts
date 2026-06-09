export type BonsaiStyle = "formal_upright" | "informal_upright" | "slanting" | "cascade" | "semi_cascade" | "windswept";
export type TreeSpecies = "juniper" | "maple" | "pine" | "ficus" | "elm" | "azalea";

export function potSize(trunkDiameterCm: number): { widthCm: number; depthCm: number; heightCm: number } {
  return {
    widthCm: parseFloat((trunkDiameterCm * 6).toFixed(0)),
    depthCm: parseFloat((trunkDiameterCm * 4).toFixed(0)),
    heightCm: parseFloat((trunkDiameterCm * 1.5).toFixed(0)),
  };
}

export function soilMix(species: TreeSpecies): { akadama: number; pumice: number; lavaRock: number } {
  if (species === "pine" || species === "juniper") {
    return { akadama: 33, pumice: 33, lavaRock: 34 };
  }
  return { akadama: 50, pumice: 25, lavaRock: 25 };
}

export function wateringFrequency(species: TreeSpecies, season: "spring" | "summer" | "autumn" | "winter"): string {
  if (season === "winter") return "every 3-4 days";
  if (season === "summer") return "daily";
  return "every 1-2 days";
}

export function fertilizingSchedule(species: TreeSpecies): { weeksInterval: number; monthsActive: number } {
  if (species === "azalea") return { weeksInterval: 4, monthsActive: 8 };
  return { weeksInterval: 2, monthsActive: 9 };
}

export function pruningMonth(species: TreeSpecies): number[] {
  const months: Record<TreeSpecies, number[]> = {
    juniper: [3, 4, 9],
    maple: [2, 3, 6],
    pine: [4, 5, 10],
    ficus: [3, 4, 5, 6, 7, 8, 9],
    elm: [2, 3, 6],
    azalea: [5, 6],
  };
  return months[species];
}

export function repottingInterval(species: TreeSpecies, ageYears: number): number {
  if (ageYears < 5) return 1;
  if (species === "pine" || species === "juniper") return 5;
  return 2;
}

export function wireSize(branchDiameterMm: number): number {
  return parseFloat((branchDiameterMm * 0.33).toFixed(1));
}

export function wireLength(branchLengthCm: number): number {
  return parseFloat((branchLengthCm * 1.5).toFixed(0));
}

export function wireRemovalWeeks(species: TreeSpecies): number {
  if (species === "ficus") return 4;
  if (species === "maple" || species === "elm") return 6;
  return 12;
}

export function treeHeight(style: BonsaiStyle, potWidthCm: number): number {
  const ratio: Record<BonsaiStyle, number> = {
    formal_upright: 1.5,
    informal_upright: 1.3,
    slanting: 1.2,
    cascade: 0.8,
    semi_cascade: 1.0,
    windswept: 1.1,
  };
  return parseFloat((potWidthCm * ratio[style]).toFixed(0));
}

export function sunlightHours(species: TreeSpecies): number {
  const hours: Record<TreeSpecies, number> = {
    juniper: 6, maple: 5, pine: 6, ficus: 4, elm: 5, azalea: 4,
  };
  return hours[species];
}

export function winterProtection(species: TreeSpecies): boolean {
  return species !== "ficus";
}

export function maturityYears(species: TreeSpecies): number {
  const years: Record<TreeSpecies, number> = {
    juniper: 5, maple: 7, pine: 10, ficus: 3, elm: 5, azalea: 5,
  };
  return years[species];
}

export function bonsaiStyles(): BonsaiStyle[] {
  return ["formal_upright", "informal_upright", "slanting", "cascade", "semi_cascade", "windswept"];
}
