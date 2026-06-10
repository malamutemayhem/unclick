export type TireType = "all_season" | "summer" | "winter" | "all_terrain" | "performance";

export function dryGrip(t: TireType): number {
  const m: Record<TireType, number> = {
    all_season: 6, summer: 9, winter: 4, all_terrain: 5, performance: 10,
  };
  return m[t];
}

export function wetGrip(t: TireType): number {
  const m: Record<TireType, number> = {
    all_season: 7, summer: 8, winter: 6, all_terrain: 5, performance: 9,
  };
  return m[t];
}

export function snowTraction(t: TireType): number {
  const m: Record<TireType, number> = {
    all_season: 4, summer: 1, winter: 10, all_terrain: 6, performance: 2,
  };
  return m[t];
}

export function treadLife(t: TireType): number {
  const m: Record<TireType, number> = {
    all_season: 9, summer: 5, winter: 4, all_terrain: 7, performance: 3,
  };
  return m[t];
}

export function roadNoise(t: TireType): number {
  const m: Record<TireType, number> = {
    all_season: 4, summer: 3, winter: 6, all_terrain: 9, performance: 5,
  };
  return m[t];
}

export function studdable(t: TireType): boolean {
  const m: Record<TireType, boolean> = {
    all_season: false, summer: false, winter: true, all_terrain: false, performance: false,
  };
  return m[t];
}

export function offRoadRated(t: TireType): boolean {
  const m: Record<TireType, boolean> = {
    all_season: false, summer: false, winter: false, all_terrain: true, performance: false,
  };
  return m[t];
}

export function bestSeason(t: TireType): string {
  const m: Record<TireType, string> = {
    all_season: "year_round_mild", summer: "warm_dry",
    winter: "cold_snow_ice", all_terrain: "year_round_mixed",
    performance: "warm_track_day",
  };
  return m[t];
}

export function compoundType(t: TireType): string {
  const m: Record<TireType, string> = {
    all_season: "medium_hardness", summer: "firm_heat_resistant",
    winter: "soft_cold_flexible", all_terrain: "reinforced_sidewall",
    performance: "ultra_soft_sticky",
  };
  return m[t];
}

export function tireTypes(): TireType[] {
  return ["all_season", "summer", "winter", "all_terrain", "performance"];
}
