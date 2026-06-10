export type MarineBiome = "coral_reef" | "kelp_forest" | "mangrove" | "deep_sea_vent" | "open_ocean";

export function productivityScore(b: MarineBiome): number {
  const m: Record<MarineBiome, number> = {
    coral_reef: 10, kelp_forest: 8, mangrove: 9, deep_sea_vent: 5, open_ocean: 3,
  };
  return m[b];
}

export function speciesRichness(b: MarineBiome): number {
  const m: Record<MarineBiome, number> = {
    coral_reef: 10, kelp_forest: 7, mangrove: 8, deep_sea_vent: 4, open_ocean: 6,
  };
  return m[b];
}

export function carbonStorage(b: MarineBiome): number {
  const m: Record<MarineBiome, number> = {
    coral_reef: 6, kelp_forest: 8, mangrove: 10, deep_sea_vent: 2, open_ocean: 7,
  };
  return m[b];
}

export function threatLevel(b: MarineBiome): number {
  const m: Record<MarineBiome, number> = {
    coral_reef: 10, kelp_forest: 7, mangrove: 9, deep_sea_vent: 3, open_ocean: 6,
  };
  return m[b];
}

export function depthRange(b: MarineBiome): number {
  const m: Record<MarineBiome, number> = {
    coral_reef: 50, kelp_forest: 30, mangrove: 5, deep_sea_vent: 3000, open_ocean: 5000,
  };
  return m[b];
}

export function photosynthesisBased(b: MarineBiome): boolean {
  const m: Record<MarineBiome, boolean> = {
    coral_reef: true, kelp_forest: true, mangrove: true, deep_sea_vent: false, open_ocean: true,
  };
  return m[b];
}

export function coastalZone(b: MarineBiome): boolean {
  const m: Record<MarineBiome, boolean> = {
    coral_reef: true, kelp_forest: true, mangrove: true, deep_sea_vent: false, open_ocean: false,
  };
  return m[b];
}

export function keyFoundationSpecies(b: MarineBiome): string {
  const m: Record<MarineBiome, string> = {
    coral_reef: "stony_coral", kelp_forest: "giant_kelp",
    mangrove: "red_mangrove", deep_sea_vent: "tube_worm",
    open_ocean: "phytoplankton",
  };
  return m[b];
}

export function primaryEnergySource(b: MarineBiome): string {
  const m: Record<MarineBiome, string> = {
    coral_reef: "sunlight", kelp_forest: "sunlight",
    mangrove: "sunlight", deep_sea_vent: "chemosynthesis",
    open_ocean: "sunlight",
  };
  return m[b];
}

export function marineBiomes(): MarineBiome[] {
  return ["coral_reef", "kelp_forest", "mangrove", "deep_sea_vent", "open_ocean"];
}
