export type ReductionMaterial = "newspaper" | "sawdust" | "straw" | "leaves" | "horsehair";

export function firingTemperatureCelsius(): number {
  return 1000;
}

export function heatingRateCPerMinute(): number {
  return 15;
}

export function firingTimeMinutes(targetTempC: number): number {
  return Math.round(targetTempC / 15);
}

export function reductionTimeMInutes(material: ReductionMaterial): number {
  const times: Record<ReductionMaterial, number> = {
    newspaper: 3, sawdust: 10, straw: 5, leaves: 8, horsehair: 1,
  };
  return times[material];
}

export function smokeIntensity(material: ReductionMaterial): number {
  const intensity: Record<ReductionMaterial, number> = {
    newspaper: 7, sawdust: 9, straw: 6, leaves: 5, horsehair: 2,
  };
  return intensity[material];
}

export function thermalShockRisk(wallThicknessMm: number): number {
  if (wallThicknessMm <= 3) return 9;
  if (wallThicknessMm <= 5) return 6;
  return 3;
}

export function cracklePatternDensity(glazeThicknessMm: number): number {
  return parseFloat((10 / glazeThicknessMm).toFixed(1));
}

export function carbonTrappingLikelihood(material: ReductionMaterial): number {
  const ratings: Record<ReductionMaterial, number> = {
    newspaper: 5, sawdust: 8, straw: 6, leaves: 4, horsehair: 9,
  };
  return ratings[material];
}

export function coolingMethodMinutes(method: "water" | "air" | "sand"): number {
  const mins: Record<string, number> = { water: 2, air: 30, sand: 120 };
  return mins[method];
}

export function reductionMaterials(): ReductionMaterial[] {
  return ["newspaper", "sawdust", "straw", "leaves", "horsehair"];
}
