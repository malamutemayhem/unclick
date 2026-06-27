export type BicycleType = "road" | "mountain" | "gravel" | "bmx" | "touring";

export function weightKg(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 7, mountain: 13, gravel: 9, bmx: 10, touring: 14,
  };
  return m[bike];
}

export function topSpeedKmh(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 60, mountain: 40, gravel: 45, bmx: 35, touring: 35,
  };
  return m[bike];
}

export function comfortRating(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 4, mountain: 7, gravel: 8, bmx: 3, touring: 9,
  };
  return m[bike];
}

export function terrainVersatility(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 3, mountain: 9, gravel: 10, bmx: 5, touring: 7,
  };
  return m[bike];
}

export function gearCount(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 22, mountain: 12, gravel: 11, bmx: 1, touring: 27,
  };
  return m[bike];
}

export function hasSuspension(bike: BicycleType): boolean {
  const m: Record<BicycleType, boolean> = {
    road: false, mountain: true, gravel: false, bmx: false, touring: false,
  };
  return m[bike];
}

export function dropHandlebars(bike: BicycleType): boolean {
  const m: Record<BicycleType, boolean> = {
    road: true, mountain: false, gravel: true, bmx: false, touring: true,
  };
  return m[bike];
}

export function bestUse(bike: BicycleType): string {
  const m: Record<BicycleType, string> = {
    road: "racing", mountain: "trail", gravel: "mixed_terrain",
    bmx: "tricks", touring: "long_distance",
  };
  return m[bike];
}

export function averagePriceUsd(bike: BicycleType): number {
  const m: Record<BicycleType, number> = {
    road: 3000, mountain: 2500, gravel: 2000, bmx: 500, touring: 1500,
  };
  return m[bike];
}

export function bicycleTypes(): BicycleType[] {
  return ["road", "mountain", "gravel", "bmx", "touring"];
}
