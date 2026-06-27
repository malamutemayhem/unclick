export type RoofingType = "asphalt_shingle" | "metal_standing_seam" | "clay_tile" | "slate" | "green_roof";

export function lifespanYears(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 25, metal_standing_seam: 60, clay_tile: 100, slate: 150, green_roof: 40,
  };
  return m[roof];
}

export function windResistanceMph(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 110, metal_standing_seam: 140, clay_tile: 125, slate: 130, green_roof: 90,
  };
  return m[roof];
}

export function insulationValue(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 3, metal_standing_seam: 2, clay_tile: 5, slate: 4, green_roof: 10,
  };
  return m[roof];
}

export function maintenanceFrequency(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 3, metal_standing_seam: 1, clay_tile: 2, slate: 1, green_roof: 8,
  };
  return m[roof];
}

export function weightPerSqFtLbs(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 3, metal_standing_seam: 1.5, clay_tile: 10, slate: 15, green_roof: 25,
  };
  return m[roof];
}

export function fireResistant(roof: RoofingType): boolean {
  const m: Record<RoofingType, boolean> = {
    asphalt_shingle: true, metal_standing_seam: true, clay_tile: true, slate: true, green_roof: false,
  };
  return m[roof];
}

export function sustainable(roof: RoofingType): boolean {
  const m: Record<RoofingType, boolean> = {
    asphalt_shingle: false, metal_standing_seam: true, clay_tile: true, slate: true, green_roof: true,
  };
  return m[roof];
}

export function bestClimate(roof: RoofingType): string {
  const m: Record<RoofingType, string> = {
    asphalt_shingle: "temperate", metal_standing_seam: "snowy",
    clay_tile: "mediterranean", slate: "wet_cool", green_roof: "urban",
  };
  return m[roof];
}

export function costPerSqFt(roof: RoofingType): number {
  const m: Record<RoofingType, number> = {
    asphalt_shingle: 4, metal_standing_seam: 12, clay_tile: 15, slate: 20, green_roof: 25,
  };
  return m[roof];
}

export function roofingTypes(): RoofingType[] {
  return ["asphalt_shingle", "metal_standing_seam", "clay_tile", "slate", "green_roof"];
}
