export type StoneType = "limestone" | "sandstone" | "granite" | "marble" | "concrete";

export function spoutLength(wallHeight: number): number {
  return parseFloat((wallHeight * 0.15 + 30).toFixed(0));
}

export function drainageCapacity(catchmentM2: number, rainfallMmPerHr: number): number {
  return parseFloat((catchmentM2 * rainfallMmPerHr / 1000).toFixed(2));
}

export function carvingHours(complexityLevel: number, stoneHardness: number): number {
  return parseFloat((complexityLevel * stoneHardness * 8).toFixed(0));
}

export function weightKg(lengthCm: number, widthCm: number, heightCm: number, stone: StoneType): number {
  const densities: Record<StoneType, number> = {
    limestone: 2.3, sandstone: 2.2, granite: 2.7, marble: 2.6, concrete: 2.4,
  };
  const volumeM3 = (lengthCm * widthCm * heightCm) / 1000000;
  return parseFloat((volumeM3 * densities[stone] * 1000).toFixed(1));
}

export function erosionRate(stone: StoneType): number {
  const mmPerCentury: Record<StoneType, number> = {
    limestone: 5, sandstone: 8, granite: 1, marble: 3, concrete: 4,
  };
  return mmPerCentury[stone];
}

export function mountingBolts(weightKg: number): number {
  return Math.ceil(weightKg / 50);
}

export function projectionCm(wallThickness: number): number {
  return parseFloat((wallThickness * 0.6).toFixed(0));
}

export function waterFlowAngle(spoutLengthCm: number, dropCm: number): number {
  if (spoutLengthCm <= 0) return 0;
  return parseFloat((Math.atan(dropCm / spoutLengthCm) * 180 / Math.PI).toFixed(1));
}

export function restorationCost(ageYears: number, stone: StoneType): number {
  const base: Record<StoneType, number> = {
    limestone: 2000, sandstone: 1800, granite: 3000, marble: 3500, concrete: 1200,
  };
  return parseFloat((base[stone] * (1 + ageYears * 0.01)).toFixed(0));
}

export function stoneTypes(): StoneType[] {
  return ["limestone", "sandstone", "granite", "marble", "concrete"];
}
