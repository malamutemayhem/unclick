export type SnowpackLayer = "surface_hoar" | "depth_hoar" | "wind_slab" | "melt_freeze_crust" | "faceted_grains";

export function instabilityRisk(s: SnowpackLayer): number {
  const m: Record<SnowpackLayer, number> = {
    surface_hoar: 10, depth_hoar: 9, wind_slab: 7, melt_freeze_crust: 3, faceted_grains: 8,
  };
  return m[s];
}

export function persistenceDays(s: SnowpackLayer): number {
  const m: Record<SnowpackLayer, number> = {
    surface_hoar: 8, depth_hoar: 10, wind_slab: 5, melt_freeze_crust: 7, faceted_grains: 9,
  };
  return m[s];
}

export function detectionDifficulty(s: SnowpackLayer): number {
  const m: Record<SnowpackLayer, number> = {
    surface_hoar: 4, depth_hoar: 8, wind_slab: 3, melt_freeze_crust: 2, faceted_grains: 7,
  };
  return m[s];
}

export function formationTemperature(s: SnowpackLayer): number {
  const m: Record<SnowpackLayer, number> = {
    surface_hoar: 6, depth_hoar: 8, wind_slab: 4, melt_freeze_crust: 2, faceted_grains: 7,
  };
  return m[s];
}

export function shearStrength(s: SnowpackLayer): number {
  const m: Record<SnowpackLayer, number> = {
    surface_hoar: 1, depth_hoar: 2, wind_slab: 7, melt_freeze_crust: 9, faceted_grains: 3,
  };
  return m[s];
}

export function visibleOnSurface(s: SnowpackLayer): boolean {
  const m: Record<SnowpackLayer, boolean> = {
    surface_hoar: true, depth_hoar: false, wind_slab: true, melt_freeze_crust: true, faceted_grains: false,
  };
  return m[s];
}

export function requiresSnowPit(s: SnowpackLayer): boolean {
  const m: Record<SnowpackLayer, boolean> = {
    surface_hoar: false, depth_hoar: true, wind_slab: false, melt_freeze_crust: false, faceted_grains: true,
  };
  return m[s];
}

export function crystalShape(s: SnowpackLayer): string {
  const m: Record<SnowpackLayer, string> = {
    surface_hoar: "feathery_plate_crystal", depth_hoar: "cup_shaped_angular",
    wind_slab: "rounded_sintered_grains", melt_freeze_crust: "polycrystalline_ice",
    faceted_grains: "flat_angular_stepped",
  };
  return m[s];
}

export function formationProcess(s: SnowpackLayer): string {
  const m: Record<SnowpackLayer, string> = {
    surface_hoar: "radiation_cooling_dew_frost", depth_hoar: "temperature_gradient_metamorphism",
    wind_slab: "wind_transport_deposition", melt_freeze_crust: "solar_warm_refreeze",
    faceted_grains: "near_crust_gradient",
  };
  return m[s];
}

export function snowpackLayers(): SnowpackLayer[] {
  return ["surface_hoar", "depth_hoar", "wind_slab", "melt_freeze_crust", "faceted_grains"];
}
