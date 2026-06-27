export type SoilType = "clay" | "sandy" | "loam" | "silt" | "peat";

export function drainageRate(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 2, sandy: 10, loam: 7, silt: 5, peat: 4,
  };
  return m[soil];
}

export function nutrientRetention(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 9, sandy: 2, loam: 8, silt: 6, peat: 7,
  };
  return m[soil];
}

export function waterHolding(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 9, sandy: 2, loam: 7, silt: 6, peat: 10,
  };
  return m[soil];
}

export function workability(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 3, sandy: 9, loam: 10, silt: 7, peat: 6,
  };
  return m[soil];
}

export function organicContent(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 4, sandy: 2, loam: 6, silt: 5, peat: 10,
  };
  return m[soil];
}

export function compactable(soil: SoilType): boolean {
  const m: Record<SoilType, boolean> = {
    clay: true, sandy: false, loam: false, silt: true, peat: false,
  };
  return m[soil];
}

export function acidic(soil: SoilType): boolean {
  const m: Record<SoilType, boolean> = {
    clay: false, sandy: false, loam: false, silt: false, peat: true,
  };
  return m[soil];
}

export function bestCrop(soil: SoilType): string {
  const m: Record<SoilType, string> = {
    clay: "rice", sandy: "carrots", loam: "vegetables",
    silt: "wheat", peat: "blueberries",
  };
  return m[soil];
}

export function phRange(soil: SoilType): number {
  const m: Record<SoilType, number> = {
    clay: 7, sandy: 6, loam: 7, silt: 7, peat: 4,
  };
  return m[soil];
}

export function soilTypes(): SoilType[] {
  return ["clay", "sandy", "loam", "silt", "peat"];
}
