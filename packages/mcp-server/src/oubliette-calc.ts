export type EntryType = "trapdoor" | "shaft" | "narrow_passage" | "false_floor";

export function chamberDepth(securityLevel: number): number {
  return parseFloat((securityLevel * 2 + 3).toFixed(0));
}

export function chamberDiameter(occupants: number): number {
  return parseFloat((Math.sqrt(occupants * 2) + 1).toFixed(1));
}

export function airVolume(diameter: number, depth: number): number {
  return parseFloat((Math.PI * Math.pow(diameter / 2, 2) * depth).toFixed(1));
}

export function airSupplyHours(volumeM3: number, occupants: number): number {
  if (occupants <= 0) return 0;
  const consumptionPerHour = occupants * 0.5;
  return parseFloat(((volumeM3 * 0.21) / (consumptionPerHour * 0.04)).toFixed(0));
}

export function wallThicknessCm(depthM: number, soilType: string): number {
  const factors: Record<string, number> = {
    rock: 15, clay: 25, sand: 35, limestone: 20,
  };
  const f = factors[soilType] || 25;
  return parseFloat((depthM * f / 10).toFixed(0));
}

export function hatchSize(maxWidthCm: number): { width: number; length: number } {
  return {
    width: parseFloat((maxWidthCm * 0.6).toFixed(0)),
    length: parseFloat((maxWidthCm * 0.8).toFixed(0)),
  };
}

export function ladderRungs(depthM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((depthM * 100) / spacingCm);
}

export function echoDelay(depthM: number): number {
  return parseFloat(((depthM * 2) / 343).toFixed(3));
}

export function dampness(depthM: number, waterTableM: number): number {
  if (depthM >= waterTableM) return 100;
  return parseFloat(((depthM / waterTableM) * 80).toFixed(0));
}

export function entryTypes(): EntryType[] {
  return ["trapdoor", "shaft", "narrow_passage", "false_floor"];
}
