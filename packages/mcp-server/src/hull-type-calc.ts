export type HullType = "displacement" | "planing" | "catamaran" | "pontoon" | "deep_v";

export function stabilityScore(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 8, planing: 5, catamaran: 10, pontoon: 9, deep_v: 6,
  };
  return m[h];
}

export function topSpeedKnots(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 12, planing: 45, catamaran: 35, pontoon: 20, deep_v: 50,
  };
  return m[h];
}

export function fuelEfficiency(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 10, planing: 4, catamaran: 7, pontoon: 6, deep_v: 3,
  };
  return m[h];
}

export function roughWaterHandling(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 9, planing: 5, catamaran: 6, pontoon: 3, deep_v: 10,
  };
  return m[h];
}

export function cargoCapacity(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 10, planing: 4, catamaran: 7, pontoon: 8, deep_v: 5,
  };
  return m[h];
}

export function planesOnWater(h: HullType): boolean {
  const m: Record<HullType, boolean> = {
    displacement: false, planing: true, catamaran: true, pontoon: false, deep_v: true,
  };
  return m[h];
}

export function multiHull(h: HullType): boolean {
  const m: Record<HullType, boolean> = {
    displacement: false, planing: false, catamaran: true, pontoon: true, deep_v: false,
  };
  return m[h];
}

export function bestUse(h: HullType): string {
  const m: Record<HullType, string> = {
    displacement: "ocean_cruising", planing: "sport_fishing",
    catamaran: "day_sailing", pontoon: "lake_recreation", deep_v: "offshore_racing",
  };
  return m[h];
}

export function draftMeters(h: HullType): number {
  const m: Record<HullType, number> = {
    displacement: 2.5, planing: 0.8, catamaran: 0.6, pontoon: 0.4, deep_v: 1.2,
  };
  return m[h];
}

export function hullTypes(): HullType[] {
  return ["displacement", "planing", "catamaran", "pontoon", "deep_v"];
}
