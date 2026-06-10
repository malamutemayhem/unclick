export type PipeMaterial = "bamboo" | "reed" | "wood" | "metal" | "bone";

export function pipeLength(noteHz: number, speedOfSound: number = 343): number {
  if (noteHz <= 0) return 0;
  return parseFloat((speedOfSound / (4 * noteHz) * 100).toFixed(1));
}

export function pipeCount(lowestNote: number, highestNote: number): number {
  if (lowestNote <= 0 || highestNote <= 0) return 0;
  return Math.round(12 * Math.log2(highestNote / lowestNote)) + 1;
}

export function boreDiameter(lengthCm: number): number {
  return parseFloat((lengthCm * 0.08 + 0.5).toFixed(1));
}

export function tuningWax(lengthCm: number, targetCents: number): number {
  return parseFloat(Math.abs(lengthCm * targetCents * 0.001).toFixed(2));
}

export function bindingLength(pipeCount: number, diameterCm: number): number {
  return parseFloat((pipeCount * diameterCm + 2).toFixed(1));
}

export function airPressureKpa(boreCm: number, volumeFlow: number): number {
  if (boreCm <= 0) return 0;
  return parseFloat((volumeFlow / (Math.PI * Math.pow(boreCm / 2, 2))).toFixed(2));
}

export function harmonicFrequencies(fundamentalHz: number, count: number): number[] {
  const result: number[] = [];
  for (let n = 1; n <= count; n++) {
    result.push(parseFloat((fundamentalHz * (2 * n - 1)).toFixed(1)));
  }
  return result;
}

export function weightG(pipeCount: number, avgLengthCm: number, material: PipeMaterial): number {
  const density: Record<PipeMaterial, number> = { bamboo: 0.3, reed: 0.2, wood: 0.5, metal: 2.5, bone: 1.8 };
  return parseFloat((pipeCount * avgLengthCm * density[material]).toFixed(0));
}

export function craftingHours(pipeCount: number, material: PipeMaterial): number {
  const factor: Record<PipeMaterial, number> = { bamboo: 0.3, reed: 0.2, wood: 0.5, metal: 1.0, bone: 0.8 };
  return parseFloat((pipeCount * factor[material] + 1).toFixed(1));
}

export function moistureEffect(humidityPercent: number): number {
  return parseFloat((humidityPercent * 0.05).toFixed(1));
}

export function pipeMaterials(): PipeMaterial[] {
  return ["bamboo", "reed", "wood", "metal", "bone"];
}
