export type SeafloorFeature = "mid_ocean_ridge" | "trench" | "abyssal_plain" | "seamount" | "continental_shelf";

export function averageDepthM(s: SeafloorFeature): number {
  const m: Record<SeafloorFeature, number> = {
    mid_ocean_ridge: 2500, trench: 9000, abyssal_plain: 5000, seamount: 3000, continental_shelf: 200,
  };
  return m[s];
}

export function tectonicActivity(s: SeafloorFeature): number {
  const m: Record<SeafloorFeature, number> = {
    mid_ocean_ridge: 10, trench: 9, abyssal_plain: 1, seamount: 5, continental_shelf: 2,
  };
  return m[s];
}

export function sedimentThickness(s: SeafloorFeature): number {
  const m: Record<SeafloorFeature, number> = {
    mid_ocean_ridge: 1, trench: 8, abyssal_plain: 10, seamount: 3, continental_shelf: 9,
  };
  return m[s];
}

export function biologicalProductivity(s: SeafloorFeature): number {
  const m: Record<SeafloorFeature, number> = {
    mid_ocean_ridge: 7, trench: 2, abyssal_plain: 3, seamount: 8, continental_shelf: 10,
  };
  return m[s];
}

export function mineralResources(s: SeafloorFeature): number {
  const m: Record<SeafloorFeature, number> = {
    mid_ocean_ridge: 8, trench: 3, abyssal_plain: 6, seamount: 7, continental_shelf: 9,
  };
  return m[s];
}

export function volcanicOrigin(s: SeafloorFeature): boolean {
  const m: Record<SeafloorFeature, boolean> = {
    mid_ocean_ridge: true, trench: false, abyssal_plain: false, seamount: true, continental_shelf: false,
  };
  return m[s];
}

export function convergentBoundary(s: SeafloorFeature): boolean {
  const m: Record<SeafloorFeature, boolean> = {
    mid_ocean_ridge: false, trench: true, abyssal_plain: false, seamount: false, continental_shelf: false,
  };
  return m[s];
}

export function formationProcess(s: SeafloorFeature): string {
  const m: Record<SeafloorFeature, string> = {
    mid_ocean_ridge: "seafloor_spreading", trench: "subduction",
    abyssal_plain: "sediment_deposition", seamount: "volcanic_hotspot",
    continental_shelf: "continental_extension",
  };
  return m[s];
}

export function exampleLocation(s: SeafloorFeature): string {
  const m: Record<SeafloorFeature, string> = {
    mid_ocean_ridge: "mid_atlantic_ridge", trench: "mariana_trench",
    abyssal_plain: "sohm_plain", seamount: "hawaiian_chain",
    continental_shelf: "north_sea",
  };
  return m[s];
}

export function seafloorFeatures(): SeafloorFeature[] {
  return ["mid_ocean_ridge", "trench", "abyssal_plain", "seamount", "continental_shelf"];
}
