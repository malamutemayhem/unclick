export type TapestryTechnique = "gobelin" | "aubusson" | "kilim" | "soumak" | "navajo";

export function warpSett(technique: TapestryTechnique): number {
  const sett: Record<TapestryTechnique, number> = {
    gobelin: 8, aubusson: 10, kilim: 6, soumak: 7, navajo: 5,
  };
  return sett[technique];
}

export function weftPackingPpi(technique: TapestryTechnique): number {
  const ppi: Record<TapestryTechnique, number> = {
    gobelin: 20, aubusson: 24, kilim: 16, soumak: 18, navajo: 12,
  };
  return ppi[technique];
}

export function colorAreaPercent(colors: number): number {
  if (colors <= 0) return 0;
  return parseFloat((100 / colors).toFixed(1));
}

export function bobbinCount(colors: number): number {
  return Math.max(1, colors);
}

export function weavingHoursPerM2(technique: TapestryTechnique): number {
  const hours: Record<TapestryTechnique, number> = {
    gobelin: 200, aubusson: 250, kilim: 80, soumak: 120, navajo: 100,
  };
  return hours[technique];
}

export function warpTensionKg(technique: TapestryTechnique): number {
  const tension: Record<TapestryTechnique, number> = {
    gobelin: 3, aubusson: 2.5, kilim: 4, soumak: 3.5, navajo: 5,
  };
  return tension[technique];
}

export function finishedWeightKgPerM2(technique: TapestryTechnique): number {
  const weight: Record<TapestryTechnique, number> = {
    gobelin: 3.5, aubusson: 3, kilim: 2, soumak: 2.5, navajo: 4,
  };
  return weight[technique];
}

export function cartoonRequired(technique: TapestryTechnique): boolean {
  return technique === "gobelin" || technique === "aubusson";
}

export function costPerM2(technique: TapestryTechnique): number {
  const costs: Record<TapestryTechnique, number> = {
    gobelin: 5000, aubusson: 6000, kilim: 800, soumak: 1500, navajo: 2000,
  };
  return costs[technique];
}

export function tapestryTechniques(): TapestryTechnique[] {
  return ["gobelin", "aubusson", "kilim", "soumak", "navajo"];
}
