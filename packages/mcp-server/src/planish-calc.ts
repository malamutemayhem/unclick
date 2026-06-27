export type PlanishingHammer = "flat" | "slightly_domed" | "mirror" | "collet" | "raising";

export function hammerWeightG(hammer: PlanishingHammer): number {
  const weights: Record<PlanishingHammer, number> = {
    flat: 350, slightly_domed: 300, mirror: 250, collet: 200, raising: 400,
  };
  return weights[hammer];
}

export function faceDiameterMm(hammer: PlanishingHammer): number {
  const diameters: Record<PlanishingHammer, number> = {
    flat: 35, slightly_domed: 30, mirror: 25, collet: 20, raising: 40,
  };
  return diameters[hammer];
}

export function blowsPerCm2(surfaceFinish: "rough" | "medium" | "fine"): number {
  const blows: Record<string, number> = { rough: 4, medium: 8, fine: 16 };
  return blows[surfaceFinish];
}

export function totalBlows(areaCm2: number, blowsPerCm2: number): number {
  return Math.round(areaCm2 * blowsPerCm2);
}

export function annealingCyclesNeeded(metalThicknessMm: number): number {
  return Math.max(1, Math.ceil(metalThicknessMm / 0.8));
}

export function stakeType(shape: "flat" | "curved" | "edge"): string {
  const stakes: Record<string, string> = {
    flat: "mushroom", curved: "mandrel", edge: "t_stake",
  };
  return stakes[shape];
}

export function surfaceRoughnessRa(hammer: PlanishingHammer): number {
  const ra: Record<PlanishingHammer, number> = {
    flat: 1.6, slightly_domed: 0.8, mirror: 0.2, collet: 3.2, raising: 6.3,
  };
  return ra[hammer];
}

export function timePerM2Minutes(surfaceFinish: "rough" | "medium" | "fine"): number {
  const times: Record<string, number> = { rough: 30, medium: 60, fine: 120 };
  return times[surfaceFinish];
}

export function costPerHour(): number {
  return 45;
}

export function planishingHammers(): PlanishingHammer[] {
  return ["flat", "slightly_domed", "mirror", "collet", "raising"];
}
