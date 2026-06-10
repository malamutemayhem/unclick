export type SeafloorType = "continental_shelf" | "abyssal_plain" | "mid_ocean_ridge" | "ocean_trench" | "seamount";

export function averageDepthMeters(s: SeafloorType): number {
  const m: Record<SeafloorType, number> = {
    continental_shelf: 150, abyssal_plain: 4500, mid_ocean_ridge: 2500, ocean_trench: 8000, seamount: 2000,
  };
  return m[s];
}

export function geologicActivity(s: SeafloorType): number {
  const m: Record<SeafloorType, number> = {
    continental_shelf: 3, abyssal_plain: 1, mid_ocean_ridge: 10, ocean_trench: 9, seamount: 5,
  };
  return m[s];
}

export function sedimentThickness(s: SeafloorType): number {
  const m: Record<SeafloorType, number> = {
    continental_shelf: 9, abyssal_plain: 7, mid_ocean_ridge: 2, ocean_trench: 8, seamount: 3,
  };
  return m[s];
}

export function mineralRichness(s: SeafloorType): number {
  const m: Record<SeafloorType, number> = {
    continental_shelf: 6, abyssal_plain: 5, mid_ocean_ridge: 9, ocean_trench: 4, seamount: 8,
  };
  return m[s];
}

export function biodiversityScore(s: SeafloorType): number {
  const m: Record<SeafloorType, number> = {
    continental_shelf: 10, abyssal_plain: 3, mid_ocean_ridge: 7, ocean_trench: 2, seamount: 8,
  };
  return m[s];
}

export function tectonicallyActive(s: SeafloorType): boolean {
  const m: Record<SeafloorType, boolean> = {
    continental_shelf: false, abyssal_plain: false, mid_ocean_ridge: true, ocean_trench: true, seamount: false,
  };
  return m[s];
}

export function volcanicOrigin(s: SeafloorType): boolean {
  const m: Record<SeafloorType, boolean> = {
    continental_shelf: false, abyssal_plain: false, mid_ocean_ridge: true, ocean_trench: false, seamount: true,
  };
  return m[s];
}

export function dominantFeature(s: SeafloorType): string {
  const m: Record<SeafloorType, string> = {
    continental_shelf: "shallow_waters", abyssal_plain: "flat_sediment",
    mid_ocean_ridge: "rift_valley", ocean_trench: "subduction_zone",
    seamount: "underwater_peak",
  };
  return m[s];
}

export function exampleLocation(s: SeafloorType): string {
  const m: Record<SeafloorType, string> = {
    continental_shelf: "north_sea", abyssal_plain: "sohm_plain",
    mid_ocean_ridge: "mid_atlantic_ridge", ocean_trench: "mariana_trench",
    seamount: "emperor_seamounts",
  };
  return m[s];
}

export function seafloorTypes(): SeafloorType[] {
  return ["continental_shelf", "abyssal_plain", "mid_ocean_ridge", "ocean_trench", "seamount"];
}
