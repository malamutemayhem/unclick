export type ExoplanetType = "hot_jupiter" | "super_earth" | "mini_neptune" | "ocean_world" | "rogue";

export function massEarthMultiple(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 300, super_earth: 5, mini_neptune: 15, ocean_world: 3, rogue: 10,
  };
  return m[exo];
}

export function orbitalPeriodDays(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 3, super_earth: 200, mini_neptune: 100, ocean_world: 300, rogue: 0,
  };
  return m[exo];
}

export function surfaceTempKelvin(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 2000, super_earth: 400, mini_neptune: 300, ocean_world: 280, rogue: 50,
  };
  return m[exo];
}

export function habitabilityScore(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 0, super_earth: 7, mini_neptune: 2, ocean_world: 8, rogue: 1,
  };
  return m[exo];
}

export function detectionEase(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 10, super_earth: 5, mini_neptune: 6, ocean_world: 4, rogue: 2,
  };
  return m[exo];
}

export function hasAtmosphere(exo: ExoplanetType): boolean {
  const m: Record<ExoplanetType, boolean> = {
    hot_jupiter: true, super_earth: true, mini_neptune: true, ocean_world: true, rogue: false,
  };
  return m[exo];
}

export function orbitsAStar(exo: ExoplanetType): boolean {
  const m: Record<ExoplanetType, boolean> = {
    hot_jupiter: true, super_earth: true, mini_neptune: true, ocean_world: true, rogue: false,
  };
  return m[exo];
}

export function dominantComposition(exo: ExoplanetType): string {
  const m: Record<ExoplanetType, string> = {
    hot_jupiter: "hydrogen_helium", super_earth: "silicate_iron",
    mini_neptune: "hydrogen_ice", ocean_world: "water_ice", rogue: "mixed",
  };
  return m[exo];
}

export function discoveryCount(exo: ExoplanetType): number {
  const m: Record<ExoplanetType, number> = {
    hot_jupiter: 500, super_earth: 1500, mini_neptune: 1000, ocean_world: 50, rogue: 20,
  };
  return m[exo];
}

export function exoplanetTypes(): ExoplanetType[] {
  return ["hot_jupiter", "super_earth", "mini_neptune", "ocean_world", "rogue"];
}
