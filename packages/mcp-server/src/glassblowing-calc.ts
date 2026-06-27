export type GlassType = "soda_lime" | "lead" | "borosilicate" | "potash" | "forest";

export function gatherWeightG(finishedDiameterCm: number): number {
  return parseFloat((finishedDiameterCm ** 3 * 0.012).toFixed(1));
}

export function workingTemperatureCelsius(glass: GlassType): number {
  const temps: Record<GlassType, number> = {
    soda_lime: 1050, lead: 900, borosilicate: 1250, potash: 1000, forest: 1100,
  };
  return temps[glass];
}

export function annealingTemperatureCelsius(glass: GlassType): number {
  const temps: Record<GlassType, number> = {
    soda_lime: 500, lead: 430, borosilicate: 560, potash: 480, forest: 520,
  };
  return temps[glass];
}

export function annealingHours(thicknessMm: number): number {
  return parseFloat((thicknessMm * 0.5 + 2).toFixed(1));
}

export function blowpipeLengthCm(gatherWeightG: number): number {
  return parseFloat((100 + gatherWeightG * 0.1).toFixed(1));
}

export function marveredThicknessMm(gatherWeightG: number, diameterCm: number): number {
  if (diameterCm <= 0) return 0;
  const surfaceArea = Math.PI * diameterCm * diameterCm;
  return parseFloat((gatherWeightG / (surfaceArea * 0.025)).toFixed(1));
}

export function colorantPercent(glass: GlassType): number {
  const percents: Record<GlassType, number> = {
    soda_lime: 3, lead: 2, borosilicate: 1, potash: 4, forest: 5,
  };
  return percents[glass];
}

export function reheatingCycles(complexity: "simple" | "moderate" | "complex"): number {
  const cycles: Record<string, number> = {
    simple: 3, moderate: 8, complex: 15,
  };
  return cycles[complexity];
}

export function thermalShockResistance(glass: GlassType): number {
  const ratings: Record<GlassType, number> = {
    soda_lime: 5, lead: 3, borosilicate: 9, potash: 4, forest: 4,
  };
  return ratings[glass];
}

export function materialCostPerKg(glass: GlassType, baseCost: number): number {
  const multipliers: Record<GlassType, number> = {
    soda_lime: 1.0, lead: 2.5, borosilicate: 1.8, potash: 1.2, forest: 0.8,
  };
  return parseFloat((baseCost * multipliers[glass]).toFixed(2));
}

export function glassTypes(): GlassType[] {
  return ["soda_lime", "lead", "borosilicate", "potash", "forest"];
}
