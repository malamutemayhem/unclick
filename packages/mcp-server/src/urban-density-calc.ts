export type UrbanDensity = "rural" | "suburban" | "urban" | "dense_urban" | "megacity";

export function populationPerKm2(u: UrbanDensity): number {
  const m: Record<UrbanDensity, number> = {
    rural: 50, suburban: 2000, urban: 8000, dense_urban: 20000, megacity: 40000,
  };
  return m[u];
}

export function transitAccessScore(u: UrbanDensity): number {
  const m: Record<UrbanDensity, number> = {
    rural: 1, suburban: 3, urban: 7, dense_urban: 9, megacity: 10,
  };
  return m[u];
}

export function walkabilityScore(u: UrbanDensity): number {
  const m: Record<UrbanDensity, number> = {
    rural: 2, suburban: 3, urban: 7, dense_urban: 9, megacity: 8,
  };
  return m[u];
}

export function avgBuildingFloors(u: UrbanDensity): number {
  const m: Record<UrbanDensity, number> = {
    rural: 1, suburban: 2, urban: 6, dense_urban: 15, megacity: 25,
  };
  return m[u];
}

export function greenSpacePercent(u: UrbanDensity): number {
  const m: Record<UrbanDensity, number> = {
    rural: 90, suburban: 40, urban: 15, dense_urban: 8, megacity: 5,
  };
  return m[u];
}

export function carDependent(u: UrbanDensity): boolean {
  const m: Record<UrbanDensity, boolean> = {
    rural: true, suburban: true, urban: false, dense_urban: false, megacity: false,
  };
  return m[u];
}

export function hasMetroSystem(u: UrbanDensity): boolean {
  const m: Record<UrbanDensity, boolean> = {
    rural: false, suburban: false, urban: true, dense_urban: true, megacity: true,
  };
  return m[u];
}

export function typicalZoning(u: UrbanDensity): string {
  const m: Record<UrbanDensity, string> = {
    rural: "agricultural", suburban: "single_family", urban: "mixed_use",
    dense_urban: "high_rise_mixed", megacity: "vertical_mixed",
  };
  return m[u];
}

export function infraChallenges(u: UrbanDensity): string {
  const m: Record<UrbanDensity, string> = {
    rural: "distance_connectivity", suburban: "sprawl_traffic",
    urban: "congestion", dense_urban: "housing_affordability",
    megacity: "overcrowding",
  };
  return m[u];
}

export function urbanDensities(): UrbanDensity[] {
  return ["rural", "suburban", "urban", "dense_urban", "megacity"];
}
