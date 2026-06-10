export type MapScale = "large" | "medium" | "small" | "regional" | "global";

export function detailLevel(s: MapScale): number {
  const m: Record<MapScale, number> = {
    large: 10, medium: 7, small: 5, regional: 3, global: 1,
  };
  return m[s];
}

export function coverageArea(s: MapScale): number {
  const m: Record<MapScale, number> = {
    large: 1, medium: 4, small: 6, regional: 8, global: 10,
  };
  return m[s];
}

export function featureGeneralization(s: MapScale): number {
  const m: Record<MapScale, number> = {
    large: 1, medium: 4, small: 6, regional: 8, global: 10,
  };
  return m[s];
}

export function accuracyMeters(s: MapScale): number {
  const m: Record<MapScale, number> = {
    large: 1, medium: 10, small: 50, regional: 500, global: 5000,
  };
  return m[s];
}

export function productionCost(s: MapScale): number {
  const m: Record<MapScale, number> = {
    large: 9, medium: 7, small: 5, regional: 4, global: 3,
  };
  return m[s];
}

export function showsBuildings(s: MapScale): boolean {
  const m: Record<MapScale, boolean> = {
    large: true, medium: true, small: false, regional: false, global: false,
  };
  return m[s];
}

export function showsCountries(s: MapScale): boolean {
  const m: Record<MapScale, boolean> = {
    large: false, medium: false, small: true, regional: true, global: true,
  };
  return m[s];
}

export function typicalRatio(s: MapScale): string {
  const m: Record<MapScale, string> = {
    large: "1_to_1000", medium: "1_to_25000",
    small: "1_to_100000", regional: "1_to_1000000",
    global: "1_to_50000000",
  };
  return m[s];
}

export function primaryApplication(s: MapScale): string {
  const m: Record<MapScale, string> = {
    large: "site_plans_cadastral", medium: "topographic_hiking",
    small: "road_atlas", regional: "planning_overview",
    global: "world_reference",
  };
  return m[s];
}

export function mapScales(): MapScale[] {
  return ["large", "medium", "small", "regional", "global"];
}
