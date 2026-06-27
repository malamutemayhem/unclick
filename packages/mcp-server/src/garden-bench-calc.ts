export type GardenBenchType = "teak_classic" | "cast_iron_wood_slat" | "recycled_plastic" | "stone_concrete" | "metal_modern_steel";

export function seatingComfort(t: GardenBenchType): number {
  const m: Record<GardenBenchType, number> = {
    teak_classic: 8, cast_iron_wood_slat: 7, recycled_plastic: 6, stone_concrete: 4, metal_modern_steel: 5,
  };
  return m[t];
}

export function durability(t: GardenBenchType): number {
  const m: Record<GardenBenchType, number> = {
    teak_classic: 9, cast_iron_wood_slat: 8, recycled_plastic: 7, stone_concrete: 10, metal_modern_steel: 8,
  };
  return m[t];
}

export function maintenance(t: GardenBenchType): number {
  const m: Record<GardenBenchType, number> = {
    teak_classic: 5, cast_iron_wood_slat: 4, recycled_plastic: 10, stone_concrete: 9, metal_modern_steel: 7,
  };
  return m[t];
}

export function aestheticCharm(t: GardenBenchType): number {
  const m: Record<GardenBenchType, number> = {
    teak_classic: 10, cast_iron_wood_slat: 9, recycled_plastic: 4, stone_concrete: 7, metal_modern_steel: 6,
  };
  return m[t];
}

export function benchCost(t: GardenBenchType): number {
  const m: Record<GardenBenchType, number> = {
    teak_classic: 8, cast_iron_wood_slat: 6, recycled_plastic: 4, stone_concrete: 7, metal_modern_steel: 5,
  };
  return m[t];
}

export function moveable(t: GardenBenchType): boolean {
  const m: Record<GardenBenchType, boolean> = {
    teak_classic: true, cast_iron_wood_slat: false, recycled_plastic: true, stone_concrete: false, metal_modern_steel: true,
  };
  return m[t];
}

export function rotResistant(t: GardenBenchType): boolean {
  const m: Record<GardenBenchType, boolean> = {
    teak_classic: true, cast_iron_wood_slat: false, recycled_plastic: true, stone_concrete: true, metal_modern_steel: true,
  };
  return m[t];
}

export function benchMaterial(t: GardenBenchType): string {
  const m: Record<GardenBenchType, string> = {
    teak_classic: "grade_a_plantation_teak",
    cast_iron_wood_slat: "cast_iron_hardwood_combo",
    recycled_plastic: "hdpe_recycled_lumber",
    stone_concrete: "reinforced_precast_concrete",
    metal_modern_steel: "corten_weathering_steel",
  };
  return m[t];
}

export function bestSetting(t: GardenBenchType): string {
  const m: Record<GardenBenchType, string> = {
    teak_classic: "formal_garden_pathway",
    cast_iron_wood_slat: "park_memorial_public",
    recycled_plastic: "coastal_waterfront_pier",
    stone_concrete: "zen_garden_permanent",
    metal_modern_steel: "urban_rooftop_terrace",
  };
  return m[t];
}

export function gardenBenches(): GardenBenchType[] {
  return ["teak_classic", "cast_iron_wood_slat", "recycled_plastic", "stone_concrete", "metal_modern_steel"];
}
