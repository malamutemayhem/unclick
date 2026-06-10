export type GardenHoseType = "rubber_heavy_duty" | "vinyl_lightweight" | "expandable_compact" | "soaker_drip" | "coiled_spring";

export function flowVolume(t: GardenHoseType): number {
  const m: Record<GardenHoseType, number> = {
    rubber_heavy_duty: 10, vinyl_lightweight: 7, expandable_compact: 6, soaker_drip: 3, coiled_spring: 5,
  };
  return m[t];
}

export function hoseDurability(t: GardenHoseType): number {
  const m: Record<GardenHoseType, number> = {
    rubber_heavy_duty: 10, vinyl_lightweight: 5, expandable_compact: 4, soaker_drip: 6, coiled_spring: 5,
  };
  return m[t];
}

export function hoseWeight(t: GardenHoseType): number {
  const m: Record<GardenHoseType, number> = {
    rubber_heavy_duty: 2, vinyl_lightweight: 7, expandable_compact: 10, soaker_drip: 6, coiled_spring: 8,
  };
  return m[t];
}

export function kinkResistance(t: GardenHoseType): number {
  const m: Record<GardenHoseType, number> = {
    rubber_heavy_duty: 8, vinyl_lightweight: 3, expandable_compact: 10, soaker_drip: 7, coiled_spring: 9,
  };
  return m[t];
}

export function hoseCost(t: GardenHoseType): number {
  const m: Record<GardenHoseType, number> = {
    rubber_heavy_duty: 7, vinyl_lightweight: 2, expandable_compact: 5, soaker_drip: 3, coiled_spring: 4,
  };
  return m[t];
}

export function drinkingSafe(t: GardenHoseType): boolean {
  const m: Record<GardenHoseType, boolean> = {
    rubber_heavy_duty: true, vinyl_lightweight: false, expandable_compact: false, soaker_drip: false, coiled_spring: false,
  };
  return m[t];
}

export function selfDraining(t: GardenHoseType): boolean {
  const m: Record<GardenHoseType, boolean> = {
    rubber_heavy_duty: false, vinyl_lightweight: false, expandable_compact: true, soaker_drip: false, coiled_spring: true,
  };
  return m[t];
}

export function material(t: GardenHoseType): string {
  const m: Record<GardenHoseType, string> = {
    rubber_heavy_duty: "epdm_rubber_reinforced", vinyl_lightweight: "pvc_vinyl_single_layer",
    expandable_compact: "latex_core_polyester_sleeve", soaker_drip: "recycled_rubber_porous",
    coiled_spring: "eva_resin_memory_coil",
  };
  return m[t];
}

export function bestUse(t: GardenHoseType): string {
  const m: Record<GardenHoseType, string> = {
    rubber_heavy_duty: "large_yard_pro_washing", vinyl_lightweight: "small_garden_budget",
    expandable_compact: "apartment_balcony_storage", soaker_drip: "garden_bed_slow_water",
    coiled_spring: "patio_pot_plant_tidy",
  };
  return m[t];
}

export function gardenHoses(): GardenHoseType[] {
  return ["rubber_heavy_duty", "vinyl_lightweight", "expandable_compact", "soaker_drip", "coiled_spring"];
}
