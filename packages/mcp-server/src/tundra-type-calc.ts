export type TundraType = "arctic" | "alpine" | "antarctic" | "maritime" | "continental";

export function avgTempCelsius(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: -12, alpine: -5, antarctic: -25, maritime: -3, continental: -15,
  };
  return m[tundra];
}

export function permafrostDepthMeters(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: 500, alpine: 50, antarctic: 1000, maritime: 10, continental: 300,
  };
  return m[tundra];
}

export function growingSeasonDays(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: 60, alpine: 90, antarctic: 30, maritime: 120, continental: 50,
  };
  return m[tundra];
}

export function plantDiversity(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: 5, alpine: 8, antarctic: 1, maritime: 7, continental: 4,
  };
  return m[tundra];
}

export function windSpeedKmh(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: 50, alpine: 80, antarctic: 100, maritime: 60, continental: 40,
  };
  return m[tundra];
}

export function hasContinuousPermafrost(tundra: TundraType): boolean {
  const m: Record<TundraType, boolean> = {
    arctic: true, alpine: false, antarctic: true, maritime: false, continental: true,
  };
  return m[tundra];
}

export function coastalInfluence(tundra: TundraType): boolean {
  const m: Record<TundraType, boolean> = {
    arctic: false, alpine: false, antarctic: false, maritime: true, continental: false,
  };
  return m[tundra];
}

export function dominantVegetation(tundra: TundraType): string {
  const m: Record<TundraType, string> = {
    arctic: "lichen_moss", alpine: "dwarf_shrubs", antarctic: "moss_algae",
    maritime: "grasses_heath", continental: "sedges",
  };
  return m[tundra];
}

export function carbonStoreRating(tundra: TundraType): number {
  const m: Record<TundraType, number> = {
    arctic: 10, alpine: 4, antarctic: 3, maritime: 5, continental: 8,
  };
  return m[tundra];
}

export function tundraTypes(): TundraType[] {
  return ["arctic", "alpine", "antarctic", "maritime", "continental"];
}
