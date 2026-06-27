export type GearMaterial = "brass" | "steel" | "bronze" | "wood" | "nylon";

export function gearRatio(driverTeeth: number, drivenTeeth: number): number {
  if (driverTeeth <= 0) return 0;
  return parseFloat((drivenTeeth / driverTeeth).toFixed(3));
}

export function outputRpm(inputRpm: number, ratio: number): number {
  if (ratio <= 0) return 0;
  return parseFloat((inputRpm / ratio).toFixed(2));
}

export function moduleFromTeeth(pitchDiameterMm: number, teeth: number): number {
  if (teeth <= 0) return 0;
  return parseFloat((pitchDiameterMm / teeth).toFixed(3));
}

export function pitchDiameterMm(module: number, teeth: number): number {
  return parseFloat((module * teeth).toFixed(2));
}

export function centerDistanceMm(module: number, teeth1: number, teeth2: number): number {
  return parseFloat((module * (teeth1 + teeth2) / 2).toFixed(2));
}

export function toothDepthMm(module: number): number {
  return parseFloat((module * 2.25).toFixed(3));
}

export function backlashMm(module: number): number {
  return parseFloat((module * 0.04).toFixed(4));
}

export function wearResistance(material: GearMaterial): number {
  const ratings: Record<GearMaterial, number> = {
    brass: 3, steel: 5, bronze: 4, wood: 1, nylon: 2,
  };
  return ratings[material];
}

export function costPerGear(material: GearMaterial, teeth: number): number {
  const factor: Record<GearMaterial, number> = {
    brass: 0.5, steel: 0.8, bronze: 0.6, wood: 0.2, nylon: 0.3,
  };
  return parseFloat((teeth * factor[material]).toFixed(2));
}

export function gearMaterials(): GearMaterial[] {
  return ["brass", "steel", "bronze", "wood", "nylon"];
}
