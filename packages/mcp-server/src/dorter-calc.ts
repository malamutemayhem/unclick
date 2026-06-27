export type DorterAccess = "day_stair" | "night_stair" | "both" | "external" | "internal";

export function floorAreaM2(bedCount: number, areaPerBed: number): number {
  return parseFloat((bedCount * areaPerBed).toFixed(1));
}

export function bedCount(monkCount: number): number {
  return monkCount;
}

export function cubicleWidthCm(floorWidthM: number, bedCount: number): number {
  if (bedCount <= 0) return 0;
  return parseFloat((floorWidthM * 100 / bedCount).toFixed(1));
}

export function partitionHeightCm(ceilingHeightM: number): number {
  return parseFloat((ceilingHeightM * 100 * 0.55).toFixed(1));
}

export function windowCount(bedCount: number): number {
  return Math.max(2, Math.ceil(bedCount / 3));
}

export function nightStairWidthCm(bedCount: number): number {
  return Math.max(80, Math.min(150, bedCount * 3));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(2, Math.ceil(floorAreaM2 / 12));
}

export function heatingRequired(latitude: number): boolean {
  return latitude > 45;
}

export function stairCount(access: DorterAccess): number {
  const stairs: Record<DorterAccess, number> = {
    day_stair: 1, night_stair: 1, both: 2, external: 1, internal: 1,
  };
  return stairs[access];
}

export function constructionCost(floorAreaM2: number, access: DorterAccess, costPerM2: number): number {
  const multipliers: Record<DorterAccess, number> = {
    day_stair: 1.0, night_stair: 1.1, both: 1.3, external: 0.9, internal: 1.0,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[access]).toFixed(2));
}

export function dorterAccessTypes(): DorterAccess[] {
  return ["day_stair", "night_stair", "both", "external", "internal"];
}
