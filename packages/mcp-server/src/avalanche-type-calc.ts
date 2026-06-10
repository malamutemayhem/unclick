export type AvalancheType = "slab" | "loose_wet" | "cornice" | "ice" | "slush";

export function destructivePower(a: AvalancheType): number {
  const m: Record<AvalancheType, number> = {
    slab: 10, loose_wet: 6, cornice: 7, ice: 9, slush: 5,
  };
  return m[a];
}

export function triggerProbability(a: AvalancheType): number {
  const m: Record<AvalancheType, number> = {
    slab: 8, loose_wet: 6, cornice: 5, ice: 3, slush: 7,
  };
  return m[a];
}

export function forecastability(a: AvalancheType): number {
  const m: Record<AvalancheType, number> = {
    slab: 7, loose_wet: 8, cornice: 5, ice: 3, slush: 9,
  };
  return m[a];
}

export function burialDepth(a: AvalancheType): number {
  const m: Record<AvalancheType, number> = {
    slab: 10, loose_wet: 7, cornice: 6, ice: 4, slush: 5,
  };
  return m[a];
}

export function speedKph(a: AvalancheType): number {
  const m: Record<AvalancheType, number> = {
    slab: 9, loose_wet: 4, cornice: 7, ice: 10, slush: 3,
  };
  return m[a];
}

export function humanTriggered(a: AvalancheType): boolean {
  const m: Record<AvalancheType, boolean> = {
    slab: true, loose_wet: false, cornice: true, ice: false, slush: false,
  };
  return m[a];
}

export function temperatureDependent(a: AvalancheType): boolean {
  const m: Record<AvalancheType, boolean> = {
    slab: false, loose_wet: true, cornice: true, ice: false, slush: true,
  };
  return m[a];
}

export function releaseZone(a: AvalancheType): string {
  const m: Record<AvalancheType, string> = {
    slab: "weak_layer_planar_failure", loose_wet: "point_release_surface",
    cornice: "ridge_crest_overhang", ice: "steep_glacier_serac",
    slush: "gentle_slope_saturated",
  };
  return m[a];
}

export function bestPrevention(a: AvalancheType): string {
  const m: Record<AvalancheType, string> = {
    slab: "stability_test_route_finding", loose_wet: "timing_early_morning",
    cornice: "distance_avoidance_ridge", ice: "avoid_icefall_zone",
    slush: "drainage_monitoring_rain",
  };
  return m[a];
}

export function avalancheTypes(): AvalancheType[] {
  return ["slab", "loose_wet", "cornice", "ice", "slush"];
}
