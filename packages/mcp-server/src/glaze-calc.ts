export type GlazeFinish = "matte" | "satin" | "glossy" | "crystalline" | "ash";

export function batchWeightG(coverageAreaCm2: number, thicknessMm: number): number {
  return parseFloat((coverageAreaCm2 * thicknessMm * 0.003).toFixed(1));
}

export function waterMl(dryWeightG: number): number {
  return parseFloat((dryWeightG * 0.5).toFixed(1));
}

export function specificGravity(finish: GlazeFinish): number {
  const sg: Record<GlazeFinish, number> = {
    matte: 1.40, satin: 1.45, glossy: 1.50, crystalline: 1.55, ash: 1.35,
  };
  return sg[finish];
}

export function firingTemperatureCelsius(finish: GlazeFinish): number {
  const temps: Record<GlazeFinish, number> = {
    matte: 1220, satin: 1240, glossy: 1260, crystalline: 1280, ash: 1300,
  };
  return temps[finish];
}

export function applicationCoats(finish: GlazeFinish): number {
  const coats: Record<GlazeFinish, number> = {
    matte: 2, satin: 2, glossy: 3, crystalline: 1, ash: 2,
  };
  return coats[finish];
}

export function dryingTimeHours(coats: number): number {
  return coats * 4;
}

export function shrinkagePercent(finish: GlazeFinish): number {
  const shrinkage: Record<GlazeFinish, number> = {
    matte: 10, satin: 11, glossy: 12, crystalline: 8, ash: 14,
  };
  return shrinkage[finish];
}

export function crazingRisk(finish: GlazeFinish): number {
  const risk: Record<GlazeFinish, number> = {
    matte: 2, satin: 3, glossy: 5, crystalline: 7, ash: 4,
  };
  return risk[finish];
}

export function foodSafe(finish: GlazeFinish, leadFree: boolean): boolean {
  return leadFree && finish !== "crystalline";
}

export function costPerKg(finish: GlazeFinish, baseCost: number): number {
  const multipliers: Record<GlazeFinish, number> = {
    matte: 1.0, satin: 1.2, glossy: 1.5, crystalline: 3.0, ash: 0.5,
  };
  return parseFloat((baseCost * multipliers[finish]).toFixed(2));
}

export function glazeFinishes(): GlazeFinish[] {
  return ["matte", "satin", "glossy", "crystalline", "ash"];
}
