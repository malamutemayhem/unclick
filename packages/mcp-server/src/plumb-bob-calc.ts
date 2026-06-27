export type BobMaterial = "brass" | "steel" | "iron" | "bronze" | "lead";

export function weightG(material: BobMaterial): number {
  const weights: Record<BobMaterial, number> = {
    brass: 340, steel: 400, iron: 350, bronze: 380, lead: 500,
  };
  return weights[material];
}

export function pointAngleDeg(precision: "rough" | "standard" | "precision"): number {
  const angles: Record<string, number> = { rough: 60, standard: 45, precision: 30 };
  return angles[precision];
}

export function stringLengthM(heightM: number): number {
  return parseFloat((heightM + 0.3).toFixed(1));
}

export function windDeflectionMm(windSpeedMps: number, stringLengthM: number, weightG: number): number {
  if (weightG <= 0) return 0;
  const force = 0.5 * 1.225 * windSpeedMps ** 2 * 0.001;
  return parseFloat((force * stringLengthM * 1000 / (weightG / 1000 * 9.81)).toFixed(2));
}

export function settlingTimeSeconds(stringLengthM: number): number {
  return parseFloat((stringLengthM * 10).toFixed(1));
}

export function pendulumPeriodSeconds(stringLengthM: number): number {
  return parseFloat((2 * Math.PI * Math.sqrt(stringLengthM / 9.81)).toFixed(3));
}

export function verticalAccuracyMm(stringLengthM: number, precision: "rough" | "standard" | "precision"): number {
  const errorPerM: Record<string, number> = { rough: 3, standard: 1, precision: 0.3 };
  return parseFloat((stringLengthM * errorPerM[precision]).toFixed(1));
}

export function bodyDiameterMm(material: BobMaterial): number {
  const diameters: Record<BobMaterial, number> = {
    brass: 25, steel: 22, iron: 24, bronze: 26, lead: 30,
  };
  return diameters[material];
}

export function corrosionResistance(material: BobMaterial): number {
  const ratings: Record<BobMaterial, number> = {
    brass: 8, steel: 3, iron: 2, bronze: 9, lead: 7,
  };
  return ratings[material];
}

export function bobMaterials(): BobMaterial[] {
  return ["brass", "steel", "iron", "bronze", "lead"];
}
